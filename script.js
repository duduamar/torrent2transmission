function handleError(msg, obj) {
	alert(msg);
	console.log(msg);
	console.dir(obj);
}

function sendToTransmission(link, loginData) {
	var url = "http://" + loginData.host + ":" + loginData.port + "/transmission/rpc";
	var body = {
		"method" : "torrent-add",
		"arguments": {
			"filename": link
		}
	};
	var headers = {};
	
	var ajaxProps = {
		method : "POST",
		url: url,
		data: JSON.stringify(body),
		dataType: "json",
		headers: headers,
		beforeSend: function (xhr) {
			if (!loginData.user)
				xhr.setRequestHeader ("Authorization", "Basic " + btoa(loginData.user + ":" + loginData.pswd));
		}
	}
	
	$.ajax(ajaxProps)
	.done (function (res) {
		handleError("Should not succeed to send POST without session ID!", res);
	}).fail(function (err) {
		if (err.status != 409) {
			handleError("Did not get the expected 409 response!",err);
			return;
		}
		var sessionID = err.getResponseHeader("X-Transmission-Session-Id");
		headers["X-Transmission-Session-Id"] = sessionID;
		$.ajax(ajaxProps)
		.done (function (res) {
			//alert ("Success!");
			var opt = {
			  type: "basic",
			  title: "Torrent2Transmission",
			  message: "Successfully added torrent",
			  iconUrl: "icon128.png"
			};
			chrome.notifications.create(opt);
		}).fail(function (err) {
			handleError("Failed to send the actual POST request",err);
		});
	});
}

function onClickHandler(info, tab) {
	var link = info.linkUrl;
	chrome.storage.sync.get({
		host: 'localhost',
		port: '9091',
		user: '',
		pswd: ''
	}, function(items) {
		sendToTransmission(info.linkUrl, items);
	});
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
	var id = chrome.contextMenus.create({
		"title": "Add to Transmission", 
		"contexts":["link"],
		"id": "AddToTransmission",
		"targetUrlPatterns" : ["magnet:*"]
	});
});