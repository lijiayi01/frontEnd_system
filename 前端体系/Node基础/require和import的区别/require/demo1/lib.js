var counter = 3;
function incCounter() {
  counter++;
}
var val = {
  a: 1
}
function change(){
  val.a = 100;
}


module.exports = {
  counter: counter,
  incCounter: incCounter,
  val: val,
  change: change
};