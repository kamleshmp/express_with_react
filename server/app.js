'use strict'
import middlewaresConfig from './config/middleware'

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



const apiRoutes = require('./routes');

const app = express();

middlewaresConfig(app)


app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(allowCrossDomain);

// Routing
app.use('/auth', authRoutes)
app.use('/api', authCheckMiddleware, apiRoutes)

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    code: err.status,
    message: err.message
  })
  next()
})

app.set('port', process.env.PORT || 3001)

// start the server
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`)
})

module.exports = app;
