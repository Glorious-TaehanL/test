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
 *       - companynumber
 *       - companyinfo
 *      properties:
 *        logo:
 *         type: string
 *        mainbanner:
 *         type: string
 *        companyname:
 *         type: string
 *        companycontact:
 *         type: string
 *        companyemail:
 *         type: string
 *        companynumber:
 *         type: number
 *        internetauthnumber:
 *         type: string
 *        companyaddress:
 *         type: string
 */

const ConfigSchema = new mongoose.Schema({
  logo: {
    type: String,
  },
  mainbanner: {
    type: String,
  },
  companyrepresentativename: {
    type: String,
  },
  companyname: {
    type: String,
  },
  companycontact: {
    type: String,
  },
  companyemail: {
    type: String,
  },
  companynumber: {
    type: String,
  },
  internetauthnumber: {
    type: String,
  },
  companyaddress: {
    type: String,
  },
});

module.exports = mongoose.model('config', ConfigSchema);
