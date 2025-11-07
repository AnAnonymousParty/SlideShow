/**
	* Container of information related to an image file, the name and the number of files available.
	* Used as a return value when obtaining a file name from a directory.
	*/

export
class GetRandomFileResult { 
	/**
		* Constructor, given:
		* <p>
		* @param availableImages The number of available images.
		* @param pathFileName    String containing the path/name of an image file.
		*/
		constructor(availableImages, pathFileName) {
			this.availableImages = availableImages;
			this.pathFileName    = pathFileName;
		}

		/**
		 * Get the total number of all the available image files in a directory path.
			* <p>
		 * @returns The number of image files available.
		 */
		GetAvailableImages() {
			return this.availableImages;
		}

	/**
	* Get the path/file name of the image file.
	* <p>
	* @returns The path/name of the image file.
	*/
		GetPathFileName() {
			return this.pathFileName;
		}
}

export default GetRandomFileResult;
