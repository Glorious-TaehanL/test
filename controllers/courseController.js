const MainCourse = require('../models/MainCourse');
const Sequences = require('../models/Sequence');
const SubCourse = require('../models/SubCourse');

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
 * @param {*} req user information.
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
const subCourseList = async (req, res) => {
  const subCourseList = await SubCourse.find({}, { id: 1, indexnumber: 1, title: 1, maincategory: 1 }).sort({ id: -1 });
  res.render('course/course-content-list.ejs', { user: req.user, courses: subCourseList });
};

/**
 *
 * @brief Display to subcourse add get request.
 *
 * @param {*} req  user information.
 * @param {*} res
 * @return course-content-add.ejs page and main Courselist.
 *
 */
const displaySubCourseAdd = async (req, res) => {
  const mainList = await MainCourse.find({}, { id: 1, title: 1, term: 1 });
  res.render('course/course-content-add.ejs', { user: req.user, courses: mainList });
};

/**
 * @brief subcourse add post
 *
 * @param {*} req
 * @param {*} res
 */
const subCourseAdd = async (req, res) => {
  console.log(req.body);
  Sequences.findOneAndUpdate({ name: 'subcourse-number' }, { $inc: { counter: 1 } })
    .then(function (result) {
      const { counter } = result;
      //   console.log('successfully update sequence data');
      SubCourse.create({
        id: counter,
        indexnumber: req.body.subcourses_indexno,
        title: req.body.subcourse_title,
        maincategory: req.body.maincourse_category,
        content: req.body.note_content,
        link: req.body.subcourse_link,
      })
        .then(function (result) {
          console.log(result);
        })
        .catch(function (err) {
          console.log('1' + err);
        });
    })
    .catch(function () {});
};

/**
 *
 * @brief Display to subcourse add get request.
 *
 * @param {*} req  user information.
 * @param {*} res
 * @return course-content-add.ejs page and main Courselist.
 *
 */
const displaySubCourseEdit = async (req, res) => {
  // const mainList = await MainCourse.find({}, { id: 1, title: 1, term: 1 });
  var videoYoutubeVendor = false;
  var result;

  const subCourse = await SubCourse.findOne({ id: req.params.id })
    .then((result) => {
      if (result.link.includes('youtu')) {
        videoYoutubeVendor = true;
      }
      return result;
    })
    .catch(() => {});

  const mainCourseTitle = await MainCourse.findOne({ id: subCourse.maincategory }, { title: 1 });

  res.render('course/course-content-edit.ejs', { user: req.user, subcourse: { sub: subCourse, main: mainCourseTitle.title }, youtubeCheck: videoYoutubeVendor });
};

module.exports = {
  addCourse,
  displayAddPost,
  displaySubCourseAdd,
  listCourse,
  subCourseList,
  subCourseAdd,
  displaySubCourseEdit,
};
