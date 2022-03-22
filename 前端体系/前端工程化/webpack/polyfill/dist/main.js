"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _util = require("./util");

var _context;

var a = [1, 2, 3, 4];
(0, _forEach.default)(a).call(a, function (item) {
  console.log(item);
});
new _promise.default(function (resolve, reject) {});
(0, _find.default)(_context = [1, 4, -5, 10]).call(_context, function (n) {
  return n < 0;
});
(0, _util.haha)();