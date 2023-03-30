const StatusCodes = require('http-status-codes');
const Sequences = require('../models/Sequence');
const Notice = require('../models/Notice');

/**
 *
 * @brief : addPost
 *
 * @param {*} title : form data title
 * @param {*} content : form data content
 */
const addPost = (req, res) => {
  Sequences.findOne({ name: 'notice-number' })
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

  Sequences.updateOne({ name: 'notice-number' }, { $inc: { counter: 1 } })
    .then(function () {
      console.log('Successfull update sequence number ');
    })
    .catch(function (error) {
      console.log(error);
    });
  res.send('전송완료');
};

const deletePost = (req, res) => {
  console.log('delete request success');
  console.log(req.body);
  Notice.deleteOne({ id: req.body })
    .then(function () {
      console.log('Successfully deleted');
      res.status(StatusCodes.OK).send({ message: 'faild !!!' });
    })
    .catch(function (error) {
      console.log(error);
    });
};

const detailPost = (req, res) => {
  Notice.findOne({ id: req.params.id })
    .then(function (result) {
      res.render('detail.ejs', { post: result });
    })
    .catch(function () {});
};

const listDisplay = async (req, res) => {
  const items = await Notice.find({});
  res.render('list.ejs', { items: items });
};

module.exports = {
  addPost,
  deletePost,
  detailPost,
  listDisplay,
};
