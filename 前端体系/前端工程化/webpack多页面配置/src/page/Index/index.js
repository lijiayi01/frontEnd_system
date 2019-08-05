import $ from 'jquery'
import {getDate} from '../../util/util'
import './css/index.scss'
import '../../resource/css/base.css'
const btn = document.getElementById('btn');
btn.onclick = function(){
    var date = getDate()
    window.location.href = 'list.html'
}

$('#username').on('change', function(){
    // import()： 按需加载
    // 里面的注释：代表这个动态代码chunkName，可查看打包出来的文件名称
    import(/* webpackChunkName: "MyFile" */'./dyImport').then((...rest)=>{
        console.log(...rest)
    })
})

if (module.hot) {
    // 实现热更新
    module.hot.accept();
}