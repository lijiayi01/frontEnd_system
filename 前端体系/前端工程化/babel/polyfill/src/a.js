const {Set} = require("core-js-pure")
// console.log(Set)

let a = new Set([1,2])
a.add(3)

for(let key of a){
    console.log('key', key, 'value', a[key])
}
console.log(JSON.stringify(a))