前言
作为前端开发，cookie是我们经常需要打交道的东西。我们用它来鉴权，用它来实现行为跟踪，用它给无状态的 http 协议以“状态”。本文就聚焦这个小小的 cookie，把 cookie 掰开了，揉碎了讲一讲， 它是如何被我们利用的。

本文以 Chrome 浏览器 96.0.4664.55 版本作为客户端环境，后续所有代码说明都基于该版本的浏览器。主要阐述以下四点：

cookie 的现有属性

cookie 如何被用来跟踪我们

cookie 前端管理实践

cookie 的未来

话不多说，开冲！75c0e65631676633f957e942a54caf36.png

一、cookie 的属性们
在详细的属性说明之前，我们先让新老朋友重新熟悉一下 cookie。

cookie 官方定义：魔法曲奇饼，不是

An HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to a user's web browser. The browser may store the cookie and send it back to the same server with later requests. Typically, an HTTP cookie is used to tell if two requests come from the same browser—keeping a user logged in, for example. It remembers stateful information for the stateless HTTP protocol.
由官方定义可知，cookie 是一个存储在用户端设备上的小块数据。这里的定义指的是由 HTTP 请求的响应头set-cookie创建的 cookie。现在我们也可以使用 document.cookie来访问和手动创建第一方 cookie。

1.1 为什么要 cookie
大家都知道，因为有需求所以才有市场，技术也一样，cookie 就是这样出现的。cookie 的由来是著名的 Netscape 在给客户开发电子商务程序时，客户要求服务端不必须存储事务状态。那没办法，服务端不想存，只能客户端出力了。由此 cookie 诞生了。我们常用的 http 协议是无状态的协议，这也是为什么他这么快的原因之一。但很多时候我们需要知道是谁给我们发过来的请求，我们需要记录用户状态。

所以 cookie 诞生的原因：

服务端不想存状态

我们需要存状态

可能有人会说，那我这个状态存在sessionStorage里行不行，存在localStorage里行不行，甚至我自己放个自定义的参数放请求头里来表示状态行不行。

bd33c37d3f184dbfff400769ddcb0230.png
既然这么说了，当然是行的，浏览器发展到现在，很多存储方式被用来替代 cookie，但是 cookie 仍然存在其独特性。比如同域之间可共享，服务端可设置......所以具体怎样的方案取决于你的实际场景。

1.2 属性详解
打开浏览器的devtool面板

2fbd7230e5b1f5709178a065797e270b.png
可以看到，上面有 cookie 发展至今的所有属性，那这些属性分别代表什么呢？

cookie 属性说明表

属性名	属性说明
name	cookie 的名字
domain	cookie 所属域，domain表明哪些域名下可以使用该 cookie，重要的属性。
path	cookie的使用路径，path标识指定了主机下的哪些路径可以接受 cookie。
Max-Age	cookie有效期，单位秒。如果为整数，则该cookie在Max-Age秒后失效。
Expires	cookie的失效时间，如果cookie没有设置过期时间，那么 cookie 的生命周期只是在当前的会话中，关闭浏览器意味着这次会话的结束，此时 cookie 随之失效。现在已经被 maxAge 属性所取代，需要是一个日期对象。
HttpOnly	属性可以阻止通过 javascript 访问cookie。document.cookie读取到的内容不包含设置了 HttpOnly 的cookie， 从而一定程度上遏制这类攻击。
secure	它是一个布尔值，指定在网络上如何传输cookie，默认为 false，通过一个普通的 http 连接传输，标记为 true 的cookie只会通过被 HTTPS 协议加密过的请求发送给服务端。
SameSite	限制第三方 url 是否可以携带cookie。有 3 个值：Strict/Lax(默认)/None。
SameParty	Chrome 新推出了一个 First-Party Sets 策略，它可以允许由同一实体拥有的不同关域名都被视为第一方。之前都是以站点做区分，现在可以以一个 party 做区。SameParty就是为了配合该策略。（目前只有 Chrome 有该属性）
Priority	优先级，chrome 的提案（firefox 不支持），定义了三种优先级，Low/Medium/High，当cookie大小超出浏览器限制时，低优先级的cookie会被优先清除。（目前只有 Chrome 有该属性）
有人可能觉得啊，就这，就这一个表？是的，就这么多...是不可能的。既然要掰开了，揉碎了讲，当然要对每一个属性做详细的说明。这些点主要是关于平常我们使用 cookie 时候要注意的，也就是一些坑。

