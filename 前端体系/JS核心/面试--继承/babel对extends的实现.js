"use strict";
/**
 * babel对extends的处理：
 * 寄生组合继承 + 子构造函数.__proto__ = 父构造函数
 */
var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Person = (function () {
  function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
    this.list = [1, 2, 3];
  }

  _createClass(Person, [
    {
      key: "toString",
      value: function toString() {
        console.log("dayin");
      },
    },
  ]);

  return Person;
})();

// let p1 = new Person('JK')
// console.log(p1 instanceof Person) true
// console.log(p1.constructor === Person) true
// console.log(p1 instanceof Person.constructor) false

var Woman = (function (_Person) {
  _inherits(Woman, _Person);

  function Woman(name) {
    _classCallCheck(this, Woman);

    return _possibleConstructorReturn(
      this,
      (Woman.__proto__ || Object.getPrototypeOf(Woman)).call(this, name)
    );
  }

  return Woman;
})(Person);

var w1 = new Woman("nvren");
