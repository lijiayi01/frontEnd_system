const str = require('./str')
const btn = document.createElement('div')
btn.innerHTML = '点击'
document.body.appendChild(btn);

btn.onlick = function(){
    console.log(str)
}