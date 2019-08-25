const router = require('express').Router();
const db = require('../models');


router.get('/', (req, res) => {
//  console.log(req.user);  

  res.render('profile/index', {
    customer: res.locals.customer
  });
})


module.exports = router;
