var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next){
  res.render('teams/index', { title: "College Teams"})
})

router.get('/new', function (req, res, next){
  res.render('teams/newteam', { title: "Enter a team"})
})



module.exports = router;