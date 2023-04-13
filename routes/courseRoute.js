const express = require('express');
const { uploader } = require('../middleware/multer');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('course/course-list.ejs');
});
router.get('/add', (req, res) => {
  res.render('course/course-add.ejs');
});
router.post('/add', uploader.single('thumnail_course'), (req, res) => {
  res.send('완료');
});

module.exports = router;
