var express = require('express');
var router = express.Router();

// Redirect to the Echo Site
router.get('/', function(req, res, next) {
  res.redirect('/echo');
});

module.exports = router;
