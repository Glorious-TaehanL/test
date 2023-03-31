const express = require('express');
const { displayListPage, addPost, deletePost, detailPost, displayEditPage, editPost } = require('../controllers/noticeController');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Route working');
});

router.get('/list', displayListPage);
router.get('/detail/:id', detailPost);
router.get('/edit/:id', displayEditPage);

router.post('/add', addPost);
router.put('/edit', editPost);

router.delete('/delete', deletePost);

module.exports = router;
