function onClickHandler(info, tab) {
	alert("Link: " + info.linkUrl);
	console.log("Clicked on link " + info.linkUrl);
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  var id = chrome.contextMenus.create({"title": "Add to Transmission", "contexts":["link"],"id": "AddToTransmission"});
});