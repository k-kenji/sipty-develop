'use strict';
const express = require('express');
const router = express.Router();

router.get('/login', function(req, res) {
  res.redirect(config.instagram.auth_url);
});

module.exports = router;