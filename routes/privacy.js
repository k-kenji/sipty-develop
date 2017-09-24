var express = require('express');
var router = express.Router();

// デフォルトルーティング
router.get('/', function (request, response) { // このURLpathが呼ばれると
    response.render('privacy');
});

module.exports = router;
