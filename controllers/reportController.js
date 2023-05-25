const MainCourse = require('../models/MainCourse');
const SubCourse = require('../models/SubCourse');
const Customer = require('../models/Customer');
const Sequences = require('../models/Sequence');
const Notice = require('../models/Notice');

const displayReportData = async (req, res) => {
  //Get notice count
  var noticeCnt = await Notice.countDocuments({ content: { $exists: true } });
  if (!noticeCnt) {
    var noticeCnt = '#err';
  }

  //Get maincourse count
  var mainCourseCnt = await MainCourse.countDocuments({ title: { $exists: true } });
  if (!mainCourseCnt) {
    var mainCourseCnt = '#err';
  }

  //Get subcourse count
  var subCourseCnt = await SubCourse.countDocuments({ id: { $exists: true } });
  if (!subCourseCnt) {
    var subCourseCnt = '#err';
  }

  //Get customer count
  var customerCnt = await Customer.countDocuments({ email: { $exists: true } });
  if (!customerCnt) {
    var customerCnt = '#err';
  }
  res.render('index', { user: req.user, reportData: { noticeCnt, mainCourseCnt, subCourseCnt, customerCnt } });
};

module.exports = {
  displayReportData,
};
