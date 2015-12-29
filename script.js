function onClickHandler(info, tab) {
	var link = info.linkUrl;
	chrome.storage.sync.get({
		host: 'localhost',
		port: '9091'
	}, function(items) {
		var host = items.host;
		var port = items.port;
		alert("Link: " + info.linkUrl + " Host: " + host);
	});
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  var id = chrome.contextMenus.create({"title": "Add to Transmission", "contexts":["link"],"id": "AddToTransmission"});
});