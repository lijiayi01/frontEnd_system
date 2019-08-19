# nginx入门学习

## nginx概念

nginx是一个高性能的http和反向代理的web服务器。

直接说概念好像有点枯燥，先学会使用吧。

## nginx 安装

### window安装

进入官网，找到window版本，下一步下一步就完成了。

注意: nginx默认使用的是80端口，如果本地有80端口被占用，可修改nginx配置文件(后面会讲到)

### linux安装

本文主要讲的是linux下nginx的安装，毕竟生产环境下，linux服务器占了大多数。

linux下nginx的安装步骤：

详细见[安装步骤:](https://www.cnblogs.com/jimisun/p/8057156.html)

如何让nginx成为全局命令呢?

通过上面安装，还无法全局使用nginx，和window一样的思路，需要在全局环境变量配置。<br>
1. 打开环境变量所在文件： vim /etc/profile
2. 在文件末尾，加上一行
      `PATH:$PATH:/usr/local/nginx/sbin/  `  也就是nginx安装目录下的sbin目录(为命令行目录)
3. 重新加载环境<br>
       `source profile`

经过上面的配置，已经可以全局使用nginx这个命令了。

下面说一下nginx常见的命令:

- nignx： 运行nginx
- ps -ef | grep nginx： 查看nginx的运行进程
- nginx -t: 当我们每次修改完nginx配置时，需要判断修改是否有误。如果使用此命令，提示success则表示成功，否则修改有误。
- nginx -s reload: 重启nginx

## nginx常见配置

### nginx基本配置

配置文件是在conf目录下的nginx.conf文件。(本文的目录为`/usr/local/nginx/conf
`),注意是在nginx下的安装目录下寻找。window也相同。

这是默认的nginx配置文件(一一进行讲解)
```
# 运行用户，本文是nobody，可以不设置。nginx中#代表注释
#user  nobody;  
# nginx进程，默认和cpu核心数相同
worker_processes  1;

# 错误日志存放目录
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#进程pid存放位置
#pid        logs/nginx.pid;


events {
    # 单个后台进程的最大并发数
    worker_connections  1024;
}


http {
    # include：导入某个文件，这儿表示导入当前目录的mime.types(这个文件是后缀名与类型的映射表)
    include       mime.types;
    
    # 默认文件类型
    default_type  application/octet-stream;

    # 设置日志模式
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #nginx访问日志默认存放位置
    #access_log  logs/access.log  main;

    # 是否开启高效传输模式  on:开启 off:关闭
    sendfile        on;

    # 减少网络报文段的内容
    #tcp_nopush     on;

    # 保持连接的时间，也叫超时时间
    #keepalive_timeout  0;
    keepalive_timeout  65;

    # 是否开启gzip
    #gzip  on;

    # 配置服务(这儿才是重中之重)
    server {
        # 端口
        listen       80;

        # 域名
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            # 默认使用的目录(这儿使用的当前安装目录下的html目录)
            root   html;

            # 默认指向这个目录下的哪个文件
            index  index.html index.htm;
        }

        # 配置404页面
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        # 配置错误页面
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }
    
    include /usr/local/nginx/conf/config_nginx_lijiayi/*.conf;

    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

```
上面主要讲解了一些nginx的基础配置，其实很多我们了解即可。我们一般的配置都是在server上配置。

### nginx访问权限配置

比如我们的后台管理系统，只允许内网的访问，不对外公开，就需要配置权限

```
    location /{
        allow  xx.xx.xx.xx;
        deny   all;
    }

```

但是需要注意指令的优先级

比如上面的配置，如果讲deny放在allow前面会怎么样?<br>
会禁止所有ip访问。先起作用的配置会覆盖后面的配置。

### nginx做静态资源文件服务器

首先说一下，什么是静态资源文件服务器?

说白了就是只有前端的资源文件，如果js css img等。只需要服务器向本机某个目录读取并返回给客户端。(其实类似于express框架中，express实例.use(express.static(path.join(__dirname, '目录名称')))，笔者也实现了一个类似的功能，见[node构建静态文件服务器](https://github.com/lijiayi01/frontEnd_system/tree/master/%E5%89%8D%E7%AB%AF%E4%BD%93%E7%B3%BB/Node_project/%E6%9E%84%E5%BB%BA%E4%B8%80%E4%B8%AA%E9%9D%99%E6%80%81%E6%9C%8D%E5%8A%A1%E5%99%A8))

实际操作：(注: 以下操作均在linux下操作)

创建一个静态资源文件目录test,比如test目录下有两个子目录blob data(这两个各有一个html文件),并且有static目录(放img等资源)。

上面的文件目录为:

```
    - test
        - blob
            - index.html
        - data
            - data.html
        - static
            - 2.jpg

```
我们想通过域名+'/frontEnd/'的方式读取到test这个静态服务目录。

nginx的配置规则如下:

```
        location /frontEnd/ {
            alias   /test/;
            index   index.html;
            autoindex  on;
        }
```
并重启nginx，nginx -s reload, 访问域名+/frontEnd/即可成功访问。此时我们就用nginx配置了一个静态资源文件服务。

其实上面用到了alias autoindex等基本配置没讲到的地方。甚至我们衍生出nginx的location路径匹配规则。这些我们会在后面的nginx常见语法中讲到。这里只需要了解即可。

### nginx解决跨域

跨域在前端非常常见，就是非同源之间的访问。

如何解决跨域呢?

这里主要使用nginx来进行跨域处理。

比如本地有个node服务(localhost:8080)，请求/data会返回一个json数据。
```
  curl http://localhost:8080/data

  返回 

  {
      a: 1,
      b: 2,
      c: 3
  }
```
在本地的其他端口上面有个静态页面，使用ajax请求http://localhost:8080/data，浏览器会报跨域的错误。

使用nginx进行配置

```
	location ^~ /api/ {
	    rewrite  ^/api/(.*)$ /$1 break;
            proxy_pass  http://localhost:8080/;

		proxy_set_header Host $host;

		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_connect_timeout 5;
	} 	

```

前端代码如下:

```
    $.ajax({
        type: 'get',
        url: '/api/data',
        success: function(res){
            console.log(res)
        }
    })
```

上面代码慢慢来解释一下:

前端代码:

ajax访问的地址为: http://localhost/api/data

nginx配置:

这里就有个匹配规则(^~ /api/),^~ 又代表什么?  后面都会解释到

这里可以先大概的认为: 当访问开头path为api的时候，对应下面的具体匹配规则:

 rewrite  ^/api/(.*)$ /$1 break; // 意思是将前面的正则表达式进行替换，重写了url。这里的$1和js正则里的概念是相同的，匹配到第一个()的表达式。

 所以这里最终将: `http://localhost/api/data`重写为`http://localhost/data`

roxy_pass  `http://localhost:8080/`;//  代理的意思，将上面的url代理到`http://localhost:8080/`,也就是将`http://localhost`替换为`http://localhost:8080/`，所以整体的地址为: `http://localhost:8080/data`。从而完成了跨域的处理。


<font color="#f00">有个问题:配制成proxy_pass  `http://localhost:8080`; 会有影响吗?(少了/)</font>

后面的那几个配置属性:

解决代理引起的ip host问题。

因为： 如果默认不配置这几项属性，我们真正的后端服务器(localhost:8080)获取到的ip host都是我们中间服务器的(这里指的是nginx服务器)。如果我们需要对违规用户进行ip封号，因为无法获取客户端的ip。为了解决此类问题，使用了上面的配置。

如果不了解上面的小知识点,可搜索http X-Forwarded-For相关头。







### nginx反向代理负载均衡

这块功还没有通过代码测试。所以主要讲一下相关概念和简单的配置。

什么是反向代理负载均衡呢?举例

反向代理： 我们访问百度(www.baidu.com), 我们知道百度可能会有上百台服务器在运行支持百度的服务。因为一台服务器无法支撑庞大的访问量。 那么我们访问www.baidu.com其实就是访问到了中间服务器，中间服务器再经过一系列转发等操作，转发到真正为我们提供服务的后端服务器(也就是集群)。

这里说的中间服务器就是nginx服务器。

伪nginx配置文件:

```
http {

    upstream baiduNginx {
        server www.xxx.com;
        server  www.yyy.com;
        ...
    }

    server {
        listen      80;
        server_name www.baidu.com;
        
        location / {
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Scheme $scheme;
            
            proxy_pass baiduNginx; 
        }
    }
}



```
上面的伪代理就是反向代理负载均衡的核心配置。

在具体的负载均衡配置中，还可配置多种策略。这里就不展开讲了。

## nginx常见语法

nginx其实有很多的语法配置 公共常量等等。

这里主要讲解一下一些常见的语法。

上面我们其实已经积累了很多问题：

1. nginx location的匹配规则
2. root 和 alias的区别
3. ^~ 是个啥?

其中我们会将第4个问题集中到第一个问题里讲解。

### nginx location的匹配规则:

location的匹配方式有两种：

1. 前缀匹配：从前面匹配，要求是前面是一样的。(比如/a, /b /ac/, /d/都属于前缀匹配)
2. 正则匹配： 匹配正则表达式(包含~ !~ ~*等字符就认为它是正则匹配)

**location的匹配规则: 首先前缀匹配，然后再进行正则匹配**

有两种特殊的前缀匹配:

- = 代表是精确匹配，要求url和location的匹配要完全一样。如果是精确匹配，停止后面的所有匹配
- ^~ 若最长的前缀匹配包含了这个字符，停止后面所有匹配

正则匹配：

- ~ 区分大小写的正则匹配
- ~* 不区分大小写的正则匹配
- !~ 区分大小写的不匹配正则
- !~* 不区分大小写的不匹配正则

举例：
```
location = / {                          
    [ configuration A ]
}

location / {                            
    [ configuration B ]
}

location /documents/ {                  
    [ configuration C ]
}

location ^~ /images/ {                  
    [ configuration D ]
}

location ~* \.(gif|jpg|jpeg)$ {         
    [ configuration E ]
}

```

1.访问地址为: /

先进行前缀匹配(按照书写规则)，根据规则，会进行A B C D前缀匹配规则,然后再进行正则匹配。但是匹配到A时，是精确匹配，则停止后续匹配。

2.访问地址为: /index.html

先进行前缀匹配，发现只有B符合，且B为最长前缀匹配。

然后进行正则匹配，都没匹配上，选择之前的最长前缀匹配B

3.访问地址为: /documents/document.html

先进行前缀匹配， B C都符合，且 C为最长前缀匹配

然后进行正则匹配，都没匹配上，选择之前的最长前缀匹配C

4.访问地址为: /images/1.gif

先进行前缀匹配， B D都符合，且 D为特殊前缀匹配，则停止后续正则匹配。当前的规则使用 D

5.访问地址为: /documents/1.jpg

先进行前缀匹配，B C都符合，最长前缀匹配为C。

再进行正则匹配，匹配到E , 并丢弃之间的最长前缀匹配。 当前的规则使用E

### root 和 alias的区别

```
 location /a/ {

     root /test/;
     index index.html;
 }
```

访问http://xxx.com/a/index.html

真正寻找的资源是在 /test/a/index.html

**root处理: root 路径 ＋ location 路径**

```
location /a/ {

     alias /test/;
     index index.html;
 }
```

访问http://xxx.com/a/index.html

真正寻找的资源是在 /test/index.html

**alias 的处理：使用 alias 路径替换 location 路径, alias后面必须以/结束**

这里多注意一下，多写两边试试效果




