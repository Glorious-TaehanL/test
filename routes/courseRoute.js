const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('course/course-list.ejs');
});
router.get('/add', (req, res) => {
  res.render('course/course-add.ejs');
});

module.exports = router;
