// GET
exports.gets = function (url, callback) {
  // setup
  var getURL = "https://random-data-api.com/api/" + url;

  // online
  if (Titanium.Network.online) {
    var xhr = Ti.Network.createHTTPClient({
      onload: function (e) {
        if (this.status == "200") {
          if (checkJSON(this.responseText)) {
            callback(JSON.parse(this.responseText));
          } else {
            handleError(e, url, this.status, this.responseText);
          }
        }
      },

      onerror: function (e) {
        if (checkJSON(this.responseText)) {
          callback(JSON.parse(this.responseText));
        } else {
          handleError(e, url, this.status, this.responseText);
        }
      },
      timeout: 15000,
    });

    xhr.open("GET", getURL);
    xhr.send();
  } else {
    alert("You are offline, please connect to the internet");
  }
};

//HELPERS

// CHECK JSON

function checkJSON(_json) {
  try {
    JSON.parse(_json);
  } catch (e) {
    alert(e);
    return false;
  }
  return true;
}

//HANDLE ERRORS
function handleError(e, url, status, text) {
  alert(e.error);
  console.log("-- URL - " + url + " - STATUS ERR: " + status);
  console.log("-- URL - " + url + " - TEXT ERR:   " + text);
  console.log("-- URL - " + url + " - ERROR:      " + e.error);
  console.log("-- URL - " + url + " - END");
}
