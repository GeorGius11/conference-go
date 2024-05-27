var express = require('express');
var router = express.Router();

const path = require('path');
const conferencesDB = require('./../public/javascripts/conferenceQueries');
const additionsDB = require('./../public/javascripts/additionsQueries');
const memebersDB = require('./../public/javascripts/memberQueries');

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/../views/base.html'));
});

router.get('/conferences', conferencesDB.getConferences);

router.get('/conferences/:id', conferencesDB.getConferenceByID);

router.put('/conferences/:id', conferencesDB.updateConference);

router.delete('/conferences/:id', conferencesDB.deleteConference);

router.get('/conferences/:id/feedback/', additionsDB.getFeedbackForConference);

router.get('/reports/', additionsDB.getReports);
router.get('/reports/:id', additionsDB.getReportsForConference);

router.get('/conferences/:cid/reports/:rid/feedback', additionsDB.getFeedbackForReporterInConference);

router.get('/members/:id', memebersDB.getMemberWithID);

router.post('/conferences/register', additionsDB.registerForConference);

module.exports = router;