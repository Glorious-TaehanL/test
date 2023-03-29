const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Route working');
});

router.get('/list', (req, res) => {
  res.render('list.ejs');
});

module.exports = router;
