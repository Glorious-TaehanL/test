const express = require('express');
const { listDisplay, addPost, deletePost, detailPost } = require('../controllers/noticeController');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Route working');
});

router.get('/list', listDisplay);
router.get('/detail/:id', detailPost);

router.post('/add', addPost);

router.delete('/delete', deletePost);

module.exports = router;
