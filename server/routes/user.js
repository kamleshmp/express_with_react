'use strict'

const express       = require('express')
const model         = require('../models')
const jsonwebtoken  = require('jsonwebtoken')
const jwt           = require('express-jwt')
const config        = require('../config')
const getErrorMessage  = require('../utils/message-handle')

const router        = express.Router()
const User          = model.users
const _             = require('lodash')
// Find all users
router.get('/', jwt({secret: config.token.secret}), (req, res)=>{
  if(req.user.role === config.role.admin) {
    User.findAll({
      attributes: ['username', 'id']
    }).then((result) => {
      res.send(result)
    })
  } else {
    res.json(getErrorMessage(1002))
  }
})

router.post('/register', (req, res) => {
  const {username, password, email} = req.body
  User.findOne({
    where: {
      email: email
      }
    }).then((user) => {
      if(!user) {
        User
          .build({
            username: username,
            password: password,
            email: email
          })
          .save()
          .then((newUser) => {
            const token = jsonwebtoken.sign({
              email: email,
              role: config.role.normal, // default is normal
            }, config.token.secret, { // get secret from config
              expiresIn: '1d' // expires in 1 day
            })
            res.json({
              username: username,
              email: email,
              token: token,
              id: newUser.get('id')
            })
          }).catch((err) => {
            console.log('eeeeeeeeeeee',req.body);
              const error = _.map(err.errors, (e)=>{
                return e.message;
              });
             res.json({
              status: 400,
              errors: error 
            })
        })
      } else {
        res.json({
          status: 400,
          errors: ['User has already existed!'] 
        })
      }
    })
})

router.post('/login', (req, res, next) => {
  const {email, password} = req.body
  User
    .findOne({
      where: {
        email: email,
        password: password
      }
    })
    .then((user) => {
      if(user) {
        const roleId = user.get('roleId')
        const token = jsonwebtoken.sign({
          email: email,
          role: roleId,
        }, config.token.secret, { // get secret from config
          expiresIn: config.token.expired // expires in 1 day
        })
        res.json({
          username: user.get('username'),
          token: token,
          email: email,
          id: user.get('id')
        })
      } else {
        res.json(getErrorMessage(1001))
      }
    })
})

// normal user action
router.post('/action1', jwt({secret: config.token.secret}), (req, res) => { // normal will be ok
  res.json({
    content: 'ok, action1'
  })
})

// admin user action
router.post('/action2', jwt({secret: config.token.secret}), (req, res, next) => { // only for admin
  if(req.user.role === config.role.admin) {
    res.json({
      content: 'ok, action2'
    })
  } else {
    res.json(getErrorMessage(1002))
  }
})

module.exports = router
