//Models.
const MainCourse = require('../models/MainCourse');
const Notice = require('../models/Notice');
const Sequences = require('../models/Sequence');
const SubCourse = require('../models/SubCourse');
const Order = require('../models/Order');
const Settings = require('../models/Settings');

//logger
const logger = require('../winston/logger');

//config
const NOTICE_ROW_COUNT = process.env.NOTICE_ROW_COUNT;
const { StatusCodes } = require('http-status-codes');
const { saveAccessCourse } = require('./customerApiController');

//moment init
const moment = require('moment');

//function
const getNoticeList = async (req, res) => {
  const totalNotice = await (await Notice.find({}, 'id')).length;
  const totalNoticePagination = Math.ceil(totalNotice / NOTICE_ROW_COUNT);
  const requestNoticePage = req.params;
  console.log(req.user);
  const items = await Notice.find({})
    .sort({ id: -1 })
    .skip(NOTICE_ROW_COUNT * (requestNoticePage - 1))
    .limit(NOTICE_ROW_COUNT);
  res.status(StatusCodes.OK).json({ pageindex: { pagenum: requestNoticePage, pagination: totalNoticePagination }, totalNotice, items });
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

      if (progressPercentage == 100) {
        res.status(StatusCodes.OK).json({ data: progressPercentage });
      }
      res.status(StatusCodes.OK).json({ data: progressPercentage });
    } else {
      res.status(StatusCodes.OK).json({ msg: '결제된 강의 목록에 해당되지 않습니다.' });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: '결제된 강의가 없습니다, 결제 이후 수강해주세요.' });
  }
};

const getExpire = async (req, res) => {
  const mcourseId = req.params.id;
  const userId = req.user.num;
  const period = process.env.EXPIRE_PERIOD_DAY;

  const orderDateObj = await Order.findOne({ customerid: userId, courses: { $in: [mcourseId] } }, 'createtime');
  if (!orderDateObj) {
    logger.error('Cannot get Order data in getExpire function');
  }

  const nowTime = new Date(); // now time
  const createTime = new Date(orderDateObj.createtime); // Order's create time
  const addPeriodLater = moment(createTime).add(period, 'days'); // add period date
  const diff = addPeriodLater.diff(nowTime, 'days');

  res.status(StatusCodes.OK).json({ date: diff });
};

const getSubCourse = async (req, res) => {
  const { id } = req.params;
  const maincat = await MainCourse.find({ id: id });
  if (maincat.length === 0) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: '존재하지 않는 강의분류입니다. 다시한번 확인해주세요.' });
  }
  await SubCourse.find({ maincategory: id }, { id: 1, indexnumber: 1, title: 1, sampling: 1 })
    .then((result) => {
      if (result == '') {
        res.status(StatusCodes.NOT_FOUND).json({ msg: '강의콘탠츠가 아직 등록되지 않았습니다.' });
      } else {
        res.status(StatusCodes.OK).json({ result });
      }
    })
    .catch((err) => {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: '알수없는 에러가 발생했습니다. 로그를 확인해주세요.', log: err });
    });
};

const getContinueSubCourse = async (req, res) => {
  const { id } = req.params;
  const accesscourseArr = Object.values(req.user.accesscourse).map(Number);

  if (accesscourseArr.length != 0) {
    if (accesscourseArr.includes(parseInt(id))) {
      const customerSubcourses = await SubCourse.find({ maincategory: id, customer: { $nin: [req.user.num] } }).sort({ id: 1 });
      console.log(customerSubcourses);
      if (!customerSubcourses) {
        res.status(StatusCodes.OK).json({ msg: '더이상 수강할 강의가 존재하지 않습니다.' });
      } else {
        res.status(StatusCodes.OK).json({ subcourse_id: customerSubcourses[0].id });
      }
    } else {
      res.status(StatusCodes.OK).json({ msg: '결제된 강의가 아닙니다. 결제 이후 수강해주세요.' });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: '결제된 강의가 없습니다, 결제 이후 수강해주세요.' });
  }
  console.log(accesscourseArr);
  res.status(StatusCodes.OK);
};

const getSubCourseDetail = async (req, res) => {
  const { id } = req.params;
  const detail = await SubCourse.findOne({ id: id });
  if (!detail) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: '존재하지 않는 강의 콘탠츠 id입니다. 다시확인해주세요.' });
  } else {
    const maincat = parseInt(detail.maincategory);
    const accesscors = req.user.accesscourse;
    var flag = false;

    if (accesscors.includes(maincat)) {
      flag = true;
    }

    if (!flag) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: '잘못된 요청입니다. 수강신청이력을 확인해주세요.' });
    } else {
      res.status(StatusCodes.OK).json({ subcourse: detail });
    }
  }
};

