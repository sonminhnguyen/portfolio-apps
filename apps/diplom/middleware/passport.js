const passport = require('passport');
const knex = require('../database');
const bcrypt = require("bcrypt")
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('local', new LocalStrategy(async(username, password, cb) => {
  const user = await knex('users').where('username', username).first()
  if (!user) {
      return cb("No user by that name")
  } else {
    const isAuthenticated = await bcrypt.compare(password, user.password) 
    if(isAuthenticated) {
      cb(null, user)
    } else {
      cb(null, false, { message: 'Incorrect username or password.' })
    }
  }
}))

module.exports = passport;
