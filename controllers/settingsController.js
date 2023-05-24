const Settings = require('../models/Settings');

const configData = async (req, res) => {
  const systemConfig = await Settings.find({});
  if (!systemConfig) {
    res.render('settings.ejs', { user: req.user, config: false });
  }
  res.render('settings.ejs', { user: req.user, config: true, setting: systemConfig[0] });
};

const updateConfig = (req, res) => {
  const configData = Settings.find({});
  if (!configData) {
    Settings.create({ logo: req.file.filename, companyname: req.body.company_name, companycontact: req.body.company_tel, companyinfo: req.body.company_information }).then(() => {
      console.log('Successfully update config');
    });
  } else {
    let logoimg;

    if (req.file) {
      logoimg = req.file.filename;
    } else {
      logoimg = req.body.logo_img_container;
    }
    Settings.updateOne({}, { logo: logoimg, companyname: req.body.company_name, companycontact: req.body.company_tel, companyinfo: req.body.company_information }).then(() => {
      console.log('Successfull updated');
    });
  }
};

module.exports = {
  configData,
  updateConfig,
};
