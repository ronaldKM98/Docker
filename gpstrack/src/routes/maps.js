const express = require('express');
const router = express.Router();

var io = require('../index');

//var http = require('http').Server(app);
//const io = require('socket.io')(http);

// Models
const Route = require('../models/Route');
const Point = require('../models/Point');
const SharedRoute = require('../models/SharedRoute');

// Helpers
const { isAuthenticated } = require('../helpers/auth');
const googleMaps = require('@google/maps').createClient({
    key: 'AIzaSyCiBf4m7ClP7aXF3MME0c1oo0nGMa336kM',
    Promise: Promise
});

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

    //Aqui calcular los geocodes para mandarlos al cliente ya calculados
    var routesArr = []
    routesArr = await geocode(routes);
    res.render('maps/all-routes', { routes: routesArr });
});

//Delete
router.delete('/routes/delete/:id', isAuthenticated, async (req, res) => {
    await Route.findByIdAndDelete(req.params.id);
    req.flash('success_msg', "Route deleted successfully");
    res.redirect('/routes');
});

//Show route
router.get('/routes/see/:id', isAuthenticated, async (req, res) => {
    var points = await Point.find({ route: req.params.id }).sort({ date: 'desc' });
    res.render('maps/see-route', { points: JSON.stringify(points) });
});

//When stop recording
router.post('/stop', isAuthenticated, async (req, res) => {
    req.flash('success_msg', "Route recorded successfully");
    res.redirect('/routes');
});

//Save shared Route
router.post('/share/:id', isAuthenticated, async (req, res) => {
    const route = new SharedRoute({ routeId: req.params.id });
    await route.save();
    req.flash('success_msg', 'Route shared successfully');
    res.redirect('/routes');
});

//Get all shared routes
router.get('/shared', isAuthenticated, async (req, res) => {
    var routesIds = await SharedRoute.find().sort({ date: 'desc' });
    var routes = new Array();

    routesIds.forEach(async function (routeId) {
        var route = await Route.find({ _id: routeId.routeId });
        routes.push(route);
    });
    console.log(routes);
    var routesArr = await geocode(routes);

    res.render('maps/shared', { routes: routesArr });
});

async function geocode(routes) {
    var routesArr = [];
    for (var i = 0; i < routes.length; i++) {
        var points = await Point.find({ route: routes[i].id }).sort({ dat: 'desc' });
        if (points.length > 0) {
            var start = await googleMaps.reverseGeocode({
                latlng: [points[0].lat, points[0].lon],
                language: 'en'
            })
                .asPromise()
                .then((response) => {
                    return response.json.results[0].formatted_address;
                })
                .catch((err) => {
                    console.log(err);
                });
            var end = await googleMaps.reverseGeocode({
                latlng: [points[points.length - 1].lat, points[points.length - 1].lon],
                language: 'en'
            })
                .asPromise()
                .then((response) => {
                    return response.json.results[0].formatted_address;
                })
                .catch((err) => {
                    console.log(err);
                });

            var route = {
                id: routes[i].id,
                date: routes[i].date,
                start: start,
                end: end
            }
            routesArr.push(route);
        }
    }
    return routesArr;
}

module.exports = router;