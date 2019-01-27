const express = require('express');
const router = express.Router();
const loc = require

// Models
const Route = require('../models/Route');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

//New record
router.get('/record', isAuthenticated, async (req, res) => {
    res.render('maps/record');
});

router.post('/newroute', isAuthenticated, async(req, res) => {
    const newRoute = new Route({user: req.user.id, 
        lat: JSON.parse(req.body.latArr), lon: JSON.parse(req.body.lonArr)});
    await newRoute.save();
    req.flash('success_msg', 'Route Added Successfully');
    res.redirect('/');
});

module.exports = router;