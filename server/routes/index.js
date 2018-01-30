'use strict'

const express = require('express')
const router  = express.Router()

const userRouter = require('./user.js')
const pageRouter = require('./page.js')

router.use('/user', userRouter)

router.use('/pages', pageRouter)
module.exports = router
