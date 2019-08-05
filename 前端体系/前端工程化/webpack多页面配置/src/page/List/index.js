import $ from 'jquery'
import './css/list.css'
import {getDate} from '../../util/util'
import '../../resource/css/base.css'
$('li').on('click', function(){
    var index = $(this).index();
    var date = getDate()
    window.location.href = 'detail.html?id='+index
})

if (module.hot) {
    // 实现热更新
    module.hot.accept();
}