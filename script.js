function onClickHandler(info, tab) {
	var link = info.linkUrl;
	chrome.storage.sync.get({
		host: 'localhost',
		port: '9091',
		user: '',
		pswd: ''
	}, function(items) {
		var host = items.host;
		var port = items.port;
		var user = items.user;
		var pswd = items.pswd;
		alert("Link: " + info.linkUrl + JSON.stringify(items, null, 2));
	});
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  var id = chrome.contextMenus.create({"title": "Add to Transmission", "contexts":["link"],"id": "AddToTransmission"});
});