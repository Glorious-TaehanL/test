const StatusCodes = require('http-status-codes');
const Sequences = require('../models/Sequence');
const Notice = require('../models/Notice');

/**
 *
 * @brief : add Post
 *
 * @param {} title : form data title
 * @param {*} content : form data content
 * @return page : success
 */
const addPost = (req, res) => {
  Sequences.findOneAndUpdate({ name: 'notice-number' }, { $inc: { counter: 1 } })
    .then(function (result) {
      const { counter } = result;

      Notice.create({ id: counter, title: req.body.title, content: req.body.content })
        .then(function () {
          console.log('Successfull create ');
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });

  res.send('전송완료');
};

/**
 *
 * @brief : delete Post
 *
 * @param {*} id : only provide post id(#Sequence counter) ( not _id )
 */
const deletePost = (req, res) => {
  console.log('delete request success');
  console.log(req.body);
  Notice.deleteOne({ id: req.body })
    .then(function () {
      console.log('Successfully deleted');
      res.status(StatusCodes.OK).send({ message: 'Successfully deleted post !!!' });
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
 */
const detailPost = (req, res) => {
  Notice.findOne({ id: req.params.id })
    .then(function (result) {
      res.render('detail.ejs', { post: result });
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
 */
const editPost = (req, res) => {
  console.log(req.body);
  Notice.updateOne({ id: parseInt(req.body.id) }, { $set: { title: req.body.title, content: req.body.content } })
    .then(function () {
      res.status(StatusCodes.OK).redirect('/tt/list');
    })
    .catch(function () {});
};

/**
 *
 * @brief Display to edit Post page
 *
 * @param {*} id : only provide post id(#Sequence counter) ( not _id )
 * @return page : load post information by id
 */
const displayEditPage = (req, res) => {
  console.log(req.params.id);
  Notice.findOne({ id: parseInt(req.params.id) })
    .then(function (result) {
      console.log(result);
      if (result) {
        res.render('edit.ejs', { post: result });
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
 */
const displayListPage = async (req, res) => {
  const items = await Notice.find({});
  res.render('list.ejs', { items: items });
};

module.exports = {
  addPost,
  deletePost,
  detailPost,
  editPost,
  displayEditPage,
  displayListPage,
};
