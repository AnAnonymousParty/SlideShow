var controlsTimer;
var delayTimer;

function DelayTimerElapsed() {
	console.log("> DelayTimerElapsed()"); 
	
	ReloadPage();

	console.log("< DelayTimerElapsed()");
} 
function DoDelete() {
	console.log("> DoDelete()");

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (ReadyStateTypes.DONE != xhr.readyState) {
			return;
		}

		if (HttpStatusTypes.OK == xhr.status || HttpStatusTypes.NOTMODIFIED == xhr.status) {
			ReloadPage();
		}
		else {
			alert("File could not be deleted.");
		}
	}

	var params = "Image2Delete=" + encodeURI(document.getElementById("requestedFilePathName").value);

	xhr.open("GET", "/DeleteImage?" + params, true);
	xhr.send();
	              
	console.log("< DoDelete()");
}        
function DoNext() {
	console.log("> DoNext()");

	ReloadPage();

	console.log("< DoNext()");
}

function GetCookie(cookieName) {
	console.log("> GetCookie(" + cookieName + ")");

	let cookieValue = "";

	const cookies = document.cookie.split('; ');

	for (const cookie of cookies) {
		const [name, value] = cookie.split('=');

		if (name === cookieName) {
			cookieValue = value;

			break;
		}
	}

	console.log("< GetCookie() [" + cookieValue + "]");

	return (cookieValue);
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

function InitPage() {
	console.log("> InitPage()");

	let delay = document.getElementById("requestedDelay").value * 1000;

	let delayCookieValue = GetCookie("Delay") * 1000;

	if ("" != delayCookieValue) {
		delay = delayCookieValue;
	}

	document.getElementById("AllowVideo").checked = ("false" == GetCookie("AllowVideo") ? false : true);
	
	var xhr = new XMLHttpRequest();

	xhr.responseType = 'arraybuffer';

	xhr.onreadystatechange = function () {
		if (ReadyStateTypes.DONE != xhr.readyState) {
			return;
		}

		let filePathName = xhr.getResponseHeader("Content-Location");

		var availableFiles = document.getElementById("availableFiles").value;

		if (0 == availableFiles) {
			document.getElementById("ErrorContainer").style.display    = "flex";
			document.getElementById("ErrorContainer").style.visibility = "visible";

			document.getElementById("ImageContainer").style.display    = "none";
			document.getElementById("ImageContainer").style.visibility = "collapse";

			document.getElementById("VideoContainer").style.display    = "none";
			document.getElementById("VideoContainer").style.visibility = "collapse";
		} else {
			document.getElementById("ErrorContainer").style.display    = "none";
			document.getElementById("ErrorContainer").style.visibility = "collapse";
		}

		document.onclick = ShowControls;

		if (null == delayTimer) {
			delayTimer = setInterval(DelayTimerElapsed, delay);
		}

		if (HttpStatusTypes.OK == xhr.status || HttpStatusTypes.NOTMODIFIED == xhr.status) {
			xhr.addEventListener('load', function () {
				if (HttpStatusTypes.OK === xhr.status) {
					let type = xhr.getResponseHeader('content-type');
					let pieces = type.split("/");

					type = pieces[0];

					console.log(">> InitPage().load type = " + type);

					let blob = new Blob([xhr.response]);

					const img = new Image();

					img.src = URL.createObjectURL(blob);

					if ("image" == type) {
						document.getElementById("ImageContainer").style.display    = "flex";
						document.getElementById("ImageContainer").style.visibility = "visible";

						document.getElementById("VideoContainer").style.display    = "none";
						document.getElementById("VideoContainer").style.visibility = "collapse";

						document.getElementById("ImageContainer").onclick = ShowControls;

						document.getElementById("DispImage").src = img.src;

						document.getElementById("requestedFilePathName").value = filePathName;

						if (null == delayTimer) {
							delayTimer = setInterval(DelayTimerElapsed, delay);
						}
					}

					if ("video" == type) {
						document.getElementById("ImageContainer").style.display    = "none";
						document.getElementById("ImageContainer").style.visibility = "collapse";
						 
						document.getElementById("VideoContainer").style.display    = "flex";
						document.getElementById("VideoContainer").style.visibility = "visible";

						document.getElementById("VideoContainer").onclick = ShowControls;

						document.getElementById("DispVideo").src = img.src;

						document.getElementById("requestedFilePathName").value = filePathName;
						
						if (null != delayTimer) {
							clearInterval(delayTimer);
						}
					}
				}
			});
		}
		else {
			console.log("  InitPage() error = " + xhr.status);
		}
	}

	xhr.open("GET", "/GetNextImage?AllowVideo=" + GetCookie("AllowVideo") , true);
	xhr.send();

	console.log("< InitPage()");
}
 
function ReloadPage() {
	console.log("> ReloadPage()");
	
	location.href = "http://" + document.getElementById("serverUrl").value;

	console.log("< ReloadPage()");
}

function RequestConfigPage() {
	console.log("> RequestConfigPage()");
	
	location.href = "http://" + document.getElementById("serverUrl").value + "/ShowConfigPage" ;
	              
	console.log("< RequestConfigPage()");
}  

function SetCookie(cookieName, cookieValue) {
	console.log("> SetCookie(" + cookieName + ", " + cookieValue + ")");

	const dateNow = new Date();
	const timeNow = dateNow.getTime();
	const dateYearFromNow = new Date(timeNow + 365 * 24 * 60 * 60 * 1000);

	document.cookie = cookieName + "=" + cookieValue + "; expires=" + dateYearFromNow.toUTCString();

	console.log("< SetCookie()");
}

function SetCookies() {
	console.log("> SetCookies()");

	SetCookie("AllowVideo", (true == document.getElementById("AllowVideo").checked ? "true" : "false"));
	SetCookie("Delay",      document.getElementById("requestedDelay").value);

	console.log("< SetCookies()");
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