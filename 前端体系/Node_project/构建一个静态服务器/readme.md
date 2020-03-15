# 实现一个静态服务器

## 1.需要实现的需求: 

1. 读取静态文件
2. MIME类型支持
3. 缓存支持/控制
4. 支持gzip压缩
5. Range支持，断点续传

## 常见的概念问题:

1. no-store和 no-cache的区别？

no-store: 代表禁用缓存，代理服务器和本地都不缓存，每次请求都需要向服务器获取

no-cache: 可以在本地缓存，也也可以在服务器缓存，但这个缓存会进行新鲜度检验。


2. etag的生成规则：

我们先提一种最简单的生成规则：(以nginx为例)

nginx 中 etag 由响应头的 Last-Modified 与 Content-Length 表示为十六进制组合而成。

大家可以打开一个由nginx代理服务器运行的网站，查看其Etag。

一般情况下，Etag的格式为"W/xxxx-xxx"组成，那么第一部分xxxx就是由其Last-Modified经过16进制组合的。我们可以做个验证。

```
    new Date(parseInt('第一部分xxxx', 16) * 1000).toJSON();
```

会打印出一个日期，查看该日期是否和Last-Modified日期相同。

然后在验证Content-length:

```
    parseInt(第二部分xxx, 16)
```

查看这个值和Content-length是否相同。

当然，这个nginx的处理方式，其实很多其他服务器都有各自的一套算法规则，比如express。

七牛也提供了一套etag的计算规则，但是笔者还没搞懂，大家有兴趣的可以看 src/etag/qetag.js源码，研究一下。

我们经常会说etag比Last-Modified更加可靠，为什么呢？ 其实通过上面nginx的生成规则也可以搞懂，etag比Last-Modified多了一个Content-length的验证。

那么问题：  如果一个文件的etag值改变了，那么这个文件一定改变了吗？ (以nginx为例)

答： 不一定，nginx 中的 etag 由 last_modified 与 content_length 组成，而 last_modified 又由 mtime 组成。而touch file，mtime也会发生改变。

注意: mtime是linux的文件信息(window也有，但我们其实很少用到，相对于使用命令行的linux，其实我们对linux认识更加清晰)，linux文件信息时间有三个，atime(访问时间) ctime(状态更改时间) mtime(修改时间)，具体的内容大家可以查看linux的相关文档。
