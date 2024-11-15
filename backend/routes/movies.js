var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render( 'movieListing');
});
router.get('/form', function(req, res) {
    res.render( 'form');
  });
  
router.get('/view', function(req, res) {
    res.render( 'movie');
  });
router.get('/watchHistory', function(req, res) {
    res.render( 'watchHistory');
  });
router.get('/report', function(req, res) {
    res.render( 'report');
  });
  
module.exports = router;
