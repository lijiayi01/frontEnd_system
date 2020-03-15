# Node部署上线

## 1.购买服务器

可以去阿里云去购买一台服务器，下一步下一步就可以了，购买成功了以后，我们就可以查看到当前服务器的外网ip(也就是让所有访问的地址)

## 2.本地先编写node代码

我们简单使用koa框架来编写最简单的node服务，比如:

```
    const koa = require(’koa);
    const app = new koa();
    app.get('/api/getList', async (req, res)=>{
        res.body = {
            name: 'hha',
            age: 18
        }
    })

    app.listen(3000)
```

这里我们已经编写了一个最简单的koa项目，项目依赖koa包，所以记住先安装koa包

 `npm i --save koa`

运行项目： 

`node app.js`

## 3.将本地代码传到服务器

如果上面本地代码已经可以运行，将代码传到服务器，一般我们使用ftp上传。

可以下载ftp客户端，连接到我们的服务器，账号密码就是我们服务器的账号密码。

上传成功以后，安装node需要的所需的环境，我们安装node  pm2

### Node在linux上的安装


### pm2的安装

在服务器上，我们使用pm2运行node代码，也就不用使用 node app.js来运行代码了。

` npm install pm2 -g`

## 4.使用pm2运行代码

我们知道node是单线程的，为了合理的利用cpu资源，一般我们可以使用node内置的进程模块来创建进程，充分利用cpu资源，这是代码层面的。 另一种我们可以直接用pm2,pm2有多进程 负载均衡等优点，这样就减少我们的代码量。

pm2 start app.js 

## 5.安装nginx
