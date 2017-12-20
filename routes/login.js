'use strict';
const express = require('express');
const router = express.Router();

router.get('/login', function(req, res) {
  console.log("テスト1" + req);
  console.log("テスト2" + res);
  res.render('login', {user: req});

});

module.exports = router;