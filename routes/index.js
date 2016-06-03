var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
   return res.render('index', {
       'title': 'Play Nine',
       'welcomeString': 'Welcome to ZomboCom!!!'
   });
});

module.exports = router;
