// ======
// ALERTS

exports.note = function (alertText) {
  if (Ti.Platform.osname == "android") {
    var toast = Ti.UI.createNotification({
      message: alertText,
      duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
      gravity: Titanium.UI.Android.GRAVITY_RELATIVE_LAYOUT_DIRECTION,
    });
    toast.show();
  } else {
    var indWin = Titanium.UI.createWindow({
      opacity: 0,
      navBarHidden: true,
      fullscreen: true,
      height: "15%",
      orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
    });
    Alloy.Globals.WindowsArray.push(indWin);
    for (var j = 0; j < Alloy.Globals.WindowsArray; j++) {
      console.log(Alloy.Globals.WindowsArray[j]);
    }
    var indView = Titanium.UI.createView({
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE,
      borderRadius: 25,
      backgroundColor: "#e6e6e6",
      opacity: 1.0,
    });
    indWin.add(indView);
    var message = Titanium.UI.createLabel({
      text: "\n" + alertText + "          " + "\n",
      color: "#000",
      textAlign: "center",
      font: {
        fontFamily: "Smoolthan-Bold",
        fontSize: 15,
      },
    });
    indView.add(message);
    var interval = interval ? interval : 2500;
    indWin.open();
    var animation = Titanium.UI.createAnimation({
      duration: 1400,
      opacity: 1.0,
    });
    var animationHandler = function () {
      animation.removeEventListener("complete", animationHandler);
      indWin.animate(animation);
    };
    animation.addEventListener("complete", animationHandler);
    indWin.animate(animation);
    setTimeout(function () {
      indWin.close({
        opacity: 0,
        duration: 1400,
      });
      // =====
      // CLEAR
      setTimeout(function () {
        indWin.removeAllChildren();
        indWin = null;
        indView = null;
        message = null;
        interval = null;
        animation = null;
        animationHandler = null;
      }, 1400);
    }, interval);
  }
};
