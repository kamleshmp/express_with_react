import model from '../models'
const PassportLocalStrategy = require('passport-local').Strategy;

/**
 * Return the Passport Local Strategy object.
 */

const User          = model.users

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
   
});
