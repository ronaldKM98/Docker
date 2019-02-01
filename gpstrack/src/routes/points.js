const express = require('express');
const router = express.Router();

const io = require('../index');
//var http = require('http').Server(app);
//const io = require('socket.io')(http);

// Models
const Point = require('../models/Point');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

//Save point  Necesita ser implementado usando Socket
io.on('connection', function(socket) {
    socket.on('new point', async function(data) {
        console.log("Llegamos al server paso 2!!");
        const newPoint = new Point({route: data.routeId, lat: data.lat, lon: data.lon});
        await newPoint.save();
    });
});

//router.post('/newpoint', isAuthenticated, async(req, res) => {
  //  const newPoint = new Point({route: req.body.routeId, 
   //     lat: req.body.lat, lon: req.body.lon});
    //await newPoint.save();
//});

module.exports = router;