'use strict';
const express = require('express');
const router = express.Router();

router.get('/', function(request, response) {
  response.render('login', { user: req.user });
});

module.exports = router;