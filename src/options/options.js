// Saves options to chrome.storage
function save_options() {
  var time = document.getElementById('time').value;
  var stringSource = document.getElementById('stringSource').value;
  chrome.storage.sync.set({
    savedTime: time,
    savedStringSource: stringSource
  }, function() {
    // Update status to let user know options were saved.
    window.close();
  });
}

function restore_options() {
  chrome.storage.sync.get({
    // default source github blns.json
    savedStringSource: 'https://raw.githubusercontent.com/minimaxir/big-list-of-naughty-strings/master/blns.json',
    // defautl time 250 ms
    savedTime: '250'
  }, function(items) {
    document.getElementById('stringSource').value = items.savedStringSource;
    document.getElementById('time').value = items.savedTime;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
