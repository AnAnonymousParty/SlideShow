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

var filePathNameStr    = result.GetRandomPathFileName();
var filePathNameEncStr = encodeURI(filePathNameStr);

var fileType = enums.GetEnumFromFilePathName(filePathNameStr);

/* GET home page. */
router.get('/', function (req, res, next) {
 diagsObj.LogSubCall("index", "router.get", "", "");

 confObj.LoadConfiguration();

 let mediaDiv     = "";
 let onLoadAction = "";

 switch (fileType) {
  case enums.FileTypes.IMAGE: {
   onLoadAction = "InitializeImagePage();";

   mediaDiv = "<div id=\"ImageContainer\" style=\"align-items: center; display: flex; height: 98vh; justify-content: center; overflow: hidden; width: 98vw;\">" + "\n\r"
            + " <img alt=\"Picture\" id=\"DispImage\" src=\"\" style=\"height: 100vh; object-fit: scale-down; overflow: hidden; width: 100vw;\">" + "\n\r"
            + "</div>";
   }
   break;

  case enums.FileTypes.VIDEO: {
   onLoadAction = "InitializeVideoPage();";

   mediaDiv = "<div id=\"VideoContainer\" style=\"align-items: center; display: flex; height: 98vh; justify-content: center; overflow: hidden; width: 100vw;\">" + "\n\r"
            + " <video autoplay=\"\" id=\"DispVideo\" muted=\"\" playsinline=\"\" poster=\"images/loading.gif\" src=\"\" onended=\"HandleVideoEnded();\" style=\"height: 100vh; object-fit: scale-down; overflow: hidden; width: 100vw;\">" + "\n\r"
            + " </video>" + "\n\r"
            + "</div>";
   }
   break;

  case enums.FileTypes.UNKNOWN:
  default: {
   onLoadAction = "InitializeImagePage();";

   mediaDiv = "<div id=\"ImageContainer\" style=\"align-items: center; display: flex; height: 98vh; justify-content: center; overflow: hidden; width: 100vw;\">" + "\n\r"
            + " <img alt=\"Picture\" id=\"DispImage\" src=\"http://" + req.get('host') + "?action=getNamedImage&requestedFilePathName=" + filePathNameEncStr + "\">" + "\n\r"
            + "</div>";
   }
   break;
 }

 res.render('index', {
            conf:               confObj,
            title:              'Slide Show',
            result:             result,
            action:             onLoadAction,
            fileType:           fileType,
            filePathNameEncStr: filePathNameEncStr,
            filePathNameStr:    filePathNameStr,
            mediaDiv:           mediaDiv,
            url:                req.get('host')
 });

 diagsObj.LogSubExit("index", "router.get", "", "");
});


module.exports = router;