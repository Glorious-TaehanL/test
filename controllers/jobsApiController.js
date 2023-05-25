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

/**
 *
 * @param {*} id : MainCourse Id
 * @param {*} req.user : user information
 */
const getProgress = async (req, res) => {
  const { id } = req.params;
  const accesscourseArr = Object.values(req.user.accesscourse).map(Number);

  if (accesscourseArr.length != 0) {
    if (accesscourseArr.includes(parseInt(id))) {
      const customerSubcourseCnt = await (await SubCourse.find({ maincategory: id, customer: { $in: [req.user.num] } })).length;
      const totalSubcouresCnt = await (await SubCourse.find({ maincategory: id })).length;
      var progressRate = (customerSubcourseCnt / totalSubcouresCnt) * 100;
      var progressPercentage = progressRate.toFixed(0);

      res.status(StatusCodes.OK).json({ data: progressPercentage });
    } else {
      res.status(StatusCodes.OK).json({ msg: '결제된 강의 목록에 해당되지 않습니다.' });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: '결제된 강의가 없습니다, 결제 이후 수강해주세요.' });
  }
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
  } else {
    const maincat = parseInt(detail.maincategory);
    const accesscor = parseInt(req.user.accesscourse);
    if (accesscor != maincat) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: '잘못된 요청입니다. 수강신청이력을 확인해주세요.' });
    } else {
      res.status(StatusCodes.OK).json({ subcourse: detail });
    }
  }
};

const updateCustomerToSubCourse = async (req, res) => {
  const { maincourseId, subcourseId } = req.body;
  const accessCourseByCustomer = Object.values(req.user.accesscourse);

  if (accessCourseByCustomer.includes(maincourseId)) {
    const doc = await SubCourse.findOne({ id: subcourseId });

    if (!doc) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: '수강콘탠츠를 찾을 수 없습니다. 다시한번 확인해주세요.' });
    } else {
      if (doc.customer) {
        const arr = Object.values(doc.customer);
        if (arr.includes(req.user.num)) {
          res.status(StatusCodes.OK);
        } else {
          const updCourse = await SubCourse.findOneAndUpdate({ id: subcourseId }, { customer: req.user.num });
          if (!updCourse) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: '수강진도등록에서 알수없는 에러가 발생했습니다.' });
          }
        }
      }
    }
    res.status(StatusCodes.OK).json({ doc });
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: '수강등록을 하지 않은 강의 입니다. 수강등록 이후에 이용해주세요.' });
  }
};

module.exports = {
  getNoticeList,
  getMainCourse,
  getMainCourseInfor,
  getAccessMainCourse,
  getProgress,
  getSubCourse,
  getSubCourseDetail,
  updateCustomerToSubCourse,
};
