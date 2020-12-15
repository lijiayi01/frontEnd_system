var mod = require('./lib');
console.log(mod)
console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3

mod.change();
console.log(mod.val) // {a: 100}