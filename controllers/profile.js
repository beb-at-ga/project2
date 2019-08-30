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


  this.getRouteCombos = function (done) {
    // Make Customer to Route and Teminals Many to Many through the watched Route Table.
    // console.log(`~~~~ In getRouteCombos.`)
    db.routeCombo.findAll()
      .then(results => {
        done(null, results);
      })
      .catch(err => {
        console.log(`~~~~~ Err: ${err}`);
      })
  }


  this.getWatchedJourns = function (done) {
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


  this.getWatchedRoutesForCustomer = function (done) {
    db.customer.findOne({
        where: {
          id: customer.id
        },
        include: [{
          model: db.routeCombo
        }]
      })
      .then((results) => {
        done(null, results);
      })
      .catch((err) => {
        console.log(err);
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

  this.getSailings = function (done) {
    axios.get(`http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/sailings/1850`, {
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

// router.get('/:id', (req, res) => {
//   // db.customersRouteCombos.findAll().then(stuff => {
//   //   res.send(stuff)
//   // })

//   // db.customersRouteCombos.create({
//   //   customerId: 1,
//   //   routeComboId: 2
//   // }).then(stuff => {
//   //   res.send(stuff)
//   // })
// })


router.get('/', (req, res) => {

  // TODO: Create a new express route for triggering a data load on occasion,
  //       then query a routes matrix table for this information.

  // console.log(res.locals.customer);
  let getProfileOptions = new GetProfileOptions(res.locals.customer);

  async.series([
      getProfileOptions.getRouteCombos,
      getProfileOptions.getWatchedRoutesForCustomer,
      getProfileOptions.getWatchedJourns
      // getProfileOptions.getTerminalLocations,
      // getProfileOptions.getScheduledRoutes,
      // getProfileOptions.getRoutes
      // getProfileOptions.getTerminalsByRoute,
      // getProfileOptions.getScheduleForPreferredRoute
    ])
    .then(results => {

      let routeMatrix = results[0];
      let watchedRoutes = results[1];
      let watchedJourns = results[2].watchedJourneys;

      // if (watchedRoutes.routeCombos.length > 0 && watchedJourns.length > 0) {
      //   res.render('profile/index', {
      //     customer: res.locals.customer,
      //     routeMatrix: routeMatrix,
      //     watchedRoutes: watchedRoutes,
      //     watchedJourns: watchedJourns,
      //     allAsyncResults: results
      //   });
      // } else if (watchedRoutes.routeCombos.length > 0) {
      //   res.render('profile/index', {
      //     customer: res.locals.customer,
      //     routeMatrix: routeMatrix,
      //     watchedRoutes: watchedRoutes,
      //     allAsyncResults: results
      //   });
      // } else {
      //   res.render('profile/index', {
      //     customer: res.locals.customer,
      //     routeMatrix: routeMatrix,
      //     watchedRoutes: watchedRoutes,
      //     allAsyncResults: results
      //   });
      // }

      // res.json(watchedJourns);
      res.render('profile/index', {
        moment: moment,
        customer: res.locals.customer,
        routeMatrix: routeMatrix,
        watchedRoutes: watchedRoutes,
        watchedJourns: watchedJourns,
        allAsyncResults: results
      });

    })
})

//https://api.mapbox.com/directions-matrix/v1/mapbox/walking/-122.335444,47.6080696;-122.340472,47.602501?sources=1&annotations=distance,duration&access_token=pk.eyJ1IjoiYmViLSIsImEiOiJjanpsbGpuZjMwd2ttM2JrNmtyNTVldGM0In0.Tmu9yv3-2cWJFxiq87xFPQ

router.post('/update', (req, res) => {
  db.customer.update({
      firstname: req.body.firstname
    }, {
      where: {
        id: res.locals.customer.id
      }
    })
    .then(() => {
      res.redirect('/profile');
    })
})



router.post('/', (req, res) => {

  let wr = JSON.parse(req.body.preferredroute);

  db.customer.findByPk(res.locals.customer.id)
    .then((cust) => {
      db.routeCombo.findOrCreate({
          where: {
            id: wr.id
          }
        })
        .spread((routeCombo, created) => {
          cust.addRouteCombo(routeCombo)
            .then(() => {

            })
        })
    })
    .then((cust) => {
      res.redirect('/profile');
    })
    .catch(err => {
      console.log(`~~~~~ Err in find customer: ${err}`);
    })
})


router.post('/addJourneys', (req, res) => {

  
  // res.json(req.body)
  // console.log((JSON.parse(req.body.journeyData)).departingTerminalId);


  // console.log(JSON.parse(req.body.journeyData).journeyId);

  db.customer.findByPk(res.locals.customer.id)
    .then((cust) => {
      db.watchedJourney.findOrCreate({
          where: {
            journyId: (JSON.parse(req.body.journeyData)).journeyId,
            customerId: cust.id
          },
          defaults: {
            departingTerminalId: (JSON.parse(req.body.journeyData)).departingTerminalId,
            departingTime: (JSON.parse(req.body.journeyData)).departingTime
          }
        })
        .spread((journ, created) => {
          cust.addWatchedJourney(journ)
            .then(() => {
              res.redirect('/profile');
            })
        })
    })
    .catch(err => {
      console.log(`~~~~~ Err in find customer: ${err}`);
    })
})

module.exports = router;