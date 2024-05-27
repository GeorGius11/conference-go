var express = require('express');
var router = express.Router();

const path = require('path');
const conferencesDB = require('./../public/javascripts/conferenceQueries');
const additionsDB = require('./../public/javascripts/additionsQueries');
const memebersDB = require('./../public/javascripts/memberQueries');

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/../views/moderator.html'));
});

router.get('/conferences', conferencesDB.getConferences);
router.post('/conferences/create', conferencesDB.createConference);

router.post('/conferences/reports/', additionsDB.addReport);

module.exports = router;