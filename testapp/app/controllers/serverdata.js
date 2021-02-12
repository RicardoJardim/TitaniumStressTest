// Arguments passed into this controller can be accessed via the `$.args` object directly or:

const http = require("http");
var bank = [];
var user = [];

function createViews() {
  for (let index = 1; index <= 1000; index++) {
    let view = Ti.UI.createView({
      id: index,
      height: "40%",
      width: "70%",
      backgroundColor: index % 2 == 0 ? "green" : "white",
    });
    $.serverdata.add(view);
  }
}

function createBtn() {
  console.log(new Date());
  for (let index = 1; index <= 1000; index++) {
    let view = Ti.UI.createButton({
      id: index,
      height: "40%",
      width: "70%",
      backgroundColor: index % 2 == 0 ? "black" : "yellow",
      title: "click me",
    });
    $.serverdata.add(view);
  }
  console.log(new Date());
}

function fetchData() {
  console.log(new Date());
  http.gets("users/random_user?size=100", callback);
  http.gets("bank/random_bank?size=100", callback2);
}

function callback(data) {
  user = data;
  console.log("USER");

  var file2 = Ti.Filesystem.getFile(
    Ti.Filesystem.applicationDataDirectory,
    "users.txt"
  );

  file2.write(" " + data + " ");
  var contents = file2.read();
  console.log(
    "- created file: " + file2["name"] + ", content: " + contents.text
  );
  console.log(new Date());
}

function callback2(data) {
  bank = data;
  console.log("BANK");
  var file2 = Ti.Filesystem.getFile(
    Ti.Filesystem.applicationDataDirectory,
    "banks.txt"
  );
  file2.write(" " + data + " ");

  var contents = file2.read();
  console.log(
    "- created file: " + file2["name"] + ", content: " + contents.text
  );
  console.log(new Date());
}
