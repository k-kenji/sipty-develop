'use strict';
const express = require('express');
const router = express.Router();

router.get('/login', function(req, res) {
  res.render('login', {user: req.user.email});
});

module.exports = router;