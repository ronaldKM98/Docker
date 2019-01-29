const express = require('express');
const router = express.Router();

// Models
const Point = require('../models/Point');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

//Save point  Necesita ser implementado usando Socket
router.post('/newpoint', isAuthenticated, async(req, res) => {
    const newPoint = new Point({route: req.body.routeId, 
        lat: req.body.lat, lon: req.body.lon});
    await newPoint.save();
    console.log(newPoint);
});

module.exports = router;