const express = require('express');
const router = express.Router();

var io = require('../index');

//var http = require('http').Server(app);
//const io = require('socket.io')(http);

// Models
const Route = require('../models/Route');
const Point = require('../models/Point');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

//New record
router.get('/record', isAuthenticated, async (req, res) => {
    var user = req.user.id;
    res.render('maps/record', { user });
});

//Save Route 
io.on('connection', function (socket) {
    socket.on('new route', async function (user) {
        const newRoute = new Route({ user: user });
        await newRoute.save();
        socket.emit('new route', JSON.stringify(newRoute._id));
    });
});

//Show all routes
router.get('/routes', isAuthenticated, async (req, res) => {
    const routes = await Route.find({ user: req.user.id })
        .sort({ date: 'desc' });

    var data = [];
    var routeIds = [];
    for(var i = 0; i < routes.length; i++) {
        var points = await Point.find({route: routes[i].id}).sort({dat: 'desc'});
        data[i] = points;
        routeIds[i] = points[0].route;
    }
    res.render('maps/all-routes', { routes: routes});
});

//Delete
router.delete('/routes/delete/:id', isAuthenticated, async (req, res) => {
    await Route.findByIdAndDelete(req.params.id);
    req.flash('success_msg', "Route deleted successfully");
    res.redirect('/routes');
});

//Show route
router.get('/routes/see/:id', isAuthenticated, async (req, res) => {
    var points = await Point.find({route: req.params.id});
    res.render('maps/see-route', {points: JSON.stringify(points)});
});

//When stop recording
router.post('/stop', isAuthenticated, async (req, res) => {
    req.flash('success_msg', "Route recorded successfully");
    res.redirect('/routes');
});

module.exports = router; 