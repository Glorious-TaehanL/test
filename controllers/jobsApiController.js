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

const getAccessMainCourse = async (req, res) => {
  res.status(StatusCodes.OK).json({ accesscourse: req.user.accesscourse });
};

const getSubCourse = async (req, res) => {
  const { id } = req.params;
  const subItems = await SubCourse.find({ maincategory: id })
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

module.exports = {
  getNoticeList,
  getMainCourse,
  getAccessMainCourse,
  getSubCourse,
};
