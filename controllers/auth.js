const router = require('express').Router();
const db = require('../models');
const passport = require('../config/passportConfig');

router.get('/', (req, res) => {
  // if already logged in, redirect to profile, otherwise to auth/index
  res.render('auth/index');
})

router.post('/register', (req, res) => {
  if (req.body.password !== req.body.password_confirmation) {
    // console.log(`~~~~~~~ Error: Password did NOT match. Need to send back to user.`);
    req.flash('error', 'Invalid credentials. Please, try again.');
    res.redirect('/auth');
  } else {
    db.customer.findOrCreate({
        where: {
          email: req.body.email
        },
        defaults: {
          email: req.body.email,
          password: req.body.password
        }
      })
      .spread((customer, wasCreated) => {
        if (wasCreated) {
          // customer created sucesfully
          passport.authenticate('local', {
            successRedirect: '/profile',
            successsFlash: 'w00t!',
            failureRedirect: '/auth/login',
            failureFlash: 'This should never happen. Contact your administrator.'
          })(req, res);

          // res.render('profile/index');
        } else {
          // user was found, don't let them create a new account. make them sign in.
          // req.flash('error', 'Account already exists. Please sign in instead.')

          // console.log(`~~~~~~~ Error: Account already exists.  Sign in instead.`);
          req.flash('error', 'Something went wrong. Please, try again.');
          // don't send this info to the hacker. send an email to the user instead. "We see your're having some trouble signing in..."
          res.redirect('/auth');
        }
      })
      .catch((err) => {
        // console.log(`~~~~~~ Error: ${err}`);
        req.flash('error', 'Something went wrong. Please, try again.');
        
        // Get validation specific errors. They are ok to show to users.
        if (err && err.errors) {
          err.errors.forEach(e => {
            if (e.type === 'Validation error') {
              req.flash('error', 'Validation issue: ' + e.message);
            }
          })
        }
        
        res.redirect('/auth');
      })
  }
})

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/profile',
  successsFlash: 'w00t!',
  failureRedirect: '/auth',
  failureFlash: 'Invalid credentials. Please try again.'
}))


router.get('/signout', (req, res) => {
  req.logout();
  // req.flash('success', 'Later!');
  res.redirect('/');
})


module.exports = router;