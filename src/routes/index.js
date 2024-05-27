var express = require('express');
var router = express.Router();

const path = require('path');
const db = require('../public/javascripts/memberQueries');

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/../views/index.html'));
});

router.post('/submit', function(req, res, next){
    db.tryLogin(req, res, onLoginValidation);
});

function onLoginValidation(req, res, isValid) {
    console.log('onLoginValidation');
    if (isValid) {
        res.redirect('/success');
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
}

router.get('/success', (req, res) => {
    res.redirect('../baseUser/');
});

module.exports = router;
