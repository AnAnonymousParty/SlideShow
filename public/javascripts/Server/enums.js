export
const FileTypes = Object.freeze({
  IMAGE:   "Image",
  UNKNOWN: "Unknown",
  VIDEO:   "video"
});

export
function GetDescFromFileType(enumVal) {
 for (var key in FileTypes) {
  if (key == enumVal) {
   return FileTypes[key];
  }
 }

 return "Unknown";  // Description of last resort.
}

export
function GetEnumFromFileDesc(desc) {
 for (var key in FileTypes) {
  if (desc == FileTypes[key]) {
   return key;
  }
 }

 return "UNKNOWN";  // Type of last resort.
}

export
 function GetEnumFromFilePathName(filePathName) {
  var lc = filePathName.toLowerCase();

  for (;;) {
   if (true == lc.endsWith(".gif")) {
    return FileTypes.IMAGE;
   }

   if (true == lc.endsWith(".jpg")) {
    return FileTypes.IMAGE;
   }

   if (true == lc.endsWith(".jpeg")) {
    return FileTypes.IMAGE;
   }

   if (true == lc.endsWith(".mpg")) {
    return FileTypes.VIDEO;
   }

   if (true == lc.endsWith(".mpeg")) {
    return FileTypes.VIDEO;
   }

   if (true == lc.endsWith(".mp4")) {
    return FileTypes.VIDEO;
   }

   if (true == lc.endsWith(".png")) {
    return FileTypes.IMAGE;
   }

   if (true == lc.endsWith(".tiff")) {
    return FileTypes.IMAGE;
   }

   if (true == lc.endsWith(".wmv")) {
    return FileTypes.VIDEO;
   }

  break;
 }

 return FileTypes.UNKNOWN;
}
