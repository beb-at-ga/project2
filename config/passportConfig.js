// require passport and strategies
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('../models');


// provide serialize/deserialize fn 
// allow passort to store user by id alone (serialize) and
// lookup a user's full information from the id (deserialization).
passport.serializeUser((customer, callback) => {
  //callback first arg is an error and second is the data that it passes on
  callback(null, customer.id);
});

passport.deserializeUser((id, callback) => {
  db.customer.findByPk(id)
  .then(customer => {
    callback(null, customer);
  })
  .catch(err => {
    callback(err);
  })

// or becaude callback expects err as first param and catch provides err
// .catch(callback)

});

// Implement strategies
passport.use(new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (typedEmail, typedPwd, callback) => {
  // Try looking up user by email
  db.customer.findOne({
    where: {
      email: typedEmail
    }
  })
  .then(foundUser => {
    // If user not found w/ email: foundUser is null
    // If foundUser, but incorrect password
    // If foundUser, but password attemps > limit

    if (!foundUser || !foundUser.validPassword(typedPwd)) {
      // bad user
      callback(null, null);
    }
    else {
      // valid user. return data
      callback(null, foundUser);
    }
  })
  .catch(callback); // end of user findOne() call
}));


//////////////////////////////////
module.exports = passport;

