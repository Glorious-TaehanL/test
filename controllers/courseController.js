const MainCourse = require('../models/MainCourse');
const Sequences = require('../models/Sequence');

const addCourse = (req, res) => {
  console.log(req.file.filename);
  console.log(req.body);
  Sequences.findOneAndUpdate({ name: 'maincourse-number' }, { $inc: { counter: 1 } })
    .then(function (result) {
      const { counter } = result;
      MainCourse.create({ id: counter, title: req.body.course_title, thumbnail: req.file.filename, description: req.body.course_description })
        .then(function () {
          console.log('successfully main course updated');
        })
        .catch(function (err) {
          console.log(err);
          console.log('Invaild to update main course');
        });
    })
    .catch(function (err) {
      console.log(err);
    });
};

const listCourse = async (req, res) => {
  const mainList = await MainCourse.find();
  res.render('course/course-list.ejs', { courses: mainList });
};

module.exports = {
  addCourse,
  listCourse,
};
