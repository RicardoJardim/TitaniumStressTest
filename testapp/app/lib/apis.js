exports.TakePicture = function (save, callback) {
  var camera = function () {
    Ti.Media.showCamera({
      success: function (e) {
        console.log("success");
        if (save) {
          Ti.Media.saveToPhotoGallery(e.media, {
            success(e) {
              console.log("saveToPhotoGallery: success!");
            },
            error(e) {
              console.error(e);
            },
          });
        }
        callback(null, e);
      },
      cancel: function (e) {
        callback(e, null);
      },
      error: function (e) {
        callback(e, null);
      },
      mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
      autohide: true,
      showControls: true,
    });
  };

  if (!Ti.Media.hasCameraPermissions()) {
    Ti.Media.requestCameraPermissions(function (e) {
      if (e.success) {
        camera();
      } else {
        editPermissions();
      }
    });
  } else {
    camera();
  }
};

exports.OpenGallery = function (callback) {
  Ti.Media.openPhotoGallery({
    mediaTypes: [Titanium.Media.MEDIA_TYPE_PHOTO],
    success: function (e) {
      console.log(
        "media.width: " +
          e.media.width +
          "\nmedia.height: " +
          e.media.height +
          "\nmedia.length: " +
          e.media.length +
          "\nmedia.mimeType: " +
          e.media.mimeType +
          "\nmedia.nativePath: " +
          e.media.nativePath
      );
      callback(null, e);
    },
    error: function (e) {
      editPermissions();
      callback(e, null);
    },
  });
};

function editPermissions() {
  Ti.Platform.openURL(Ti.App.iOS.applicationOpenSettingsURL);
}
