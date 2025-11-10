
// 3rd Party things we need:
const createError  = require('http-errors');
const express      = require('express');
const fs           = require('fs');
const logger       = require('morgan');
const path         = require('path');
const xml2jsParser = require('xml2js-parser');
const xmlBuilder   = require('xmlbuilder2');

// Own own things we need:
const conf      = require('./public/javascripts/Server/configuration.js');
const diags     = require('./public/javascripts/Server/diagnostics.js');
const enums     = require('./public/javascripts/Server/enums.js');
const fileUtils = require('./public/javascripts/Server/fileUtils.js');
const grfpRslt  = require('./public/javascripts/Server/getRandomFilePathResult.js');

const configRouter = require('./routes/configPage');
const indexRouter  = require('./routes/index');

let diagsObj = new diags.Diagnostics();

let confObj      = new conf.Configuration(diagsObj, fs, xml2jsParser, xmlBuilder, path.join(__dirname, "/public/conf/Conf.xml"));
let fileUtilsObj = new fileUtils.FileUtils(diagsObj, fs, path, grfpRslt, confObj);

let app = express();

// View engine setup:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

diagsObj.LogSubCall("app", "START", "", "");


/*------------------------- GET handlers ------------------------------------*/

app.get('/DeleteImage', (req, res) => {
 let image2Delete = decodeURI(req.query.Image2Delete);

 diagsObj.LogSubCall("app", "get/DeleteImage", image2Delete, "");

 fs.access(image2Delete, fs.constants.F_OK, (err) => {
  if (err) {
   res.send('fail');

   diagsObj.LogSubExit("app", "get/DeleteImage", "fail", "");

   return;
  }
 });

 let targetImageName = confObj.GetDeletedImagesDirectory() + "/" + path.basename(image2Delete);

 fs.rename(image2Delete, targetImageName, (err) => {
  if (err) {
   res.send('fail');

   diagsObj.LogSubExit("app", "get/DeleteImage", "fail", "");

   return;
  }
 });
  
 res.status(200).send("OK");
 
 diagsObj.LogSubExit("app", "get/DeleteImage", "", "");
});

app.get('/GetNextImage', (req, res) => {
 diagsObj.LogSubCall("app", "get/GetNextImage", "", "");

 let allowVideo   = ("" == req.query.AllowVideo ? "true" : req.query.AllowVideo); 
 let filePathName = "";
 let fileType     = "";

 for (;;) {
  filePathName = fileUtilsObj.GetRandomImagePathFileName().GetPathFileName();
  fileType     = enums.GetEnumFromFilePathName(filePathName);

  if ("true" == allowVideo || ("false" == allowVideo && "Image" == fileType)) {
   break;
  }
 }

 diagsObj.LogSubInfo("app", "get/GetNextImage", "", "image=" + filePathName + " type=" + fileType);

 // Shove the filename into the Content-Location header so the client javascript 
 // can use it as the target of the Delete button:

 res.setHeader("Content-Location", filePathName);  

 res.status(200);
 res.sendfile(filePathName);
 
 diagsObj.LogSubExit("app", "get/GetNextImage", "", "");
});

/*------------------------------- POST handlers -----------------------------*/

// Handle SaveConfig:
app.post("/SaveConfig", function (req, res) {
 diagsObj.LogSubCall("app", "post/SaveConfig", "", "");

 postData = req.body;

 confObj.SetImagesDirectory(postData.requestedDirectory);
 confObj.SetDeletedImagesDirectory(postData.requestedDeleteDirectory);
 confObj.SetDelay(postData.requestedDelay);

 confObj.SaveConfiguration();

 res.status(200).send("");

 diagsObj.LogSubExit("app", "post/SaveConfig", "", "");
});


/*------------------------ Route handlers ----------------------------------*/

app.use('/', indexRouter);
app.use('/ShowConfigPage', configRouter);


// Catch 404 and forward to error handler:
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler:
app.use(function(err, req, res, next) {
 // Set locals, only providing error in development:
 res.locals.message = err.message;
 res.locals.error   = req.app.get('env') === 'development' ? err : {};

 // Render the error page:
 res.status(err.status || 500);
 res.render('error');
});


module.exports = app;
