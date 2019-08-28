const router = require('express').Router();
const db = require('../models');
const axios = require('axios');
const moment = require('moment');
const async = require('async');

let routesForDate = moment().format('YYYY-MM-DD'); // "2019-08-26T08:02:17-05:00"
// console.log(res.locals.customer);

// function getVessels(done) {

//   axios.get(`https://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vesselbasics`, {
//       params: {
//         'apiaccesscode': process.env.WSDOT_API_KEY
//       }
//     })
//     .then(response => {
//       done(null, response.data)
//     })
//     .catch(err => {
//       console.log(`~~~~~~ Axios Error in getVessels: ${err}`);
//     })
// }

let GetProfileOptions = function (customer) {

  this.customer = customer;



  this.getCurrentlyWatchedRoutes = function (done) {
    // Make Customer to Route and Teminals Many to Many through the watched Route Table.
    // console.log(`~~~~ In getCurrentlyWatchedRoutes.`)
    db.routeCombo.findAll()
    .then(results => {
      // console.log(results);
      done(null, results);
    })
    .catch(err => {
      console.log(`~~~~~ Err: ${err}`);
    })
  }



  this.getTerminalLocations = function (done) {
    axios.get(`http://www.wsdot.wa.gov/Ferries/API/Terminals/rest/terminallocations`, {
        params: {
          'apiaccesscode': process.env.WSDOT_API_KEY
        }
      })
      .then(response => {
        done(null, response.data)
      })
      .catch(err => {
        console.log(`~~~~~~ Axios Error in getTerminalLocations: ${err}`);
      })
  }

  this.getRoutes = function (done) {
    axios.get(`http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/routes/${routesForDate}`, {
        params: {
          'apiaccesscode': process.env.WSDOT_API_KEY
        }
      })
      .then(response => {
        done(null, response.data)
      })
      .catch(err => {
        console.log(`~~~~~~ Axios Error in getRoutes: ${err}`);
      })
  }

  // this.getTerminalsByRoute = function (firstRes, done) {

  //   firstRes.forEach(e => {
  //     e.RouteID
  //   })

  //   axios.get(`http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/terminals/${routesForDate}`, {
  //       params: {
  //         'apiaccesscode': process.env.WSDOT_API_KEY
  //       }
  //     })
  //     .then(response => {
  //       done(null, response.data)
  //     })
  //     .catch(err => {
  //       console.log(`~~~~~~ Axios Error in getTerinals: ${err}`);
  //     })
  // }

  this.getScheduledRoutes = function (done) {
    axios.get(`http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/schedroutes/166`, {
        params: {
          'apiaccesscode': process.env.WSDOT_API_KEY
        }
      })
      .then(response => {
        done(null, response.data)
      })
      .catch(err => {
        console.log(`~~~~~~ Axios Error in getScheduledRoutes: ${err}`);
      })
  }

  // this.getScheduleForPreferredRoute = function (done) {
  //   // console.log(`Preferred Route ID in getScheduleForPreferredRoute: ${customer.firstname}`);

  //   axios.get(`http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/schedule/${routesForDate}/${customer.preferredrouteid}`, {
  //       params: {
  //         'apiaccesscode': process.env.WSDOT_API_KEY
  //       }
  //     })
  //     .then(response => {
  //       console.log(`${response.data}`)
  //       done(null, response.data)
  //     })
  //     .catch(err => {
  //       console.log(`~~~~~~ Axios Error in getScheduleForPreferredRoutes: ${err}`);
  //     })
  // }


}

router.get('/', (req, res) => {

  // TODO: Create a new express route for triggering a data load on occasion,
  //       then query a routes matrix table for this information.


  // console.log(res.locals.customer);
  let getProfileOptions = new GetProfileOptions(res.locals.customer);

  async.series([
      getProfileOptions.getCurrentlyWatchedRoutes
      // getProfileOptions.getTerminalLocations,
      // getProfileOptions.getScheduledRoutes,
      // getProfileOptions.getRoutes
      // getProfileOptions.getTerminalsByRoute,
      // getProfileOptions.getScheduleForPreferredRoute
    ])
    .then(results => {


      // console.log(results[0][0]);
      // res.json(results[0]);
      res.render('profile/index', {
        customer: res.locals.customer,
        routeMatrix: results[0],
        allAsyncResults: results
      });
    })
  // .then(results => {
  //   // the first array, results[0] is from the first call, array[1] from the second, etc...

  // })
})

//https://api.mapbox.com/directions-matrix/v1/mapbox/walking/-122.335444,47.6080696;-122.340472,47.602501?sources=1&annotations=distance,duration&access_token=pk.eyJ1IjoiYmViLSIsImEiOiJjanpsbGpuZjMwd2ttM2JrNmtyNTVldGM0In0.Tmu9yv3-2cWJFxiq87xFPQ

router.post('/', (req, res) => {

  // console.log(req.body);

  db.customer.update({
      firstname: req.body.firstname,
      // preferredrouteid: req.body.preferredrouteid
    }, {
      where: {
        id: res.locals.customer.id
      }
    })
    .then((result) => {

      let wr = JSON.parse(req.body.preferredrouteid);

      db.watchedRoute.findOrCreate({
          where: {
            customerId: res.locals.customer.id,
            departingTerminalId: wr.departingTerminalId,
            arrivingTerminalId: wr.arrivingTerminalId,
            routeId: wr.routeId
          },
          defaults: {
            customerId: res.locals.customer.id,
            routeId: wr.routeId,
            departingTerminalId: wr.departingTerminalId,
            arrivingTerminalId: wr.arrivingTerminalId
          }
        })
        .spread((watchedRoute, wasCreated) => {
          if (wasCreated) {
            console.log('watchedRoute was created.')
          } else {
            console.log('watchedRoute was not created.')
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(`${err}`)
    })

  res.redirect('/profile');
})


module.exports = router;