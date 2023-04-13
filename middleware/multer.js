let multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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
