var controlsTimer;
var delayTimer;

function DelayTimerElapsed() {
	console.log("DelayTimerElapsed()"); 
	
	ReloadPage();
} 
 
function DoDelete(filePath2Delete) {
	console.log("> DoDelete(" + filePath2Delete + ")");

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (ReadyStateType.DONE != xhr.readyState) {
			return;
		}

		if (HttpStatusTypes.OK == xhr.status || HttpStatusTypes.NOTMODIFIED == xhr.status) {
			ReloadPage();
		}
		else {
			alert("File could not be deleted.");
		}
	}

	var params = "Image2Delete=" + filePath2Delete;

	xhr.open("GET", "/DeleteImage?" + params, true);
	xhr.send();
	              
	console.log("< DoDelete()");
}        
function DoNext() {
	console.log("> DoNext()");

	ReloadPage();

	console.log("< DoNext()");
}

function HandleVideoEnded() {
	console.log("> HandleVideoEnded()");
	
	ReloadPage();
	              
	console.log("< HandleVideoEnded()");
} 

function HideControls() {
	document.getElementById("ControlsContainer").style.display = "none";

	var delay = document.getElementById("requestedDelay").value * 1000;

	delayTimer = setInterval(DelayTimerElapsed, delay);
} 
 
function InitializeImagePage() {
	console.log("> InitializeImagePage()");

	var xhr = new XMLHttpRequest();

	xhr.responseType = 'arraybuffer';

	xhr.onreadystatechange = function () {
		if (ReadyStateTypes.DONE != xhr.readyState) {
			return;
		}

		if (HttpStatusTypes.OK == xhr.status || HttpStatusTypes.NOTMODIFIED == xhr.status) {
			xhr.addEventListener('load', function () {
				if (HttpStatusTypes.OK === xhr.status) {
					let blob = new Blob([xhr.response]);

					const img = new Image();
					img.src = URL.createObjectURL(blob);

					document.getElementById("DispImage").src = img.src;
				}
			});
		}
		else {
			// TODO: Handle failure, if needed.
		}
	}

	xhr.open("GET", "/GetNextImage", true);
	xhr.send();

 var availableFiles = document.getElementById("availableFiles").value;
	var delay          = document.getElementById("requestedDelay").value * 1000;
	 
	if (0 == availableFiles) {
	 document.getElementById("ErrorContainer").style.display    = "flex";
		document.getElementById("ErrorContainer").style.visibility = "visible";
			
	 document.getElementById("ImageContainer").style.display    = "none";
	 document.getElementById("ImageContainer").style.visibility = "collapse";
	} else {
		document.getElementById("ErrorContainer").style.display    = "none";
		document.getElementById("ErrorContainer").style.visibility = "collapse";

	 document.getElementById("ImageContainer").style.display    = "flex";
	 document.getElementById("ImageContainer").style.visibility = "visible";
	}
	 
	document.onclick = ShowControls;
	document.getElementById("DispImage").onclick = ShowControls;
	 
	if (null == delayTimer) {
	 delayTimer = setInterval(DelayTimerElapsed, delay);
	}
	 
	console.log("< InitializeImagePage()"); 
} 

function InitializeVideoPage() {
	console.log("> InitializeVideoPage()");

 var availableFiles = document.getElementById("availableFiles").value;
	 
	 if (0 == availableFiles) {
	  document.getElementById("ErrorContainer").style.display    = "flex";
		 document.getElementById("ErrorContainer").style.visibility = "visible";
	  document.getElementById("VideoContainer").style.display    = "none";
	  document.getElementById("VideoContainer").style.visibility = "collapse";
	 } else {
		 document.getElementById("ErrorContainer").style.display    = "none";
		 document.getElementById("ErrorContainer").style.visibility = "collapse";
	  document.getElementById("VideoContainer").style.display    = "flex";
	  document.getElementById("VideoContainer").style.visibility = "visible";
	 }
	 
	 document.onclick = ShowControls;
	 document.getElementById("DispVideo").onclick = ShowControls;
	 
	 if (null != delayTimer) {
	 	clearInterval(delayTimer);
	 }
	 
	console.log("< InitializeVideoPage()"); 
} 
 
function ReloadPage() {
	console.log("> ReloadPage()");
	
	location.href = "http://" + document.getElementById("serverUrl").value;

	console.log("< ReloadPage()");
}

function RequestConfigPage() {
	console.log("> RequestConfigPage()");
	
	location.href = "http://" + document.getElementById("serverUrl").value + "/ShowConfigPage"
	              
	console.log("< RequestConfigPage()");
}  

function SetDelay() {
	console.log("> SetDelay()");

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (ReadyStateTypes.DONE != xhr.readyState) {
			return;
		}

		if (HttpStatusTypes.OK == xhr.status || HttpStatusTypes.NOTMODIFIED == xhr.status) {
			ReloadPage();
		}
		else {
			alert("Delay could not be saved.");
		}
	}

	var params = "Delay=" + document.getElementById("requestedDelay").value;

	xhr.open("GET", "/SetDelay?" + params, true);
	xhr.send();

	console.log("< SetDelay()");
}

function ShowControls() {
	if (null != delayTimer) {
		clearInterval(delayTimer);
	}
	
 document.getElementById("ControlsContainer").style.display    = "block";
 document.getElementById("ControlsContainer").style.visibility = "visible";
	
	if (null == controlsTimer) {
		controlsTimer = setTimeout(HideControls, 20000);
	}
}

function SubmitConfig() {
	console.log("> SubmitConfig()");

	let formData = new FormData(document.getElementById("ConfigForm"));
	let obj      = Object.fromEntries(Array.from(formData.keys()).map(key => [key, formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key)]))
	let json     = JSON.stringify(obj);

	let xhr = new XMLHttpRequest();

	xhr.open("POST", "/SaveConfig", true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	xhr.onload = function () {
		if (ReadyStateTypes.DONE != xhr.readyState) {
			return;
		}

		console.log("  SubmitConfig(): " + xhr.status);

		if (HttpStatusTypes.OK === xhr.status) {
			location.href = "http://" + document.getElementById("serverUrl").value + "/"
		} else {
			alert("Configuration could not be saved.");
		}
	};

	xhr.send(json);
	            
	console.log("< SubmitConfig()");
}