const express      = require('express');
const fs           = require('fs');
const path         = require('path');
const xml2jsParser = require('xml2js-parser');
const xmlBuilder   = require('xmlbuilder2');

var router = express.Router();

const diags    = require('../public/javascripts/Server/diagnostics.js');
const diagsObj = new diags.Diagnostics();

var fileUtils = require(path.join(__dirname, '../public/javascripts/Server/fileUtils.js'));
var conf      = require(path.join(__dirname, '../public/javascripts/Server/configuration.js'));
var enums     = require(path.join(__dirname, '../public/javascripts/Server/enums.js'));
var grfpRslt  = require(path.join(__dirname, '../public/javascripts/Server/getRandomFilePathResult.js'));

var confObj      = new conf.Configuration(diagsObj, fs, xml2jsParser, xmlBuilder, path.join(__dirname, "../public/conf/Conf.xml")); 
var fileUtilsObj = new fileUtils.FileUtils(diagsObj, fs, path, grfpRslt, confObj);

var result = fileUtilsObj.GetRandomImagePathFileName();

var filePathNameStr    = result.GetPathFileName();
var filePathNameEncStr = encodeURI(filePathNameStr);

var fileType = enums.GetEnumFromFilePathName(filePathNameStr);

/* GET home page. */
router.get('/', function (req, res, next) {
 diagsObj.LogSubCall("index", "router.get", "", "");

 confObj.LoadConfiguration();

 diagsObj.LogSubInfo("index", "router.get", "File = " + filePathNameStr + " type = " + fileType, "");

 res.render('index', {
            conf:               confObj,
            title:              'Slide Show',
            result:             result,
            fileType:           fileType,
            filePathNameEncStr: filePathNameEncStr,
            filePathNameStr:    filePathNameStr,
            url:                req.get('host')
 });

 diagsObj.LogSubExit("index", "router.get", "", "");
});


module.exports = router;