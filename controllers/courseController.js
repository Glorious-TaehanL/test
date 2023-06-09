//models
const MainCourse = require('../models/MainCourse');
const Sequences = require('../models/Sequence');
const SubCourse = require('../models/SubCourse');
//init
const StatusCodes = require('http-status-codes');
const COURSE_ROW_COUNT = process.env.COURSE_ROW_COUNT;
//logger
const logger = require('../winston/logger');

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
 * @return Redirect Main course list with updated query value.
 */
const addCourse = async (req, res) => {
  var createMainCourseFlag = false;
  Sequences.findOneAndUpdate({ name: 'maincourse-number' }, { $inc: { counter: 1 } })
    .then(function (result) {
      const { counter } = result;
      MainCourse.create({
        id: counter,
        price: req.body.course_price,
        title: req.body.course_title,
        term: req.body.course_term,
        thumbnail: req.file.filename,
        description: req.body.course_description,
        information: req.body.course_information,
      })
        .then(function () {
          logger.info('successfully main course updated.');
          res.redirect('/course?updated=create');
        })
        .catch(function (err) {
          logger.error(err);
        });
    })
    .catch(function (err) {
      logger.error(err);
    });
};

const detailCourse = async (req, res) => {
  const { id } = req.params;
  const maincourse = await MainCourse.find({ id: req.params.id })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      logger.error(err);
    });
  //   console.log(req.params.id);
  res.render('course/course-detail.ejs', { user: req.user, course: maincourse });
};

const deleteCourse = (req, res) => {
  const { id } = req.body;
  var issueFlag = false;

  MainCourse.deleteOne({ id: id })
    .then(() => {
      logger.info('Successfully delete MainCourse #' + id);
    })
    .catch((mainCourseError) => {
      issueFlag = true;
      logger.error(mainCourseError);
    });

  if (!issueFlag) {
    SubCourse.deleteMany({ maincategory: id })
      .then(async () => {
        const totalMainCourse = await (await MainCourse.find()).length;
        const totalMainCoursePagination = Math.ceil(totalMainCourse / COURSE_ROW_COUNT);
        var pagenum = 1;

        var mainList = await MainCourse.find().sort({ id: -1 }).limit(COURSE_ROW_COUNT);
        const flag = 2;
        res.render('course/course-list.ejs', { user: req.user, courses: mainList, updated: flag, pageindex: { pagenum: pagenum, pagination: totalMainCoursePagination } });
      })
      .catch((subCourseErr) => {
        logger.error('DeleteCourse function Subcourse.deletemany issue : ' + subCourseErr);
      });
  }
};

const updateDetailCourse = async (req, res) => {
  var imgName;
  if (req.file) {
    imgName = req.file.filename;
  } else {
    imgName = req.body.thumbnail;
  }
  //   const thumbnailimgname =

  MainCourse.findOneAndUpdate(
    { id: parseInt(req.body.id) },
    { price: req.body.course_price, title: req.body.course_title, term: req.body.course_term, thumbnail: imgName, description: req.body.course_description, information: req.body.course_information },
    {}
  )
    .then((doc) => {
      res.status(StatusCodes.OK).redirect('/course');
    })
    .catch((err) => {
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
  const totalMainCourse = await (await MainCourse.find()).length;
  const totalMainCoursePagination = Math.ceil(totalMainCourse / COURSE_ROW_COUNT);
  var pagenum = 1;

  var flag = 0;
  if (req.query.updated === 'create') {
    flag = 1;
  }

  if (typeof req.query.indexnum !== 'undefined') {
    var mainList = await MainCourse.find()
      .sort({ id: -1 })
      .skip(COURSE_ROW_COUNT * (req.query.indexnum - 1))
      .limit(COURSE_ROW_COUNT);
    if (!mainList) {
      logger.error('Cannot get main course list in listCourse().');
    }
  } else if (typeof req.query.indexnum === 'undefined' || req.query.indexnum == 1) {
    var mainList = await MainCourse.find().sort({ id: -1 }).limit(COURSE_ROW_COUNT);
  }
  res.render('course/course-list.ejs', { user: req.user, courses: mainList, updated: flag, pageindex: { pagenum: pagenum, pagination: totalMainCoursePagination } });
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

      SubCourse.create({
        id: counter,
        indexnumber: req.body.subcourses_indexno,
        title: req.body.subcourse_title,
        maincategory: req.body.maincourse_category,
        content: req.body.note_content,
        link: req.body.subcourse_link,
        sampling: req.body.sampling_value,
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

const subCourseEdit = async (req, res) => {
  SubCourse.findOneAndUpdate({ id: parseInt(req.body.subid) }, { title: req.body.subcourse_title, content: req.body.note_content, link: req.body.subcourse_link, sampling: req.body.sampling_value })
    .then((doc) => {
      res.status(StatusCodes.OK).redirect('/course/content/list');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  addCourse,
  detailCourse,
  deleteCourse,
  updateDetailCourse,
  displayAddPost,
  displaySubCourseAdd,
  listCourse,
  subCourseList,
  subCourseAdd,
  displaySubCourseEdit,
  subCourseEdit,
};
