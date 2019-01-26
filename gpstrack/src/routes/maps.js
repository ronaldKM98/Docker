const express = require('express');
const router = express.Router();

// Models

// Helpers
const { isAuthenticated } = require('../helpers/auth');

//New record
router.get('/record', isAuthenticated, async (req, res) => {
    res.render('maps/record');
});

module.exports = router;