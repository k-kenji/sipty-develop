var express = require('express');
var router = express.Router();

router.get('/facebook-login', function(request, response) {
  response.render('login');
})

module.exports = router;
