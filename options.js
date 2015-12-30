// Saves options to chrome.storage.sync.
function save_options() {
  chrome.storage.sync.set({
    host: document.getElementById('host').value,
    port: document.getElementById('port').value,
	user: document.getElementById('user').value,
	pswd: document.getElementById('pswd').value
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

function restore_options() {
  chrome.storage.sync.get({
    host: 'localhost',
    port: '9091',
	user: '',
	pswd: ''
  }, function(items) {
    document.getElementById('host').value = items.host;
    document.getElementById('port').value = items.port;
	document.getElementById('user').value = items.user;
	document.getElementById('pswd').value = items.pswd;
  });
}
document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options);
