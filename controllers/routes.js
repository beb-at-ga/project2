const router = require('express').Router();
const db = require('../models');
const axios = require('axios');
const moment = require('moment');
const async = require('async');

let today = moment(); // "2019-08-26T08:02:17-05:00"

//first function in waterfall to get list of journeys
let getCurrentSeason = function (done) {
  axios.get(`https://www.wsdot.wa.gov/Ferries/API/schedule/rest/activeseasons`, {
      params: {
        'apiaccesscode': process.env.WSDOT_API_KEY
      }
    })
    .then(response => {
      response.data.forEach(r => {
        if (today > moment(r.ScheduleStart) && today < moment(r.ScheduledEnd)) {
          done(null, r.ScheduleID)
        }
      })
    })
    .catch(err => {
      console.log(`~~~~~~ Axios Error in getCurrentSeason: ${err}`);
    })
}
//second function in waterfall to get list of journeys
let getScheduledRoutes = function (firstRes, done) {
  let ScheduleID = firstRes; // just because it's easier to keep clear.
  axios.get(`http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/schedroutes/${ScheduleID}`, {
      params: {
        'apiaccesscode': process.env.WSDOT_API_KEY
      }
    })
    .then(results => {
      let returnArr = [];
      results.data.forEach(r => {
        let o = {}
        o.SchedRouteID = r.SchedRouteID;
        o.RouteID = r.RouteID;
        o.Description = r.Description
        returnArr.push(o);
      })
      done(null, returnArr);
    })
}
//third function in waterfall to get list of journeys
let getAllSailings = function (secondRes, done) {

  let routeSummary = secondRes;

  // create and array of promises, then spray them all at once with axios.all.
  let subQueryPromises = [];
  routeSummary.forEach(e => {
    subQueryPromises.push(
      axios.get(`http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/sailings/${e.SchedRouteID}`, {
        params: {
          'apiaccesscode': process.env.WSDOT_API_KEY
        }
      })
    )
  })

  let sailings = [];
  axios.all(subQueryPromises)
    .then(sprayResults => {
      // console.log(sprayResults[0].data[0].RouteID)
      sprayResults.forEach(s => {
        s.data.forEach(s2 => {
          routeSummary.forEach(rs => {
            // console.log(s2)
            // console.log(`rs.RouteID is ${rs.RouteID}`)
            if (s2.RouteID === rs.RouteID) {
              s2.Description = rs.Description
              sailings.push(s2);
            }
          })
        })
      })
    })
    .then(() => {
      // console.log(sailings);
      done(null, sailings);
    })
}
// Get a list of sailings (and journeys of sailings) to pick for watchedJourneys
router.get('/', (req, res) => {
  async.waterfall([
    getCurrentSeason,
    getScheduledRoutes,
    getAllSailings
  ], (err, waterfallResults) => {
    res.render('routes/selectRoutes', {
      moment: moment,
      sailings: waterfallResults
    });
  })
})

// Add a favorite to watchedJourneys
router.post('/', (req, res) => {
  db.customer.findByPk(res.locals.customer.id)
    .then((cust) => {
      db.watchedJourney.findOrCreate({
          where: {
            customerId: cust.id,
            JourneyID: req.body.JourneyID
          },
          defaults: req.body
        })
        .then(() => {
          res.json(req.body);
        })
    })
})

// Delete a favorite from watchedJourneys
router.delete(('/:JourneyID'), (req, res) => {
  db.watchedJourney.destroy({
      where: {
        customerId: res.locals.customer.id,
        JourneyID: req.params.JourneyID
      }
    })
    .then(() => {
      res.json(req.body);
    })

})

module.exports = router;






