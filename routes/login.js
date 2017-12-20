'use strict';
const express = require('express');
const router = express.Router();

router.get('/login', function(req, res) {
  // console.log(req);
  console.log(res);
  res.render('login', {user: req});

});

module.exports = router;