ef40726a90029f31510b2310189299ce.png
不废话了，让我们一个个开始讲。（标绿色的属性表示前端可以通过 js 直接操作的属性）

name

name 主要注意同名的问题，cookie 设置时不同 domain，不同 path 可以使用相同的 name。如果 domain、path 相同，那么后设置的 cookie 会覆盖先设置的。

除此之外还要注意一点，通过 js 操作cookie时，第一项永远对应的是name=value。即document.cookie="path=/;name=test"这样设置的结果不会是我们看上去的在/路径下配置了一个 value 为test的cookie。而是设置了一个cookie的 name 是path value 是/。

value

cookie 的值，仅支持字符串，如果使用其他类型，会调用 toString()方法进行转换。

domain

domain 要注意的点有很多，我们可以用它来实现前端跨域访问，单点登录（二级域名同域），跟踪用户.....主要要注意的有以下几个

js 设置 cookie 配置 domain时，只能设置第一方的。如在 example.com 使用js设置cookie，如document.cookie = token=123;domain=test.com是不会生效的。

js 设置cookie配置 domain时，如上一个例子，只要是手动配置该属性，无论这个属性前面有没有写明**“."**符号，都会自动加上 domian=.test.com，被配置通配域名的形式。

js 获取cookie时，目前通用的访问方式仍然是document.cookie这一个 API，所以在获取的时候我们是不知道当前的cookie是具体是属于哪一个domain的。

path

设置cookie的该属性时，该属性的必须存在于当前url的pathname中，和domain类似，否则无法设置。

设置 path 时如果设置配置的是相对路径，则会自动匹配设置为完整的pathname,如当前url为https://test.com/ab/cd，设置document.cookie = token=123;;path=ab，那么最终path就会是/ab/cd。

大家都知道cookie会在发送http请求时自动放入请求头。如果cookie设置了该属性，则会去匹配请求的路径中是否包含该属性的值，包含则会发送这个cookie。这里要注意一下path采用的是匹配的模式。如path为/test，那么/testtest也会匹配到。

path属性还存在一个作用，提升cookie的排序，通常我们设置cookie时，先设置的在前，后设置的在后。但是当cookie有path这个属性时，有path的会被提升到最前面（chrome 浏览器，其他浏览器未实验。）

这里还要注意下，设置path时，值要包含在当前url。但是我们最常用的ajax请求一般不是当前路径，所以会携带不上这个cookie。要注意区分，不是当前路径下的所有请求都会携带，而是请求的地址包含这个path才会携带。

Max-Age

cookie的删除都是利用过期时间来实现，将其过期时间Max-Age设置为<= 0的整数则可以删除该cookie。

Max-Age如果设置的是非整数，则过期时间默认为session，即到页面关闭即失效。

Max-Age的时间是秒，设置为 10，则表示 10 秒后过期，是符合我们的预期的。注意和下面讲的expires的区别。

Expires

Expires也是表示的过期时间，只不过相对max-age其出现的时间更早（对 IE8 以下有更好的兼容性）。现在更推荐使用Max-Age。使用Expires来设置过期时间有时候会出现一些我们困惑的情况。

Expires首先接受的是一个Date对象，其次特别要注意的是，cookie的过期时间是基于UTC时间。而国内的标准时间是 GMT时间，比UTC时间要快 8 小时。我们通过该属性设置过期时间时，如expires=${new Date()}。这里看着是把过期时间设置为了当前，cookie会立即失效，但是我们实际是把cookie的过期UTC时间设置为了当前时间，距离cookie真正失效还有 8 小时。有时我们通过expires去清除cookie时却没有清掉可能就是这个原因。

