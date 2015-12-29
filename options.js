// Saves options to chrome.storage.sync.
function save_options() {
  var host = document.getElementById('host').value;
  var port = document.getElementById('port').value;
  chrome.storage.sync.set({
    host: host,
    port: port
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
	  window.close();
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    host: 'localhost',
    port: '9091'
  }, function(items) {
    document.getElementById('host').value = items.host;
    document.getElementById('port').value = items.port;
  });
}
document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options);
