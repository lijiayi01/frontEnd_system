import _reduceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/reduce";

function haha() {
  var _context;

  _reduceInstanceProperty(_context = [1, 3]).call(_context, function () {});

  console.log('aa,,,,,,');
}

export { haha };