var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/college-teams');
var collegeTeams = db.get('teams');

router.get('/', function (req, res, next) {
  collegeTeams.find({}, function (err, data){
    res.render('teams/index', { title: "College Teams",
                                allTeams: data
                              })
  })
})

router.get('/new', function (req, res, next){
  res.render('teams/newteam', { title: "Enter a team"})
})

router.post('/', function (req, res, next) {
  collegeTeams.insert({ school: req.body.collegename,
                        location: req.body.city,
                        mascot: req.body.mascot,
                        accredited: req.body.accredited
                      });
  res.redirect('/teams');
})



module.exports = router;