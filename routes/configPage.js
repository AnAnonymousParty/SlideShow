const express      = require('express');
const fs           = require('fs');
const path         = require('path');
const xml2jsParser = require('xml2js-parser');
const xmlBuilder   = require('xmlbuilder2');

const router = express.Router();

let config    = require(path.join(__dirname, '../public/javascripts/Server/configuration.js'));
let diags     = require(path.join(__dirname, '../public/javascripts/Server/diagnostics.js'));
let fileUtils = require(path.join(__dirname, '../public/javascripts/Server/fileUtils.js'));
let grfpRslt  = require(path.join(__dirname, '../public/javascripts/Server/getRandomFilePathResult.js'));

let diagsObj     = new diags.Diagnostics();
let confObj      = new config.Configuration(diagsObj, fs, xml2jsParser, xmlBuilder, path.join(__dirname, '../public/conf/Conf.xml'), "");
let fileUtilsObj = new fileUtils.FileUtils(diagsObj, fs, path, grfpRslt, confObj);

let filesList = fileUtilsObj.GetFilesList();

router.get('/', function (req, res, next) {
 confObj.LoadConfiguration();

 res.render('configPage', { config:  confObj,
                            numPics: filesList.length,
                            url:     req.get('host') });
});

module.exports = router;