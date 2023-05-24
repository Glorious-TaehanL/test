const MainCourse = require('../models/MainCourse');
const Sequences = require('../models/Sequence');
const Notice = require('../models/Notice');

const displayReportData = async (req, res) => {
  const noticeCnt = await Notice.countDocuments({ content: { $exists: true } })
    .then((count) => {
      console.log(`'name' 필드의 데이터 갯수: ${count}`);
      return count;
    })
    .catch((err) => {
      console.log(err);
    });
  const mainCourseCnt = await MainCourse.countDocuments({ title: { $exists: true } })
    .then((count) => {
      return count;
    })
    .catch((err) => {
      console.log(err);
    });

  res.render('index', { user: req.user, reportData: { notice: noticeCnt, mainCourse: mainCourseCnt } });
};

module.exports = {
  displayReportData,
};
