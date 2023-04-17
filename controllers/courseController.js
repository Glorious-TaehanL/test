const Sequences = require('../models/Sequence');

const addCourse = (req, res) => {
  console.log(req.file.filename);
  console.log(req.body);
  Sequences.findOneAndUpdate({ name: 'maincourse-number' }, { $inc: { counter: 1 } })
    .then(function (result) {
      console.log(result);
    })
    .catch(function (err) {
      console.log(err);
    });
};

module.exports = {
  addCourse,
};
