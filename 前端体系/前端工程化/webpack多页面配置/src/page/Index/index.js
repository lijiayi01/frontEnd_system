console.log('hello')
// import './index.scss'
const btn = document.getElementById('btn');
btn.onclick = function(){
    window.location.href = 'list.html'
}

if (module.hot) {
    // 实现热更新
    module.hot.accept();
}