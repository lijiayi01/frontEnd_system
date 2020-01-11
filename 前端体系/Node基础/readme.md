# Node需要学什么东西?

## 1.常见的内置模块

1. os
2. Buffer: 要记住常用的方法: <br>
Buffer.alloc(): 分配内存空间 <br>
Buffer实例.write(): 将内容写入内存空间 <br>
Buffer.from(): 写入并存入内存空间 <br>
Buffer.concat([buffer1, buffer2]): 拼接buffer <br>
3. fs 
4. http相关api

##  2.Node解决跨域问题

### 什么是跨域?

` http://localhost:8080`

只要客户端的协议 域名 端口任意一次与服务器接口的协议 域名 端口不同，就造成跨域。这是浏览器实现的。

## 解决跨域

### 1.jsonp(前端+后端方案)

实现原理： 我们知道script的引入是没有跨域限制的，比如`<script src="https://www.xxx.com/1.js"></script>`;所以只要动态创建script元素，并指向接口的地址就可以获取数据了。

伪代码
```
// 前端js代码
function jsonp(url, callback){
    var script = document.createElement('script');
    script.src = url + 'callback=' + callback;
    ocument.getElementsByTagName('head')[0].appendChild(script); 

    window[callback] = function(data){
        console.log(data)
    }
}
// 调用
jsonp('http://www.xxx.com/a.js?name=11&age=2', 'printInfo')

// Node后端代码:(为了简单代码，实例代码使用了express)
var http = require('express');
var app = http();

app.get('/list',(req, res)=>{
    let { callback } = req.query;

    let resData = {
        name: 'sss',
        age: 18
    }

    let data = callback+'('+JSON.Strinfy(resData)+')';

    res.end(data);
})

```
这里重点看一下Node端的代码，后端返回是一个"printInfo(data)",会在前端直接调用。

缺点： 需要后端配合，仅支持get请求。目前生产环境已经很少用到了。

### 2. 代理服务器

以nginx为例

### 3. cors：跨域共享

方案1：

后端直接在响应头增加 `Access-Control-Allow-Origin: 你的域名`

Node代码：
```
    res.setHeader('Access-Control-Allow-Origin': 'https://www.xxx.com')
```

但是这个方案有些少于问题，比如我们使用axios进行get请求时，同时增加了一个header处理

```
    axios.get('/user',{
        headers: {
            'x-Token': '123'
        }
    })

```

发送请求，发现请求无响应。

方案2：原理也是cors，只是更加全面。如果需要后端种cookie，需要做额外处理

主要了解一下简单请求和需要预检请求。

了解：https://www.jianshu.com/p/b55086cbd9af

cookie处理方式：

```
    res.setHeader('Access-Control-Allow-Credentials: true')
```

前端ajax设置：
```
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    // axios
    axios.default.withCredentials = true;
```

但是发现， 浏览器里的看不到存入的cookie，使用`document.cookie`也取不到

在Node端，使用`res.headers.cookies`发现cookie存在

**正向代理:**

举例:

用户属于同一个局域网下，当前局域网网速较慢，但用户都访问同一个大型网站，为了访问更快，管理者会将这个大型网站做层代理，方便用户访问。

正向代理是靠近浏览器端的，服务端一般不知道。

比如我们国内访问谷歌，就需要一个正向代理服务器，通过正向代理服务像谷歌访问，而我们只需要访问这个正向代理服务器即可，但其实谷歌压根没做相关处理。

**反向代理:**


它是靠近服务端的，一般都是服务器来配置。比如负载均衡等等，具体可看nginx内容。


## Node爬虫

需要的几个第三方库:

```
    cheerio: Node版的jquery
    

```



