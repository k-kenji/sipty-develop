'use strict';
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  response.render('login', { user: req.user });
});

module.exports = router;