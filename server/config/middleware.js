import bodyParser from 'body-parser'
import cors from 'cors'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import config from './index'
import session from 'express-session'

// CORS middleware

export default app => {
  // tell the app to parse HTTP body messages
  const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
}

  app.use(cookieParser())

  app.use(session({ secret: config.secretKey, cookie: { maxAge: 60000 } }))

  //app.use(bodyParser.urlencoded({ extended: false }))
  //app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(bodyParser.json({ limit: '50mb', limit: '50mb' }))
  app.use(bodyParser.raw())
  app.use(allowCrossDomain);

  // app.use(cors());
  app.use(cors({ credentials: true, origin: config.clientUrl }))

  passport.serializeUser(function(user, done) {
    done(null, user)
  })
  passport.deserializeUser(function(user, done) {
    done(null, user)
  })
  app.use(passport.initialize())


  // use passport
  const localLoginStrategy = require('../passport/local-login')
  const localSignupStrategy = require('../passport/local-signup')

  passport.use('local-login', localLoginStrategy)
  passport.use('local-signup', localSignupStrategy)

}
