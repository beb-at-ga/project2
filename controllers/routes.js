const router = require('express').Router();
const db = require('../models');
const axios = require('axios');
const moment = require('moment');
const async = require('async');



let routesForDate = moment().format('YYYY-MM-DD'); // "2019-08-26T08:02:17-05:00"



let GetScheduleDetails = function (details) {

  this.details = details;

  this.getSailings = function (done) {
    axios.get(`http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/sailings/${details.scheduledRouteId}`, {
        params: {
          'apiaccesscode': process.env.WSDOT_API_KEY
        }
      })
      .then(response => {
        done(null, response.data)
      })
      .catch(err => {
        console.log(`~~~~~~ Axios Error in getSailings: ${err}`);
      })
  }
}

router.get('/:routeComboId/:departingTerminalId', (req, res) => {
  db.routeCombo.findOne({
      where: {
        id: req.params.routeComboId
      }
    })
    .then((routeCombo) => {

      let details = {
        scheduledRouteId: routeCombo.scheduledRouteId,
      }

      let getScheduleDetails = new GetScheduleDetails(details);

      async.series([
          getScheduleDetails.getSailings
        ])
        .then(results => {
          let fl = [];
          // routeCombo.departingTerminalId
          function search(ta) {
            ta.forEach(o => {
              o.Journs.forEach(j => {
                j.TerminalTimes.forEach(t => {
                  if (t.TerminalID === routeCombo.departingTerminalId) {
                    fl.push(j);
                  }
                })
              })
            })
          }

          search(results[0]);

          // filtered for  Journs.TerminalTimes[0].TerminalId === req.params.departingTerminalId
          // res.json(results[0]);
          // res.send(`${routeCombo.departingTerminalId}`);
          // res.json(l);
          res.render('routes/index', {
            moment: moment,
            journs: fl,
            results: results[0] 
          });
        })
    })
    .catch((err) => {
      console.log(`${err}`);
    })
})


module.exports = router;