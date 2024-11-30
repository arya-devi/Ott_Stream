var express = require('express');
const { verifyAdmin } = require('../middlewares/authMiddleware');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render( 'login');
});
router.get('/profile',verifyAdmin, function(req, res, next) {
  res.render( 'profile');
});
router.get('/logout',verifyAdmin, function(req, res, next) {
  res.clearCookie('authToken');
  res.render('login')
});

module.exports = router;
