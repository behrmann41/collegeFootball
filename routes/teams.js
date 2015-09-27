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

router.get('/:id', function (req, res, next) {
  collegeTeams.findOne({_id: req.params.id}, function (err, data){
    res.render('teams/show', { theTeam: data })
  })
})

router.get('/:id/edit', function (req, res, next) {
  collegeTeams.findOne({_id: req.params.id}, function (err, data){
    res.render('teams/edit', { theTeam: data})
  })
})

router.post('/:id/edit', function (req, res, next) {
  collegeTeams.updateById(req.params.id, {  school: req.body.collegename,
                                            location: req.body.city,
                                            mascot: req.body.mascot,
                                            accredited: req.body.accredited
                                          }, function (err, data) {
  res.redirect('/teams/' + req.params.id)
  })
})



module.exports = router;