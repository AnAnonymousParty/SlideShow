const FileTypes = Object.freeze({
  IMAGE:   "Image",
  UNKNOWN: "Unknown",
  VIDEO:   "video"
});

const HttpStatusTypes = Object.freeze({
	CONTINUE:           100,
	SWITCHINGPROTOCOLS: 101,
	PROCESSING:         102,

	OK:                          200,
	CREATED:                     201,
	ACCEPTED:                    202,
	NONAUTHORITATIVEINFORMATION: 203,
	NOCONTENT:                   204,
	RESETCONTENT:                205,
	PARTIALCONTENT:              206,
	MULTISTATUS:                 207,
	ALREADYREPORTED:             208,
	IMUSED:                      226,

	MULTIPLECHOICES:   300,
	MOVEDPERMANENTLY:  301,
	FOUND:             302,
	SEEOTHER:          303,
	NOTMODIFIED:       304,
	USEPROXY:          305,
	TEMPORARYREDIRECT: 307,
	PERMANENTREDIRECT: 308,

	BADREQUEST:                      400,
	UNAUTHORIZED:                    401,
	PAYMENTREQUIRED:                 402,
	FORBIDDEN:                       403,
	NOTFOUND:                        404,
	METHODNOTALLOWED:                405,
	NOTACCEPTABLE:                   406,
	PROXYAUTHENTICATIONREQUIRED:     407,
	REQUESTTIMEOUT:                  408,
	CONFLICT:                        409,
	GONE:                            410,
	LENGTHREQUIRED:                  411,
	PRECONDITIONFAILED:              412,
	PAYLOADTOOLARGE:                 413,
	REQUESTURITOOLONG:               414,
	UNSUPPORTEDMEDIATYPE:            415,
	REQUESTEDRANGENOTSATISFIABLE:    416,
	EXPECTATIONFAILED:               417,
	IMATEAPOT:                       418,
	MISDIRECTEDREQUEST:              421,
	UNPROCESSABLEENTITY:             422,
	LOCKED:                          423,
	FAILEDDEPENDENCY:                424,
	UPGRADEREQUIRED:                 426,
	PRECONDITIONREQUIRED:            428,
	TOOMANYREQUESTS:                 429,
	REQUESTHEADERFIELDSTOOLARGE:     431,
	CONNECTIONCLOSEDWITHOUTRESPONSE: 444,
	UNAVAILABLEFORLEGALREASONS:      451,
	CLIENTCLOSEDREQUEST:             499,

	INTERNALSERVERERROR:           500,
	NOTIMPLEMENTED:                501,
	BADGATEWAY:                    502,
	SERVICEUNAVAILABLE:            503,
	GATEWAYTIMEOUT:                504,
	HTTPVERSIONNOTSUPPORTED:       505,
	VARIANTALSONEGOTIATES:         506,
	INSUFFICIENTSTORAGE:           507,
	LOOPDETECTED:                  508,
	NOTEXTENDED:                   510,
	NETWORKAUTHENTICATIONREQUIRED: 511,
	NETWORKCONNECTTIMEOUTERROR:    599
});


 const ReadyStateTypes = Object.freeze({
  DONE:        4,
  HEADERSRCVD: 2,
  LOADING:     3,
  OPENED:      1,
  UNSENT:      0
 });

function GetDescFromFileType(enumVal) {
 for (var key in FileTypes) {
  if (key == enumVal) {
   return FileTypes[key];
  }
 }

 return "Unknown";
}

function GetEnumFromFileDesc(desc) {
 for (var key in FileTypes) {
  if (desc == FileTypes[key]) {
   return key;
  }
 }

 return "UNKNOWN";
}

 function GetEnumFromFilePathName(filePathName) {
  let lc = filePathName.toLowerCase();

  for (;;) {
   if (true == lc.endsWith(".gif")) {
     return IMAGE;
   }

   if (true == lc.endsWith(".jpg")) {
    return IMAGE;
   }

   if (true == lc.endsWith(".jpeg")) {
    return IMAGE;
   }

   if (true == lc.endsWith(".mpg")) {
    return VIDEO;
   }

   if (true == lc.endsWith(".mpeg")) {
    return VIDEO;
   }

   if (true == lc.endsWith(".mp4")) {
    return VIDEO;
   }

   if (true == lc.endsWith(".png")) {
    return IMAGE;
   }

   if (true == lc.endsWith(".tiff")) {
    return IMAGE;
   }

   if (true == lc.endsWith(".wmv")) {
    return VIDEO;
   }

  break;
 }

 return UNKNOWN;
}
