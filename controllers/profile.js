const router = require('express').Router();
const db = require('../models');


router.get('/', (req, res) => {
  //  console.log(req.user);  

  // GOTO WSDOT and Get a list of Router/Terminals?
  // Send as a routes object to profile/index
  // set selected as default in ejs based on gps coords.
  let routes = [{
      RouteID: 5,
      Description: 'Seattle / Bainbridge Island'
    },
    {
      RouteID: 8,
      Description: "Port Townsend / Coupeville"
    }
  ]

  res.render('profile/index', {
    customer: res.locals.customer,
    routes: routes
  });
})


router.post('/', (req, res) => {
  res.json(req.body);
})


module.exports = router;