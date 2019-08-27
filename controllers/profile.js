const router = require('express').Router();
const db = require('../models');
const axios = require('axios');


router.get('/', (req, res) => {
  //  console.log(req.user);  

  // GOTO WSDOT and Get a list of Router/Terminals?
  // Send as a routes object to profile/index
  // set selected as default in ejs based on gps coords.

  axios.get('http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/routes/2019-10-10', {
      params: {
        'apiaccesscode': process.env.WSDOT_API_KEY
      }
    })
    .then(function (response) {
      // console.log(response.data)
      res.render('profile/index', {
        customer: res.locals.customer,
        routes: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });


})

//https://api.mapbox.com/directions-matrix/v1/mapbox/walking/-122.335444,47.6080696;-122.340472,47.602501?sources=1&annotations=distance,duration&access_token=pk.eyJ1IjoiYmViLSIsImEiOiJjanpsbGpuZjMwd2ttM2JrNmtyNTVldGM0In0.Tmu9yv3-2cWJFxiq87xFPQ

router.post('/', (req, res) => {

  console.log(req.body);

  db.customer.update({
      firstname: req.body.firstname,
      preferredrouteid: req.body.preferred_route
    }, {
      where: {
        id: res.locals.customer.id
      }
    })
    .then((result) => {

    })
    .catch(err => {
      console.log(`${err}`)
    })

  res.redirect('/profile');
})


module.exports = router;