当我们同时设置Expires和Max-Age时，Max-age具有更高的优先级。

HttpOnly

该属性主要是用来做基础的 xss 攻击防御，js 在设置cookie时是无法配置该属性的。只有服务端通过set-cookie响应头返回的字段才能配置该字段。但是这也只是防君子罢了，不用太过依赖该属性。

Secure

secure和HttpOnly一样，都是为了cookie安全打出的组合拳。和HttpOnly不同的是，它允许通过 js 配置。

这里插入一点我在实践中发现的问题。有时候我们需要内网部署一些应用，通过前置机 ng 转发请求的形式来访问云端的服务。而访问前置机一般是直接访问ip的形式，这时候肯定不是 https 协议了。但是云端服务的响应头set-cookie中如果含有secure属性。（1）虽然可以通过 ng 传回来，但是是写不到内网机器里面的。（2）出现这种问题我们的处理方案通常是在 ng 这一层处理掉响应头的secure。这里要注意一下360 浏览器会检测到这种行为（不清楚具体原理），仍然无法写入cookie 。当前版本的 Chrome 则可以成功写入，不排除未了来 Chrome 更新阻止的可能。

SameSite

本属性是 chrome 51 新增的一个重要属性。三个值的意义如下

Strict: 仅允许发送同站点请求的的cookie。

Lax: 允许部分第三方请求携带cookie，即导航到目标网址的 get 请求。包括超链接 ，预加载和 get 表单三种形式发送cookie 。chrome 80+ 版本后，默认就是该值。

None: 任意发送cookie，设置为 None，必需要同时设置Secure=true，也就是说网站必须采用 https。

这里要区分一下跨站（cross-site）和跨域（cross-origin）两者不是一个概念。跨域是指 portal、host、port 之中的任意一个不同都被视为跨域。而跨站则比较宽松，只要二级域名相同就是同站（二级域名指 .com 这种顶级域名的下一级，如 test.com）。

默认配置该属性为Lax之后，主要影响的应该是我们的 post 表单、iframe、ajax 和 image，大家要注意。

SameParty

SameParty是 Chrome 为了 cookie的安全第三记组合拳。主要用来配合First-Party策略。所有开启了  First-Party Sets 域名下需要共享的 Cookie 都需要增加 SameParty 属性。如Set-Cookie:name=test;Secure;SameSite=Lax;SameParty。SameParty自身是没有值的，但是设置他必须设置了Secure且SameSite不能是 strict

First-Party 策略在后面“Chrome 是如何做的”中会详细说明。

Priority

上面说了很多可能有点啰嗦，这个属性就。。。没什么好说的，看上面的表格。

5b6333f6cb3202e2908a023230c72a29.png
二、cookie 如何被用来跟踪我们
上面一大段介绍看完，大家应该对现在的cookie有了全面的了解。那cookie又是如何被我们利用的呢？

cookie最广泛的用途大家肯定都知道，无非传递传递鉴权信息，做做单点登录，这也是用的最多的用法。但是cookie自诞生以来就是各大广告商窥探用户隐私的利器。例如我今天在某猫搜了个 xx 杯，第二天贴吧，微博到处都是这个东西的推销广告。仿佛全世界都知道我看了这个东西（事实上他们确实知道）。那么他们是如何做到的呢？

2.1 第三方 cookie
了解普遍的做法之前，我们先区分一下第一方cookie和第三方cookie。我们一般认为cookie的 domain 存在于当前域名或当前域名的父级的cookie称为第一方cookie，否则为第三方cookie。虽然很多情况下“第三方”的cookie也是我们主动注入的罢了。

如下图以某宝举例：

da6bd249ba3e1a5634deda7a2728d015.png
.taobao.com下的就是第一方cookie，而这个.mmstat.com 很明显就是第三方cookie了。

2.2 广告与隐私
上面说到第三方cookie，可以说它是各种网络广告的罪魁祸首，而且是最便捷成本最低的那种。我们继续以上面的某宝举例。大家都能发现这个.mmstat.com这个域名。那这个网站是干什么的呢。

