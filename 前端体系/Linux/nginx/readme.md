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
## nginx常见语法