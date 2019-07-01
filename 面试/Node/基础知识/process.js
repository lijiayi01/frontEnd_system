const path = require('path');

// 获取环境path:window会获取到所有在环境变量里配置的path
// console.log(process.env.path) C:\Program Files (x86)\Common Files\Oracle\Java\javapath;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\ATI Technologies\ATI.ACE\Core-Static;D:\Git\cmd;D:\bin;D:\phantomjs-2.1.1-windows\bin;D:\mysql\install\bin;"C:\java\jdk\bin;C:\java\jdk\jre\bin";C:\maven\apache-maven-3.6.0\bin;C:\python\install\Scripts\;C:\python\install\;C:\Users\houmeiyu\AppData\Local\Programs\Python\Launcher\;D:\nodejs\;D:\nodejs\node_modules\npm\node_global_modules;D:\nodejs\node_modules\npm\bin;C:\Users\houmeiyu\AppData\Local\Microsoft\WindowsApps;D:\VSCode\bin;D:\phantomjs-2.1.1-windows\bin;C:\Users\houmeiyu\AppData\Local\BypassRuntm;D:\ffmpeg\ffmpeg-20190514-58d167b-win64-static\bin;D:\mysql\install\mysql-5.7.26-winx64\bin;

// 当前属性可编辑
// process.env.path = 'dev'
// console.log(process.env.path )
// 获取平台信息
// console.log(process.arch) x64
// console.log(process.platform) win32

// 获取内存使用情况
// console.log(process.memoryUsage()) 
// { 
//     // 驻留集大小(RAM),是给这个进程分配了多少物理内存，这个物理内存包括堆 / 栈 / 代码段
//     rss: 22507520,
//     // v8内存总量
//     heapTotal: 7159808,
//     // v8内存使用情况
//     heapUsed: 4444144,
//     // v8管理，绑定到js的c++对象的内存使用情况
//     external: 8224 
// }

// 获取命令行参数 
// console.log(process.argv)  // node process.js a b c 
// [ 'D:\\nodejs\\node.exe',
// 'E:\\work_study\\面试\\Node\\基础知识\\path.js',
// 'a',
// 'b',
// 'c' ]
setTimeout(function(){
    console.log(2)
},0)

process.nextTick( function(){
    console.log(1)
} )
setImmediate(function(){
    console.log(3)
})

// 打印 1 2 3

/* 
    * 解释：
    * node 事件模型与浏览器的事件循环模型稍微有点差别
    * 可以这么理解： 
    * setTimeout就是在经过 多少s后将回掉函数推到任务队列，和浏览器相同
    * setImmediate：总是会将它的会调事件推到任务队列的尾部
    * process.nextTick： 总是会将它的会调事件推到任务队列的首部
    * 所以，当执行栈清空，event loop将任务队列的回掉事件推动执行栈，首部的当然会先执行
    * 建议使用setImmediate
*/