const router = require('express').Router();
const db = require('../models');
// const axios = require('axios');
const moment = require('moment');
const async = require('async');

let GetPreferencesOptions = function (customer) {

  this.customer = customer;

  this.getWatchedJourneys = function (done) {
    db.customer.findOne({
        where: {
          id: customer.id
        },
        include: [{
          model: db.watchedJourney
        }]
      })
      .then((results) => {
        done(null, results);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}


router.get('/', (req, res) => {

  let getPreferencesOptions = new GetPreferencesOptions(res.locals.customer);

  async.series([
      getPreferencesOptions.getWatchedJourneys
    ])
    .then(results => {
      let watchedJourneys = results[0].watchedJourneys;

      // res.json(watchedJourneys);
      res.render('preferences/preferences', {
        moment: moment,
        customer: res.locals.customer,
        watchedJourneys
      });
    })
})


router.post('/update', (req, res) => {
  db.customer.update({
      firstname: req.body.firstname,
      preferredTransportToTerminal: req.body.preferredTransportToTerminal,
      mobilephone: req.body.mobilephone
    }, {
      where: {
        id: res.locals.customer.id
      }
    })
    .then(() => {
      res.redirect('/preferences');
    })
})

module.exports = router;

