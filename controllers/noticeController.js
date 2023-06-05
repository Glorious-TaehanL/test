const StatusCodes = require('http-status-codes');
const Sequences = require('../models/Sequence');
const Notice = require('../models/Notice');
const moment = require('moment');
const breadcrum = '공지사항 / ';
const NOTICE_ROW_COUNT = 12;

var pageBreadCrumb = '';

/**
 *
 * @brief : add Post
 *
 * @param {} title : form data title
 * @param {*} content : form data content
 * @return page : success
 * @Author : ted
 */
const addPost = (req, res) => {
  Sequences.findOneAndUpdate({ name: 'notice-number' }, { $inc: { counter: 1 } })
    .then(function (result) {
      const { counter } = result;

      Notice.create({ id: counter, title: req.body.title, content: req.body.content })
        .then(function () {
          console.log('Successfull create ');
          res.redirect('/notice/list');
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 *
 * @brief : delete Post
 *
 * @param {*} id : only provide post id(#Sequence counter) ( not _id )
 * @Author : ted
 */
const deletePost = (req, res) => {
  console.log('delete request success');
  console.log(req.body);
  Notice.deleteOne({ id: req.body })
    .then(async function () {
      // console.log('Successfully deleted');
      // res.status(StatusCodes.OK).send({ message: 'Successfully deleted post !!!' });
      const totalNotice = await (await Notice.find({}, 'id')).length;
      const totalNoticePagination = Math.ceil(totalNotice / NOTICE_ROW_COUNT);
      var pagenum = 1;
      pageBreadCrumb = breadcrum + '리스트';

      if (typeof req.query.indexnum !== 'undefined') {
        var items = await Notice.find({})
          .sort({ id: -1 })
          .skip(NOTICE_ROW_COUNT * (req.query.indexnum - 1))
          .limit(NOTICE_ROW_COUNT);
        pagenum = parseInt(req.query.indexnum);
      } else {
        var items = await Notice.find({}).sort({ id: -1 }).limit(NOTICE_ROW_COUNT);
      }

      res.render('notice-table.ejs', { user: req.user, pageinfo: pageBreadCrumb, items: items, pageindex: { pagenum: pagenum, pagination: totalNoticePagination }, moment });
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 *
 * @brief : detail Post
 *
 * @param {*} id : only provide post id(#Sequence counter) ( not _id )
 * @Author : ted
 */
const detailPost = (req, res) => {
  Notice.findOne({ id: req.params.id })
    .then(function (result) {
      res.render('detail.ejs', { user: req.user, post: result });
    })
    .catch(function () {});
};

/**
 *
 * @brief edit post.
 *
 * @param {*} id
 * @param {*} title
 * @param {*} content
 * @return list page.
 * @Author : ted
 */
const editPost = async (req, res) => {
  pageBreadCrumb = breadcrum + ' 공지사항 추가';
  const updated = await Notice.updateOne({ id: parseInt(req.body.id) }, { $set: { title: req.body.title, content: req.body.content } });

  if (updated) {
    await Notice.findOne({ id: parseInt(req.body.id) })
      .then((result) => {
        res.render('edit.ejs', { user: req.user, pageinfo: pageBreadCrumb, post: result, msg: '성공적으로 업데이트 되었습니다.' });
      })
      .catch((err) => {
        res.status(StatusCodes.OK).redirect('/notice/list');
      });
  }
  // res.status(StatusCodes.OK).redirect('/notice/list');
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @Author : ted
 */
const displayWritePage = (req, res) => {
  res.render('write.ejs', { user: req.user });
};
/**
 *
 * @brief Display to edit Post page
 *
 * @param {*} id : only provide post id(#Sequence counter) ( not _id )
 * @return page : load post information by id
 */
const displayEditPage = (req, res) => {
  pageBreadCrumb = breadcrum + '수정';

  Notice.findOne({ id: parseInt(req.params.id) })
    .then(function (result) {
      console.log(result);
      if (result) {
        res.render('edit.ejs', { user: req.user, pageinfo: pageBreadCrumb, post: result, msg: '' });
      } else {
        // not found post by id (err)
        res.send('null');
      }
    })
    .catch(function () {});
};

/**
 *
 * @brief list Display for notice board
 *
 * @param {*} req
 * @return list.ejs file
 * @return_param {Object} total_items
 * @Author : ted
 * Sort descending
 */
const displayListPage = async (req, res) => {
  const totalNotice = await (await Notice.find({}, 'id')).length;
  const totalNoticePagination = Math.ceil(totalNotice / NOTICE_ROW_COUNT);
  var pagenum = 1;
  pageBreadCrumb = breadcrum + '리스트';

  if (typeof req.query.indexnum !== 'undefined') {
    var items = await Notice.find({})
      .sort({ id: -1 })
      .skip(NOTICE_ROW_COUNT * (req.query.indexnum - 1))
      .limit(NOTICE_ROW_COUNT);
    pagenum = parseInt(req.query.indexnum);
  } else {
    var items = await Notice.find({}).sort({ id: -1 }).limit(NOTICE_ROW_COUNT);
  }

  res.render('list.ejs', { user: req.user, pageinfo: pageBreadCrumb, items: items, pageindex: { pagenum: pagenum, pagination: totalNoticePagination }, moment });
};

module.exports = {
  addPost,
  deletePost,
  detailPost,
  editPost,
  displayWritePage,
  displayEditPage,
  displayListPage,
};