const getSubCourseSampleDetail = async (req, res) => {
  const { id } = req.params;
  const detail = await SubCourse.findOne({ id: id });
  if (!detail) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: '존재하지 않는 강의 콘탠츠 id입니다. 다시확인해주세요.' });
  } else {
    if (!detail.sampling) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: '맛보기 강의가 아닙니다. 수강신청 이후에 강의를 진행해주세요.' });
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
      const arr = Object.values(doc.customer);
      if (arr.includes(req.user.num)) {
        res.status(StatusCodes.OK).json({ msg: '이미 수강완료한 강의 입니다.' });
      } else {
        const updCourse = await SubCourse.findOneAndUpdate({ id: subcourseId }, { customer: req.user.num }, { new: true });
        if (!updCourse) {
          res.status(StatusCodes.BAD_REQUEST).json({ msg: '수강진도등록에서 알수없는 에러가 발생했습니다.' });
        } else {
          res.status(StatusCodes.OK).json({ updCourse });
        }
      }
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: '수강등록을 하지 않은 강의 입니다. 수강등록 이후에 이용해주세요.' });
  }
};
/**
 * @brief [Frontend API] createOrder
 *
 * @param {*} req
 * @param {*} res
 */
const createOrder = async (req, res) => {
  const courses = req.body.courses;
  Sequences.findOneAndUpdate({ name: 'order-number' }, { $inc: { counter: 1 } })
    .then((result) => {
      const { counter } = result;
      Order.create({
        id: counter,
        customerid: req.user.num,
        customername: req.user.name,
        amount: req.body.amount,
        title: req.body.title,
        courses: courses,
        merchantid: req.body.merchantid,
        paymentid: req.body.paymentid,
      })
        .then((order) => {
          courses.forEach((course) => {
            // update access course in customer docs
            if (!req.user.accesscourse.includes(course)) {
              var saveFlag = saveAccessCourse(req.user.email, course);
              if (!saveFlag) {
                logger.error('saveAccessCourse has issue, please check couresid ' + course);
              }
              req.user.accesscourse.push(course);

              MainCourse.findOneAndUpdate({ id: course }, { $inc: { customerCount: 1 } })
                .then(() => {
                  logger.info('Successfully updated count on MainCourse');
                })
                .catch((err) => {
                  logger.error(err + 'MainCourse ID : [' + course + ']');
                });
            }
          });
          logger.info('User accesscourse has been updated with successfuly payment');
          res.json({ msg: `성공적으로 오더 #${req.body.merchantid}가 생성되었습니다.`, data: order });
        })
        .catch((err) => {
          res.json({ msg: `${req.body.merchantid} 오더를 생성하는데 이슈가 발생되었습니다..확인해주세요.. ${err}` });
        });
    })
    .catch((err) => {
      logger.error(err);
      res.status(StatusCodes.BAD_REQUEST).json({ msg: 'sequence넘버를 확인할 수 없습니다.' });
    });
};

/**
 * @brief [Frontend API] getConfig
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns
    "logo": "img1684215456407.ico",
    "companyname": "(주)coding-lab",
    "companycontact": "1012341234",
    "companyemail": "test@test.com",
    "companynumber": "000-00-00000" //사업자,
    "companyaddress": "   ",
    "internetauthnumber": "2020-성남분당A-0000" //통신판매업
 * 
 */
const getConfig = async (req, res) => {
  const config = await Settings.find({});
  if (!config) {
    logger.error('Error to get configuration data on getConfig Function.');
    res.status(StatusCodes.NOT_FOUND).json({ msg: '저장된 환경변수를 찾을 수 없습니다.' });
  }
  const { logo, companyrepresentativename, companyname, companycontact, companyemail, companynumber, companyaddress, internetauthnumber } = config[0];

  res.status(StatusCodes.OK).json({ data: { logo, companyrepresentativename, companyname, companycontact, companyemail, companynumber, internetauthnumber, companyaddress } });
};

module.exports = {
  getNoticeList,
  getMainCourse,
  getMainCourseInfor,
  getAccessMainCourse,
  getProgress,
  getExpire,
  getSubCourse,
  getContinueSubCourse,
  getSubCourseDetail,
  getSubCourseSampleDetail,
  updateCustomerToSubCourse,
  createOrder,
  getConfig,
};
