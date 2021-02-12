// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
const api = require("apis");

var image;
var photoName;
function getCamera() {
  api.TakePicture(true, function (error, result) {
    if (error) {
      console.log("Could not take photo");
      return;
    }

    if (result.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
      var arr = result.media.nativePath.split("/");
      photoName = arr.slice(-1)[0];

      image = result.media;
      return;
    }
  });
}

function getGallery() {
  api.OpenGallery(false, function (error, result) {
    if (error) {
      console.log("Could not open gallery");
      return;
    }

    if (result.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
      var arr = result.media.nativePath.split("/");
      photoName = arr.slice(-1)[0];

      image = result.media;
      return;
    }
  });
}

function getGPS() {
  if (
    Ti.Geolocation.hasLocationPermissions(
      Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE
    )
  ) {
    Ti.Geolocation.getCurrentPosition(function (e) {
      if (e.error) {
        console.log(e.error);
      } else {
        if (e.coords.latitude && e.coords.longitude) {
          console.log(e.coords.latitude, e.coords.longitude);
        } else {
          console.log("Failed to get current position");
        }
      }
    });
  } else {
    Ti.Geolocation.requestLocationPermissions(
      Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE,
      function (e) {
        if (e.success) {
          Ti.Geolocation.getCurrentPosition(function (e) {
            if (e.error) {
              alert(e.error);
            } else {
              if (e.coords.latitude && e.coords.longitude) {
                console.log(e.coords.latitude, e.coords.longitude);
              } else {
                console.log("Failed to get current position");
              }
            }
          });
        } else {
          console.log(
            "To use this application you should accept GPS permissions"
          );
          return;
        }
      }
    );
  }
}

function getCalendar() {
  if (!Ti.Calendar.hasCalendarPermissions()) {
    Ti.Calendar.requestCalendarPermissions(function (e) {
      if (e.success) {
        printCalendars();
      }
    });
  } else {
    printCalendars();
  }

  function showCalendars(calendars) {
    for (var i = 0; i < calendars.length; i++) {
      Ti.API.info(calendars[i].name);
    }
  }
  function printCalendars() {
    Ti.API.info("ALL CALENDARS:");
    showCalendars(Ti.Calendar.allCalendars);
    if (Ti.Platform.osname === "android") {
      Ti.API.info("SELECTABLE CALENDARS:");
      showCalendars(Ti.Calendar.selectableCalendars);
    }
  }
}

function getContacts() {
  if (Ti.Contacts.hasContactsPermissions()) {
    contacts();
  } else {
    Ti.Contacts.requestContactsPermissions(function (e) {
      if (e.success) {
        contacts();
      } else {
        console.log(e.error);
      }
    });
  }

  function contacts() {
    Ti.Contacts.showContacts({
      cancel: function (e) {
        console.log("cancelled");
      },
      selectedPerson: function (e) {
        var person = e.person;
        Ti.API.info(person);
        console.log("person selected is " + person.fullName);
      },
    });
  }
}
