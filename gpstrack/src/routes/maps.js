const express = require('express');
const router = express.Router();

const app = require('../index');
var http = require('http').Server(app);
const io = require('socket.io')(http);

// Models
const Route = require('../models/Route');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

//New record
router.get('/record', isAuthenticated, async (req, res) => {
    res.render('maps/record', {user: req.user.id});
});

//Save Route 
io.on('conection', function(socket) {
    socket.on('new route', async function(socket){
        console.log("Llegamos al server!!");
        const newRoute = new Route({user: JSON.parse(user._id)});
        await newRoute.save();
        socket.emit('new route', JSON.stringify(newRoute._id));
    });
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

//When stop recording
router.post('/stop', isAuthenticated, async(req, res) => {
    req.flash('success_msg', "Route recorded successfully");
    res.redirect('/routes');
});

module.exports = router; 