我首先去百度了下这个域名，域名本身无法访问，但是在百度的结果下面倒是发现一些好玩的词条😅。

e22056279d42bdaad96bf95ab81c07e8.png169562b593160f3c93adf38ec196bc46.png

8096ac275e36680c05ea4daf7e012b93.pnga08efa279a9e334fcdeae6c0ad7b9cb3.png

那他是如何运作的呢，我们可以根据请求来看。

标记用户

首先我们打开某宝，可以看到第一次访问 mmstat.com 这个域名是下面这个请求：

7bd6c222f8cb0cf926f1acc624e7bb00.png
加载了一张几乎不可见的 gif 图片，同时通过 set-cookie 将第三方cookie写入。

之后又请求了这张 gif 图片。

f64142854027f024edf0685d91b949e3.png

获取用户足迹

我们知道用户投广告，希望看到的是广告的高转化率，那如何提高转化率呢？最好的方式自然是将商品推荐给需要他的人群。那如何知道用户需不需要这个商品呢？自然是记录用户的某宝搜索记录，浏览记录。将这些数据标记下来，就可以获得商品的目标人群。

我们依然以某宝举例，当我点进一个商品时，发送了这样 5 个请求

185f3cf98224bf3459dc5614e4dd006c.png

根据 cookie的基本作用我们知道，这四个请求都携带了我们第一次打开某宝时所写入的cookie信息，也就是标记我们是谁的信息，同时在这四个请求里传入了一些参数来标记我们的行为，我们拉出来一个个分析下。

我们从上面的图中可以看到，第一个和第二个，第三个和第四个请求几乎是一摸一样的。首先看下第一个和第二个请求

76582f9cdb618126f0e6c3bdeaabf0e8.png第一个请求参数 1-1 d2dc82583c66eccd8ba6e3699c633472.png第二个请求参数 1-2
可以看到两个请求参数几乎是相同的，唯一的不同在于第一个请求的 gokey 中多了一个 aws=1的参数，当然不是某宝的开发我们自然是不知道每个参数的作用的，但是我们可以通过参数中包含的信息来推测。这里可以看到_p_url这个参数中包含的信息时比较明显的。

从这个参数的值来分析，发现这个参数包含的信息就是我们是如何找到这个商品的。参数中明确的写出我们是通过 s.taobao.com来搜索 q=%E8%83%8C%E5%8C%85到达此页面的，q 的值就是我搜索的商品名“背包”。同时链接上还携带了一些其他参数，比如sourceId等。通过这些参数和一开始植入的第三方cookie，这里阿里妈妈就知道是"你在某宝首页通过搜索背包进入的该商品页"。那么你就被标记为了“一个需要背包的用户”。搜索作为一种主动行为，占的权重肯定是比较高的，那这个信息就是非常有用的。

第三个请求和第四个请求的情况类似于第一、第二个，只不过包含的信息更详细。第三个和第四个请求的地址相同，参数也几乎相同，唯一的不同也是aws这个值。

我们以第三个分析一下：

bf1a2d100962ccd8c9657594717e0501.png
可以看到，大量信息被放入 gokey 中。

6225b7e2d008decb6a38341cf454d64f.png
转码后可以看到一些被发送的信息，例如

serach_radio_all

GongYingLianDIsts

list_model

isp4p

item_click_form

上述信息大家通过定义的名称也大致能猜出其包含的数据信息。通过以上信息阿里妈妈就记录了你的这些行为：

你打开了淘宝

你在淘宝首页搜索了背包

你在第一页点进了一款背包

你只是看了看没有购买

......

有了这些信息之后，当我们打开接入了阿里妈妈广告的网站，比如某酷。你会发现他也有mmstat.com的第三方cookie吗，并且存在一个id信息和你在逛某宝的时候是相同的。这时候广告平台就知道了：你小子刚才想买个包，现在又跑到某酷看剧来了，等会就给你推送点包的广告，嘿嘿嘿！

