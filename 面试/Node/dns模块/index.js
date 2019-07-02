const dns = require('dns')
// 第一类函数：使用底层操作系统工具进行域名解析，且无需进行网络通信
dns.lookup('m.meisheapp.com', (err, address, family) => {
    console.log(address, family) // 127.0.0.1     4
    // 因为我们在本地hosts文件对m.meisheapp.com进行了ip执行，所以取到的是本地hosts ip
    // lookupService：使用getnameinfo 解析传入的地址和端口为域名和服务。
    dns.lookupService(address, 80, (err, name) => {
        if (err) {
            console.log(err);
            return false;
        }
        console.log(name) //m.meisheapp.com
    })
})

// 第2类函数：连接到一个真实的 DNS 服务器进行域名解析，且始终使用网络进行 DNS 查询
// resolve: 将域名解析为rrtype的ip数组，第2个参数为rrtype
dns.resolve('m.meisheapp.com', 'A', (err, address) => {
    // console.log(address)
    // [ '111.32.130.100',
    // '111.32.130.102',
    // '111.32.130.101',
    // '111.32.130.98',
    // '111.32.130.97',
    // '111.32.130.103',
    // '111.32.130.99',
    // '111.32.130.96' ]
    // 发现：它没有搜寻本地的hosts文件，直接用网络进行DNS查询

})

// reverse(): 将ip转成域名
dns.reverse('114.114.114.114', function(err, host){
    if(err){
        console.log(err)
        return false;
    }
    console.log(host)
})
// 返回一个用于当前解析的 IP 地址数组的字符串
console.log(dns.getServers())


