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

//Save Route 
router.post('/newroute', isAuthenticated, async(req, res) => {
    const newRoute = new Route({user: req.user.id, 
        lat: JSON.parse(req.body.latArr), lon: JSON.parse(req.body.lonArr)});
    await newRoute.save();
    req.flash('success_msg', 'Route Added Successfully');
    res.redirect('/routes');
});

//Show all routes
router.get('/routes', isAuthenticated, async(req, res) => {
    const routes = await Route.find({
        user: req.user.id}).sort({date: 'desc'});
    res.render('maps/all-routes', {routes});
});

//Delete
router.delete('/routes/delete/:id', isAuthenticated, async(req, res) => {
    await Route.findByIdAndDelete(req.params.id);
    req.flash('success_msg', "Route deleted successfully");
    res.redirect('/routes');
});

module.exports = router;