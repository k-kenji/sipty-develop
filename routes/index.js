var express = require('express');
var router = express.Router();

// デフォルトルーティング
router.get('/', function (request, response) { // このURLpathが呼ばれると
    response.render('index', { title: 'Sample Node.js', message: 'Hello there!' });
});

router.get('/login', function(request, response) {
  response.render('login');
})

module.exports = router;
