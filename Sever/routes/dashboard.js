var express = require('express');
var router = express.Router();

/* GET Dashboard Page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});

module.exports = router;
