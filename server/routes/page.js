'use strict'

const express       = require('express')
const model         = require('../models')
const jsonwebtoken  = require('jsonwebtoken')
const jwt           = require('express-jwt')
const config        = require('../config')
const getErrorMessage  = require('../utils/message-handle')

const router        = express.Router()
const Page          = model.pages
const _             = require('lodash')
// Find all pages
router.get('/', jwt({secret: config.token.secret}), (req, res)=>{
    Page.findAll({
     
    }).then((result) => {
      res.send({status: 200, pages: result})
    })
 
})

router.post('/new', jwt({secret: config.token.secret}), (req, res) => {
  Page.create(req.body).then(page => {
    res.json({
      status: 200,
      page: page
    })
  })
}) 


router.get('/:id', jwt({secret: config.token.secret}), (req, res) => {
  Page.findOne({
    where: {
      id: req.params.id
      }
    }).then((page) => {
      res.json({
          status: 200,
          page: page
        })
    })
}) 



router.post('/:id/edit', jwt({secret: config.token.secret}), (req, res, next) => {
  Post.update({
    title: body.title,
    slug: body.slug,
    linkText: body.linkText
  }, {
    where: {
      id: req.params.id 
    }
  }).then((page) => {
    res.json({
      status: 200,
      page: page
    })
  })
});

router.delete('/:id', jwt({secret: config.token.secret}), (req, res, next) => {
  Post.destroy({
    where: {
      id: req.params.id 
    }
  }).then((page) => {
    res.json({
      status: 200,
      page: page
    })
  })
})

module.exports = router
