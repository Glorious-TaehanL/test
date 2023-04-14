const path = require('path');
let multer = require('multer');
let filename = new Date().getTime();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    let extension = path.extname(file.originalname);
    cb(null, 'thumbnail' + filename + extension);
  },
});

var uploader = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = {
  uploader,
};
