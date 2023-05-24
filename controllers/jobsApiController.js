//Models.
const MainCourse = require('../models/MainCourse');
const Notice = require('../models/Notice');
const SubCourse = require('../models/SubCourse');

//config
const NOTICE_ROW_COUNT = 12;
const { StatusCodes } = require('http-status-codes');

//function
const getNoticeList = async (req, res) => {
  const totalNotice = await (await Notice.find({}, 'id')).length;
  const requestNoticePage = req.params;
  console.log(req.user);
  const items = await Notice.find({})
    .sort({ id: -1 })
    .skip(NOTICE_ROW_COUNT * (requestNoticePage - 1))
    .limit(NOTICE_ROW_COUNT);
  res.status(StatusCodes.OK).json({ totalNotice, items });
};

const getMainCourse = async (req, res) => {
  const mainItems = await MainCourse.find();
  res.status(StatusCodes.OK).json({ mainItems });
};

const getMainCourseInfor = async (req, res) => {
  const { id } = req.params;
  const info = await MainCourse.find({ id: id }, { information: 1 });

  if (!info) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: '잘못된 요청입니다. 요청된 강의가 존재하지 않습니다.' });
  }
  res.status(StatusCodes.OK).json({ info: info });
};

const getAccessMainCourse = async (req, res) => {
  res.status(StatusCodes.OK).json({ accesscourse: req.user.accesscourse });
};

const getSubCourse = async (req, res) => {
  const { id } = req.params;
  await SubCourse.find({ maincategory: id }, { id: 1, indexnumber: 1, title: 1, sampling: 1 })
    .then((result) => {
      if (result == '') {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: '잘못된 요청입니다. 강의분류나 강의콘탠츠가 존재하지 않습니다.' });
      } else {
        res.status(StatusCodes.OK).json({ result });
      }
    })
    .catch((err) => {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: '알수없는 에러가 발생했습니다. 로그를 확인해주세요.', log: err });
    });
};

const getSubCourseDetail = async (req, res) => {
  const { id } = req.params;
  const detail = await SubCourse.findOne({ id: id });
  if (!detail) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: '존재하지 않는 강의 콘탠츠 id입니다. 다시확인해주세요.' });
  }

  const maincat = parseInt(detail.maincategory);
  const accesscor = parseInt(req.user.accesscourse);

  if (accesscor != maincat) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: '잘못된 요청입니다. 수강신청이력을 확인해주세요.' });
  } else {
    res.status(StatusCodes.OK).json({ subcourse: detail });
  }
};

const updateCustomerToCourse = async (req, res) => {
  const { subcourseId } = req.body;
  const doc = SubCourse.findOneAndUpdate({ id: subcourseId }, { customer: req.user.num });
  res.status(StatusCodes.OK).json({ doc });
};

module.exports = {
  getNoticeList,
  getMainCourse,
  getMainCourseInfor,
  getAccessMainCourse,
  getSubCourse,
  getSubCourseDetail,
  updateCustomerToCourse,
};
