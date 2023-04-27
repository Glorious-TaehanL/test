const express = require('express');
const { addCourse, listCourse, displayAddPost, displaySubCourseAdd, displaySubCourseEdit, subCourseList, subCourseAdd } = require('../controllers/courseController');
const { uploader } = require('../middleware/multer');
const router = express.Router();

router.get('/', listCourse);
router.get('/add', displayAddPost);
router.get('/content/list', subCourseList);
router.get('/content/add', displaySubCourseAdd);
router.get('/content/edit/:id', displaySubCourseEdit);
router.post('/content/add', subCourseAdd);
router.post('/add', uploader.single('thumnail_course'), addCourse);

module.exports = router;
