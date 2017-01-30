chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    sendResponse();
});

// one after another injects all strings
function injectStrings() {
  return function(info, tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tab.id, {text: "hello"}, function(response) {
        //console.log(response.farewell);
      });
    });
  };
};

chrome.contextMenus.create({
  "title" : "Get image info",
  "type" : "normal",
  "contexts" : ["editable"],
  "onclick" : injectStrings()
});
