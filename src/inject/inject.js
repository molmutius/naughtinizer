var naughtyStrings;
var timeout;

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
    chrome.storage.sync.get('savedStringSource', function(response) {
	    console.log(response);
		});
		readTextFile("https://raw.githubusercontent.com/minimaxir/big-list-of-naughty-strings/master/blns.json", function(text) {
		    naughtyStrings = JSON.parse(text);
				console.log("naughtinizer is ready to be used");
		});
		clearInterval(readyStateCheckInterval);
	}
	}, 10);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	 var i = 0;
   var injectInterval = setInterval(injectNaughtyStrings, timeout);
   function injectNaughtyStrings() {
     if (i == naughtyStrings.length) {
       clearInterval(injectInterval);
     } else {
       i++;
       injectString(naughtyStrings[i]);
     }
   }
});

injectString = function (textToInject) {
  domElement = document.activeElement;
  if (domElement.tagName === 'TEXTAREA' || domElement.tagName === 'INPUT') {
		domElement.value = textToInject;
    triggerEvents(domElement, ['input', 'change']);
  }
};

triggerEvents = function (element, eventArray) {
	var evt;
	eventArray.forEach(function (eventName) {
		evt = document.createEvent('HTMLEvents');
		evt.initEvent(eventName, true, false);
		element.dispatchEvent(evt);
	});
}

readTextFile = function (file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
