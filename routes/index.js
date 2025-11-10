const express      = require('express');
const fs           = require('fs');
const path         = require('path');
const xml2jsParser = require('xml2js-parser');
const xmlBuilder   = require('xmlbuilder2');

let router = express.Router();

const diags    = require('../public/javascripts/Server/diagnostics.js');
const diagsObj = new diags.Diagnostics();

let fileUtils = require(path.join(__dirname, '../public/javascripts/Server/fileUtils.js'));
let conf      = require(path.join(__dirname, '../public/javascripts/Server/configuration.js'));
let enums     = require(path.join(__dirname, '../public/javascripts/Server/enums.js'));
let grfpRslt  = require(path.join(__dirname, '../public/javascripts/Server/getRandomFilePathResult.js'));

let confObj      = new conf.Configuration(diagsObj, fs, xml2jsParser, xmlBuilder, path.join(__dirname, "../public/conf/Conf.xml")); 
let fileUtilsObj = new fileUtils.FileUtils(diagsObj, fs, path, grfpRslt, confObj);

let result = fileUtilsObj.GetRandomImagePathFileName();

let filePathNameStr    = result.GetPathFileName();
let filePathNameEncStr = encodeURI(filePathNameStr);

let fileType = enums.GetEnumFromFilePathName(filePathNameStr);

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