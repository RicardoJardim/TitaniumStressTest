// POST
const alerted = require("alert");

exports.post = function (url, data, callback) {
  // setup
  var postURL = Ti.App.Properties.getString("serverUrl") + url;

  // online
  if (Titanium.Network.online) {
    var xhr = Ti.Network.createHTTPClient({
      onload: function (e) {
        // status ok
        if (this.status == "200" || this.status == "201") {
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
      timeout: 20000,
    });
    if (progress) {
      xhr.onsendstream = function (e) {
        progress(e.progress);
      };
    }
    xhr.open("POST", postURL);
    xhr.setRequestHeader("Connection", "close");
    xhr.send(data);
  } else {
    alerted.note("You are offline, please connect to the internet");
  }
};

// PUT JSON

exports.putsHttpss = function (url, data, callback) {
  // setup
  var putURL = Ti.App.Properties.getString("serverUrl") + url;

  // online
  if (Titanium.Network.online) {
    var xhr = Ti.Network.createHTTPClient({
      onload: function (e) {
        // status ok
        if (this.status == "200" || this.status == "201") {
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
    xhr.open("PUT", putURL);
    xhr.send(data);
  } else {
    alerted.note("You are offline, please connect to the internet");
  }
};

//====================

// =====================

// GET
exports.gets = function (url, callback) {
  // setup
  var getURL = Ti.App.Properties.getString("serverUrl") + url;

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

    /*  if (Ti.App.Properties.hasProperty("data")) {
      console.log("-- TOKEN : " + user_data["token"]);
      xhr.setRequestHeader("Authorization", user_data["token"]);
    } */
    xhr.send();

    // offline
  } else {
    alerted.note("You are offline, please connect to the internet");
  }
};

//HELPERS

// CHECK JSON

function checkJSON(_json) {
  try {
    JSON.parse(_json);
  } catch (e) {
    alerted.note(e);
    return false;
  }
  return true;
}

//HANDLE ERRORS
function handleError(e, url, status, text) {
  alerted.note(e.error);
  console.log("-- URL - " + url + " - STATUS ERR: " + status);
  console.log("-- URL - " + url + " - TEXT ERR:   " + text);
  console.log("-- URL - " + url + " - ERROR:      " + e.error);
  console.log("-- URL - " + url + " - END");
}
