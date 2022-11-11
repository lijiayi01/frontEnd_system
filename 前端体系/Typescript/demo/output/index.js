"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@/util/util");
const p = {
    username: '10',
    age: 1,
};
const fn = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2);
        }, 1000);
    });
};
// console.log("123")
$('#app').html(p.username);
$(function () {
    console.log(1);
});
$.each([1, 2, 3, 4, 5], function (item) {
    console.log(item);
});
util_1.add(100, 200);
const r = {
    url: '123',
    data: {
        b: 2
    }
};
console.log(r);
let s = [1, 2, 3,];
//# sourceMappingURL=index.js.map