而这一切的基础就是通过一个小小的第三方cookie来对我们进行标记，完成用户画像，再将这些信息整合把商品推送给我们吗，那赚我们的钱就像“抢劫”一样。本来你只是产生了买个包的想法但是没决定到底买不买，结果人家通过广告投放不间断的告诉你买个包吧，买个包吧，你的钱就这样花出去了。

3c03f2cb57dd4ab426b3d3441405fccd.png
总结

简单总结一下广告跟踪你基本就是三步走

首次访问网站时通过第三方cookie植入将你标记。

浏览网站时通过植入的cookie不断的向营销平台发送你的浏览足迹（几乎精确到了每一步操作，一个点击，一个停滞都会被记录）。

在访问其他社交网站时会值入相同的第三方cookie将你标记，同时给你推送相关广告。

具体到实现的操作会比这复杂的多，希望大家可以根据上方的分析有所了解。

到这里大家可能就觉得有一种被监控的感觉。上述只是对购物网站的基础分析，像我们日常用的最多的百度，微博等都接入了类似的广告营销平台，再加上广告联盟的存在，可以说我们每个人在网络上的每一步足迹都是被记录在案的。只是这些数据可能分散在不同的厂商，加上国家监管，各大厂商也不会肆无忌惮。不过被监控的感觉始终是不舒服的，这也是为什么 Google 收到了超 100 亿美元的关于隐私问题的罚款。而这一切都源于一个小小的cookie。

注：以上是我根据请求对广告行为与cookie相关的一些分析，对某宝的分析仅仅是举例，大家知道广告平台是怎么操作的即可。

三、cookie 前端管理实践
说完了cookie的基本属性与对我们的日常影响，我来谈谈在实践中我是如何管理cookie的，供大家参考。

3.1 前端 cookie 常见问题
在聊如何做的之前我们先说说我在cookie上遇到过的一些问题：

主域名内嵌子项目，cookie 在不同项目间的行为难以统一

cookie 鉴权相关操作在不完全了解的情况下不敢轻易修改

不同项目使用公司统一的二级域名情况下，因为 cookie 的 name 相同可能造成的混乱

项目中cookie如果某个属性要调整或者项目要扩展子系统，可能会有遗漏

公司域名更改，cookie相关信息也要一并更改，可能遗漏

上述的问题不外乎三点 (1)cookie管理混乱；(2)cookie后续维护困难；(3)不同项目之间的 cookie冲突。

3.2 cookie 管理
既然存在这些问题那就想办法解决，我这边的做法是在数据初始化时进行管理 cookie，前端拦截未定义cookie的操作。

我想要管理好项目中所有的cookie,甚至处理好多项目同二级域名的问题，那就在项目初始化的时候就定义好所有要用的cookie。之后所有对cookie的操作都是对这些已定义的cookie进行处理。

首先我们建立一个对象来声明我们项目中要使用的所有的cookie

// cookie-schema.js
{
  cookie1: {
    name: 'cookie1', // cookie 名称
    domain: 'root', // root-根域名 sub-当前域名及子域名 current-当前域名（默认值）
    path: '/', // 匹配路径
    expires: 30 * 24 * 3600 * 1000, // 过期时间 30d
    secure: false // https 传输
  },
  cookie2: {
    name: 'cookie2',
    domain: 'sub',
    expires: 30 * 24 * 3600 * 1000, // 30d
    path: '/cookie-test',
    secure: false
  }
}

如上，cookie-schema.js中就是我们项目中所有要使用的cookie。这个可以是前端直接自己声明，如果要处理不同项目之间冲突的问题，也可以专门建立数据中台。将所有项目可用的cookie放在后台配置，在项目初始化时去加载项目的可用cookie。

感兴趣的同学可以配合使用我的这个小工具，有详细说明：

**Cookie-Util：**https://github.com/Mrlyk/cookie-util

27bd5b9b066550e7b36af1a78ac3d2fc.png
四、cookie 的未来
目前由于cookie带来对种种隐私问题，各大浏览器厂商也开始限制第三方cookie。其中 safari 已经完全禁止了第三方cookie，但是对市场影响最大的依然是 Chrome 还没有这么做，所以大家的感受不是很强烈。

