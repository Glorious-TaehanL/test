const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *  schemas:
 *    Config:
 *      title: Init setting value
 *      required:
 *       - logo
 *       - mainbanner
 *       - companyname
 *       - companycontact
 *       - companyinfo
 *      properties:
 *        logo:
 *         type: string
 *        mainbanner:
 *         type: string
 *        companyname:
 *         type: string
 *        companycontact:
 *         type: number
 *        companyinfo:
 *         type: string
 */

const ConfigSchema = new mongoose.Schema({
  logo: {
    type: String,
  },
  mainbanner: {
    type: String,
  },
  companyname: {
    type: String,
  },
  companycontact: {
    type: Number,
  },
  companyinfo: {
    type: String,
  },
});

module.exports = mongoose.model('config', ConfigSchema);
