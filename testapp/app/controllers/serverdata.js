// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

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
