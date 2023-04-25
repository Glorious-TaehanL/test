const MainCourse = require('../models/MainCourse');
const Sequences = require('../models/Sequence');

/**
 * @brief Display to add post page
 *
 * @param {*} req
 * @param {*} res
 * @return course-add.ejs and user data
 */
const displayAddPost = (req, res) => {
  res.render('course/course-add.ejs', { user: req.user });
};

/**
 * @brief add Course post handler
 *
 * @param {*} req.file filename.
 * @param {*} req.body course_title/ course_description
 * @param {*} res
 * @return nothing. <-작업해야함.
 */
const addCourse = (req, res) => {
  console.log(req.file.filename);
  console.log(req.body);
  Sequences.findOneAndUpdate({ name: 'maincourse-number' }, { $inc: { counter: 1 } })
    .then(function (result) {
      const { counter } = result;
      MainCourse.create({ id: counter, title: req.body.course_title, term: req.body.course_term, thumbnail: req.file.filename, description: req.body.course_description })
        .then(function () {
          console.log('successfully main course updated');
        })
        .catch(function (err) {
          console.log(err);
          console.log('Invaild to update main course');
        });
    })
    .catch(function (err) {
      console.log(err);
    });
};

/**
 * @brief Display to list course
 *
 * @param {*} req
 * @param {*} res
 * @return course-list.ejs ,user data and course list
 */
const listCourse = async (req, res) => {
  const mainList = await MainCourse.find();
  res.render('course/course-list.ejs', { user: req.user, courses: mainList });
};

/**
 * @brief Display to course content list
 *
 */
const subCourseList = (req, res) => {
  res.render('course/course-content-list.ejs', { user: req.user });
};

const subCourseAdd = async (req, res) => {
  const mainList = await MainCourse.find({}, { id: 1, title: 1, term: 1 });
  res.render('course/course-content-add.ejs', { user: req.user, courses: mainList });
};

module.exports = {
  displayAddPost,
  addCourse,
  listCourse,
  subCourseList,
  subCourseAdd,
};
