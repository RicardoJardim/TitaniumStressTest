exports.time = function () {
  var date = new Date();
  var y = date.getFullYear();
  var mo = date.getMonth() + 1;
  var da = date.getDate();
  var d = y + "-" + mo + "-" + da;
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var x = h + ":" + m + ":" + s;
  var final_date = d + " " + x;

  return final_date;
};

exports.DateGiven = function (dates) {
  var date = new Date(dates);
  var y = date.getFullYear();
  var mo = date.getMonth() + 1;
  var da = date.getDate();
  var final_date = y + "-" + mo + "-" + da;

  return final_date;
};
