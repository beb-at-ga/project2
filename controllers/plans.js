const router = require('express').Router();
const db = require('../models');
const axios = require('axios');
const moment = require('moment');
const async = require('async');


let MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

router.post('/', (req, res) => {
  // res.send(req.body);

  axios.get(`http://www.wsdot.wa.gov/Ferries/API/terminals/rest/terminallocations`, {
      params: {
        'apiaccesscode': process.env.WSDOT_API_KEY
      }
    })
    .then(terminalLocations => {
      terminalLocations.data.forEach(e => {
        if (e.TerminalName === req.body.TerminalDescription) {
          let c = [e.Longitude,e.Latitude];
          console.log(e.TerminalName);
          res.send(c);
        }

      });
    })
})

module.exports = router;