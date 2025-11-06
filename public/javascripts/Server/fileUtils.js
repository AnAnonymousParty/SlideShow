export

/**
 * Class that provides utility functions for obtaining image files and lists.
 */
class FileUtils {

/**
 * Constructor, given:
	* <p>
	* @param diags    Diagnostics object for logging.
	* @param fs       File System accessor.
	* @param path     Path library.
	* @param gprfRslt GetRandomFileResult class.
	* @param confObj  Configutation object.
 */
	constructor(diags, fs, path, grfpRslt, confObj) {
		this.confObj  = confObj;
		this.diags    = diags;
		this.fs       = fs;
		this.grfpRslt = grfpRslt;
		this.path     = path;
		this.whoAmI   = this.constructor.name;
	}

/**
	 * Get a list of all the available image/video files in the configured 
		* Images directory.
	 * <p>.
	 * @return List of file names, may be empty.
	 */
	GetFilesList() {
		this.diags.LogSubCall(this.whoAmI, "GetFilesList", "", "");

		// List of file extensions we recognize:
		const extensions = [".avi", ".gif", ".jpg", ".jpeg", ".mpg", ".mpeg", ".mp4", ".png", ".tiff", ".wmv"];

		let filesList = [];  // The list of files to be created.

		SearchDirectory(this.fs, this.path, this.confObj.GetImagesDirectory());

		/**
		 * Nested helper function to add all files in a directory to the files 
			* list, including any and all subdirectories.
			* <p>
			* @param fs        Filesystem library reference.
			* @param path      Path manipulation library reference.
		 * @param directory Directory to be scanned.
		 */
		function SearchDirectory(fs, path, directory) {
			// Process each directory/file in the current directory:

			fs.readdirSync(directory).forEach(dirOrFile => {
				const candidate = path.join(directory, dirOrFile);

				// If the current candidate is a directory, do some recursive magic 
				// to process it:

				if (true == fs.statSync(candidate).isDirectory()) {
					SearchDirectory(fs, path, candidate); 
				}

				// If the current candidate is just a file, and has an extension that
				// is in the list of extensions we support, push it to the file list:

				let ext = path.extname(candidate);

				if (-1 != extensions.indexOf(ext)) { 
				 filesList.push(candidate);
			 }
			});
		}

		this.diags.LogSubExit(this.whoAmI, "GetFilesList", filesList.length, "");
	
		return filesList;
	}


	/**
	 * Attempt to get a random image path/file name.
	 * <p>
	 * @return GetRandomFileResult object containing path/name of random image
	 *         number of available images, may be empty/0 if there are no images
	 *         available in the configured image directory path.
	 */
	GetRandomImagePathFileName() {
		this.diags.LogSubCall(this.whoAmI, "GetRandomImagePathFileName", "", "");

		let filesList = this.GetFilesList();

		if (0 != filesList.length) {     
			let random = Math.floor(Math.random() * filesList.length + 1);
    
			let pathFileNameStr = filesList[random];

			this.diags.LogSubExit(this.whoAmI, "GetRandomImagePathFileName", pathFileNameStr, "");

			return new this.grfpRslt.GetRandomFileResult(filesList.length, pathFileNameStr);
		}

		this.diags.LogSubExit(this.whoAmI, "GetRandomImagePathFileName", "", "");

		return new this.grfpRslt.GetRandomFileResult(0, "");
 }		
}

export default FileUtils;