'use strict';
const express = require('express');
const router = express.Router();

router.get('/login', function(req, res) {
  response.render('login', { user: req.user });
});

module.exports = router;