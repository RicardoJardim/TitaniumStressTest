// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
let Stp = false;
function executeCPU() {
  $.label.text = "Result = " + 0;
  console.log(new Date());
  let result = 0;
  for (let j = 1; j <= 5; j++) {
    for (let k = 1; k <= 100000; k++) {
      result +=
        Math.log2(k) + (3 * k) / (2 * j) + Math.sqrt(k) + Math.pow(k, j - 1);
    }
    console.log(result);
  }
  console.log(new Date());
  $.label.text = "Result = " + result;
}
