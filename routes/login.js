var express = require('express');
var router = express.Router();

router.get('/login', function(request, response) {
  response.render('login');
})

module.exports = router;