4.1 Google 是如何做的
Google 由于cookie带来的侵犯隐私问题，已经面临超 100 亿美元的罚款。因此 Google 在 2020 年初宣布 Chrome 将在未来的两三年中完全禁用第三方 cookie。当然阻力是很大的，广告行业的抵制声音最大，可以理解😄

到现在已经快两年过去了，可以看到 Google 对cookie也是动作不断。从 Chrome 51 推出 SameSite，到 89 版本推出 First-Party Sets 策略，还有Trust Tokens（这个笔者还未使用过）一步步在增加对三方cookie的限制，同时对历史问题提出解决方案。

First-Party Sets

在上面介绍广告是如何跟踪我们的说明中，我们可以清楚的看到mmstat.com和taobao.com不是一个同一个域名，但是他们却来自同一家企业。这种三方cookie可以看作是我们主动接入的，我们是不希望他们被浏览器干掉的。所以 Google 推出了First-Party Sets策略，配合 Chrome 的Saome-Party属性，我们可以允许一个第一方party内的域名之间的cookie互相访问。

当然为了防止该策略被滥用，Google 也做出了如下限制：

First-Party Sets 中的域必须由同一组织拥有和运营。

所有域名应该作为一个组被用户识别。

所有域名应该共享一个共同的隐私政策。

同时，该策略不允许在不相关的站点之间交换用户信息，所以单点登录还是需要使用其他方案。

要使用该方案可以通过提供定义当前域名与其他域名的关系的清单文件来声明它们是一个party的成员（或所有者），文件需要是位于.well-known/first-party-set路由下的 JSON 文件

以 Google 官方的例子，假设a.example, b.example, c.example希望形成一个由a.example拥有的 first-party。那就需要声明如下 JSON 文件：

// https://a.example/.well-known/first-party-set
{
  "owner": "a.example",
  "members": ["b.example", "c.example"],
  ...
}
 
// https://b.example/.well-known/first-party-set
{
 "owner": "a.example"
}
 
// https://c.example/.well-known/first-party-set
{
 "owner": "a.example"
}

注意：该方案还在试用阶段，chrome 89 ~ 93 可以试用

对 Google 的隐私策略有兴趣的同学可以看一下这篇开者文档：https://developer.chrome.com/docs/privacy-sandbox/

4.2 cookie Store API
The Cookie Store API provides an asychronous API for managing cookies, while also exposing cookies to service workers.

官方也新增了对cookie操作的新 API，相对于原来使用document.cookie繁琐操作，这个 API 更加的方便，但是只能在 HTTPS 协议的下使用，同时兼容性还很差。使用方法类似于我上方的Cookie-Util工具，感兴趣的同学可以看一下下面的官方文档。

官方文档：https://developer.mozilla.org/en-US/docs/Web/API/Cookie_Store_API

4.3 第三方 cookie 何去何从
透过上面的一系列分析，可以看出官方在未来主要打击的是第三方cookie。不久 Chrome 也要完全禁用这种第三方cookie。那么没了这些第三方cookie对我们的业务有什么影响呢？

单点登录，如果之前是依赖三方cookie做淡点登录的同学要特别注意寻找新方案了

异常追踪工具，通常使用第三方cookie来标记用户。被禁止后可能会造成 UV 暴涨的问题

用户行为分析工具，失去这个标记后可能会失效

.......

当然我们回到cookie作用的本质，是对用户进行标记。那我们可以不可以用其他方法来标记用户解决一些问题呢？当然是可以的，比如已经有很多人在用的浏览器指纹。

从普通用户的角度上说，我们当然希望自己的隐私被保护的更好。但是隐私这堵墙也会协助这些巨无霸公司把自己的壁垒筑的越来越高。比如 Google 推出 FloC 模型来分析用户群体的行为，当第三方cookie被屏蔽，广告商要想好好的打广告还得找回这些公司去使用他们的方案。

从技术的角度，我们更应该关注的是这些行业规范定制者的规范变更，对任何规范的变动保持警惕，及时处理对自己项目产生的风险。