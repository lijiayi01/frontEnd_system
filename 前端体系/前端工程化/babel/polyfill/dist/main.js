var _context;

import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _findInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/find";
import { haha } from './util';
var a = [1, 2, 3, 4];

_forEachInstanceProperty(a).call(a, function (item) {
  console.log(item);
});

new _Promise(function (resolve, reject) {});

_findInstanceProperty(_context = [1, 4, -5, 10]).call(_context, function (n) {
  return n < 0;
});

haha();