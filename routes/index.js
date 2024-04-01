const path = require('path');
var express = require('express');
var router = express.Router();

const publicPath = path.join(__dirname, '../apps/diplom/public');
console.log(publicPath)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hello")
  // res.render('index', {"title": "hello"});
  // res.sendFile(path.join(publicPath, 'index.html'));
});

// router.get('/', function(req, res, next) {
//   res.sendFile(path.join(__dirname, "../apps/diplom/public/index.html"))
//   // res.render('index');
// });
// router.get('/*', function(req, res, next) {
//   res.sendFile(path.join(__dirname, "../apps/diplom/public/index.html"))
//   // res.render('index');
// });

module.exports = router;
