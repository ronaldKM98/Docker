const express = require('express');
const router = express.Router(); // Define server routes 

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
