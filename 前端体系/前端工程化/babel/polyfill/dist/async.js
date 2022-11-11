import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _Set from "@babel/runtime-corejs3/core-js-stable/set";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";

function a() {
  return _a.apply(this, arguments);
}

function _a() {
  _a = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var result;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return p();

          case 2:
            result = _context.sent;
            console.log(result);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _a.apply(this, arguments);
}

a();

function p() {
  return new _Promise(function (resolve, reject) {
    _setTimeout(function () {
      resolve(4);
    }, 2000);
  });
}

var Person = function Person() {
  _classCallCheck(this, Person);
};

var x = new _Set([1, 2]);
var arr = [1, 2, 3, 4];

_includesInstanceProperty(arr).call(arr, '1');

var fn = function fn(a, b) {
  return a + b;
};

new _Promise(function () {});