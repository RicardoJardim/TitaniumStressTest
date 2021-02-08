var btnID = 1;

var doClick1 = (e) => {
  if (btnID != 1) {
    resetViews();
    $.image1.image = "/bottom/creativity2.png";
    $.label1.color = "#ffffff";
    btnID = 1;
    Alloy.Globals.changeControllerBotBar("cpu", []);
  }
};

var doClick2 = (e) => {
  if (btnID != 2) {
    resetViews();
    $.image2.image = "/bottom/tablet2.png";
    $.label2.color = "#ffffff";
    btnID = 2;
    Alloy.Globals.changeControllerBotBar("serverdata", []);
  }
};

var doClick3 = (e) => {
  if (btnID != 3) {
    resetViews();
    $.image3.image = "/bottom/modeling2.png";
    $.label3.color = "#ffffff";
    btnID = 3;
    Alloy.Globals.changeControllerBotBar("apis", []);
  }
};

Alloy.Globals.changeControllerBotBar = function (controller, args) {
  var next_win = Alloy.createController(controller, args).getView();
  $.change.removeAllChildren();
  $.change.add(next_win);
};

Alloy.Globals.changeController = function (controller, args, close) {
  var next_win = Alloy.createController(controller, args).getView();
  next_win.open();
  if (close) {
    $.botBar.close();
  }
};

var resetViews = () => {
  $.image1.image = "/bottom/creativity1.png";
  $.image2.image = "/bottom/tablet1.png";
  $.image3.image = "/bottom/modeling1.png";
  $.label1.color = "#000000";
  $.label2.color = "#000000";
  $.label3.color = "#000000";
};

Alloy.Globals.changeControllerBotBar("cpu", []);

$.index.open();
