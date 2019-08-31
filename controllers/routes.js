const router = require('express').Router();
const db = require('../models');
const axios = require('axios');
const moment = require('moment');
const async = require('async');

let today = moment(); // "2019-08-26T08:02:17-05:00"

//first function in waterfall
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
//second function in waterfall
let getScheduledRoutes = function (firstRes, done) {
  axios.get('http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/schedroutes', {
      params: {
        'apiaccesscode': process.env.WSDOT_API_KEY
      }
    })
    .then(results => {
      let returnArr = [];
      results.data.forEach(r => {
        if (r.ScheduleID === firstRes) {
          returnArr.push(r.SchedRouteID);
        }
      })
      done(null, returnArr);
    })
}
//third function in waterfall
let getAllSailings = function (secondRes, done) {
  let subQueryPromises = [];
  secondRes.forEach(e => {
    subQueryPromises.push(
      axios.get(`http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/sailings/${e}`, {
        params: {
          'apiaccesscode': process.env.WSDOT_API_KEY
        }
      })
    )
  })

  let sailings = [];
  axios.all(subQueryPromises)
    .then(summary => {
      summary.forEach(s => {
        sailings.push(s);
      })
    })
    .then(() => {
      done(null, sailings);
    })
}


router.get('/', (req, res) => {
  async.waterfall([
    getCurrentSeason,
    getScheduledRoutes,
    getAllSailings
  ], (err, results) => {
    let sailings = [];
    // console.log(results[0].data);
    results.forEach(r => {
      // console.log(r.data);
      r.data.forEach(x => {
        // console.log(x.SailingDescription);
        sailings.push(x);
      })
    })
    res.render('routes/selectRoutes', {
      moment: moment,
      sailings
    });
  })
})


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







// let GetScheduleDetails = function (details) {

//   this.details = details;

//   this.getSailings = function (done) {
//     axios.get(`http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/sailings/${details.scheduledRouteId}`, {
//         params: {
//           'apiaccesscode': process.env.WSDOT_API_KEY
//         }
//       })
//       .then(response => {
//         done(null, response.data)
//       })
//       .catch(err => {
//         console.log(`~~~~~~ Axios Error in getSailings: ${err}`);
//       })
//   }
// }

// router.get('/:routeComboId/:departingTerminalId', (req, res) => {
//   db.routeCombo.findOne({
//       where: {
//         id: req.params.routeComboId
//       }
//     })
//     .then((routeCombo) => {

//       let details = {
//         scheduledRouteId: routeCombo.scheduledRouteId,
//       }

//       let getScheduleDetails = new GetScheduleDetails(details);

//       async.series([
//           getScheduleDetails.getSailings
//         ])
//         .then(results => {
//           let fl = [];
//           // routeCombo.departingTerminalId
//           function search(ta) {
//             ta.forEach(o => {
//               o.Journs.forEach(j => {
//                 j.TerminalTimes.forEach(t => {
//                   if (t.TerminalID === routeCombo.departingTerminalId) {
//                     fl.push(j);
//                   }
//                 })
//               })
//             })
//           }

//           search(results[0]);

//           // filtered for  Journs.TerminalTimes[0].TerminalId === req.params.departingTerminalId
//           // res.json(results[0]);
//           // res.send(`${routeCombo.departingTerminalId}`);
//           // res.json(fl);
//           res.render('routes/index', {
//             moment: moment,
//             journs: fl,
//             results: results[0]
//           });
//         })
//     })
//     .catch((err) => {
//       console.log(`${err}`);
//     })
// })
