
export

/**
 * Class to provide diagnostics functions, mainly logging.
 */
	class Diagnostics {

		/**
		 * Constructor.
		 */
	constructor() { }

	/**
		* Log exception.
		* <p>
		* @param moduleName String containing name of module.
		* @param subName    String containing name of function where exception occurred.
		* @param exception  String containing exception details.
		* @param extra      String containing optional amplifying information.
		* @param exit       true = function will exit. false = function will continue.
		*/
	 Exceptional(moduleName, subName, exception, extra, exit) {
			console.error((true == exit ? "< " : "") + moduleName + "." + subName + "() Exception: " + exception + ("" == extra ? "" : (" - " + extra)) + "."); 
	}

	/**
		* Log bad enumeration.
		* <p>
		* @param subName      String containing name of function where bad enumeration occurred.
		* @param enumTypeName String containing name of the enumerated type.
		* @param badValue     The offending value.
		*/
	 LogBadEnum(moduleName, subName, enumTypeName, badValue) {
			console.warn("Encountered unrecognized enumerated value " + badValue + " for " + enumTypeName + " in " + moduleName + "." + subName + ".");
	}

	/**
		* Log sub call.
		* <p>
		* @param moduleName String containing name of module.
		* @param subName    String containing name of function.
		* @param subParms   String containing parameter value(s).
		* @param extra      String containing optional amplifying information.
		*/
	 LogSubCall(moduleName, subName, subParms, extra) {
			console.info("> " + moduleName + "." + subName + ("" == subParms ? "()" : ("(" + subParms + ")")) + ("" == extra ? "" : (" " + extra)) + ".");
	}

	/**
		* Log sub exit.
		* <p>
		* @param moduleName String containing name of module.
		* @param subName    String containing name of function.
		* @param retVal     String containing return value(s).
		* @param extra      String containing optional amplifying information.	
		*/
	 LogSubExit(moduleName, subName, retVal, extra) {
			console.info("< " + moduleName + "." + subName + "()" + ("" == retVal ? "" : (" [" + retVal + "]")) + ("" == extra ? "" : (" " + extra)) + ".");
	}

	/**
		* Log sub info.
		* <p>
		* @param moduleName String containing name of module.
		* @param subName    String containing name of function.
		* @param message    String containing message to be logged.
		* @param extra      String containing optional amplifying information.	
		*/
		LogSubInfo(moduleName, subName, message, extra) { 
			console.info("  " + moduleName + "." + subName + ("" == message ? "" : (": " + message)) + ("" == extra ? "" : (" - " + extra)) + ".");
	}
}

export default Diagnostics;