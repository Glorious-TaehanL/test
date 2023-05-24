const express = require('express');
const { configData, updateConfig } = require('../controllers/settingsController');
const { uploader } = require('../middleware/multer');
const router = express.Router();

router.get('/', configData);
router.post('/updateconfig', uploader.single('logo-img'), updateConfig);

module.exports = router;
