const express = require('express');
const {
  addCourse,
  detailCourse,
  deleteCourse,
  updateDetailCourse,
  listCourse,
  displayAddPost,
  displaySubCourseAdd,
  displaySubCourseEdit,
  subCourseList,
  subCourseAdd,
  subCourseEdit,
} = require('../controllers/courseController');
const { uploader } = require('../middleware/multer');
const router = express.Router();

// root path '/course'

router.get('/', listCourse);
router.get('/add', displayAddPost);
router.get('/detail/:id', detailCourse);
router.get('/content/list', subCourseList);
router.get('/content/add', displaySubCourseAdd);
router.get('/content/edit/:id', displaySubCourseEdit);

router.delete('/delete', deleteCourse);

router.post('/content/add', subCourseAdd);
router.post('/detail/update', uploader.single('thumnail_course'), updateDetailCourse);
router.post('/add', uploader.single('thumnail_course'), addCourse);

router.put('/content/edit', subCourseEdit);

module.exports = router;
