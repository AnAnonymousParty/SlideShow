/**
	* Container of configuration information and functions to load/save them to the
	* xml configuration file: <server root>\SlideShow\public\conf\Conf.xml.
	*/
export
class Configuration {
	/**
		* Constructor, given:
		* <p>
		* @param diags            Diagnostics object to be used for logging.
		* @param fs               File System accessor.
		* @param xml2jsParser     XML Parser library.
		* @param xmlbuilder       XML document manipulation library.
		* @param confFilePathName String containing path/name of configuration file.
		*/
	constructor(diags, fs, xml2jsParser, xmlbuilder, confFilePathName) {
		this.diags            = diags;
		this.fs               = fs;
		this.xml2jsParser     = xml2jsParser;
		this.xmlbuilder       = xmlbuilder;
		this.confFilePathName = confFilePathName;
		this.whoAmI           = this.constructor.name;

		this.diags.LogSubCall(this.whoAmI, "constructor", "diags, fs, xml2jsParser, xmlbuilder, " + this.confFilePathName, "");

		// Set defaults in case configuration file cannot be open/read:

		this.delay                  = 30;
		this.deletedImagesDirectory = "C:/DeletedPictures";
		this.imagesDirectory        = "C:/Pictures";

		// Attempt to load the configuration values from the configuration file:

		this.LoadConfiguration();

		this.diags.LogSubExit(this.whoAmI, "constructor", "", this.delay);
	}

	/** 
		* Get the configured delay value.
		* <p>
		* @return Delay value.
		*/
	GetDelay() {
		return this.delay;
	}

	/** 
		* Get the deleted images directory name.
		* <p>
		* @return Deleted Images directory name.
		*/
	GetDeletedImagesDirectory() {
		return this.deletedImagesDirectory;
	}

	/** 
		* Get the configured images directory name.
		* <p>
		* @return Images directory name.
		*/
	GetImagesDirectory() {
		return this.imagesDirectory;
	}

	/**
		* Load the configuration values from the xml configuration file.
		*/
	LoadConfiguration() {
		this.diags.LogSubCall(this.whoAmI, "LoadConfiguration", "", "");	

		// Try to open, read and parse configuration file:

		var fobj;

		try {
			fobj = this.fs.statSync(this.confFilePathName);
		} catch (err) {
			this.diags.LogSubExit(this.whoAmI, "LoadConfiguration", "Unable to access configuration file '" + this.confFilePathName + "'", err);

			return;
		}

		if (false == fobj.isFile()) {
			this.diags.LogSubExit(this.whoAmI, "LoadConfiguration", "'" + this.confFilePathName + "' is not a file", "");

			return;
		}

		let confDataXml = "";

		try {
			confDataXml = this.fs.readFileSync(this.confFilePathName, { encoding: 'utf8', flag: 'r' });
		} catch (err) {
			this.diags.LogSubExit(this.whoAmI, "LoadConfiguration", "Unable to read configuration file '" + "'", err);

			return;
		}

		let confDataJson = "";

		try {
			confDataJson = this.xml2jsParser.parseStringSync(confDataXml);
		} catch (err) {
			this.diags.LogSubExit(this.whoAmI, "LoadConfiguration", "Unable to parse configuration file '" + "'", err);

			return;
		}

		this.SetDelay(confDataJson.Configuration.Delay[0]);
		this.SetDeletedImagesDirectory(confDataJson.Configuration.DeletedImagesDirectory[0]);
		this.SetImagesDirectory(confDataJson.Configuration.ImagesDirectory[0]);

		this.diags.LogSubExit(this.whoAmI, "LoadConfiguration", "", "");
	}

	/**
		* Save the configuration values to the xml configuration file.
		*/
	SaveConfiguration() {
		this.diags.LogSubCall(this.whoAmI, "SaveConfiguration", "", "");

		var doc = this.xmlbuilder.create({ version: '1.0' });

		var rootElem = doc.ele('Configuration');

		var delayElem            = rootElem.ele('Delay');
		var deletedImagesDirElem = rootElem.ele('DeletedImagesDirectory');
		var imagesDirElem        = rootElem.ele('ImagesDirectory');

		delayElem.txt(this.GetDelay());
		deletedImagesDirElem.txt(this.GetDeletedImagesDirectory());
		imagesDirElem.txt(this.GetImagesDirectory());

		var xml = doc.end({ prettyPrint: true });

		try {
			this.fs.writeFileSync(this.confFilePathName, xml);
			console.log("The file was saved!");
		} catch (err) {
			console.log(error);
		}

		this.diags.LogSubExit(this.whoAmI, "SaveConfiguration", "", "");
	}

	/**
		* Set the configured delay value.
		* <p>
		* @param delay The Delay value.
		*/
	SetDelay(delay) {
		this.delay = delay;
	}

	/**
		* Set the deleted images directory name.
		* <p>
		* @param deletedImagesDirectory The deleted images directory path/name.
		*/
	SetDeletedImagesDirectory(deletedImagesDirectory) {
		this.deletedImagesDirectory = deletedImagesDirectory;
	}

	/**
		* Set the configured images directory name.
		* <p>
		* @param imagesDirectory The images directory path/name.
		*/
	SetImagesDirectory(imagesDirectory) {
		this.imagesDirectory = imagesDirectory;
	}
}

export default Configuration;