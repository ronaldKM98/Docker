const express = require('express');
const router = express.Router();

const app = require('../index');
var http = require('http').Server(app);
const io = require('socket.io')(http);

// Models
const Point = require('../models/Point');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

//Save point  Necesita ser implementado usando Socket
io.on('conection', function(socket) {
    socket.on('new point', async function(socket){
        console.log("Llegamos al server!!");
        const newPoint = new Point({route: routeId, 
            lat: lat, lon: lon});
        await newPoint.save();
    });
});

//router.post('/newpoint', isAuthenticated, async(req, res) => {
  //  const newPoint = new Point({route: req.body.routeId, 
   //     lat: req.body.lat, lon: req.body.lon});
    //await newPoint.save();
//});

module.exports = router;