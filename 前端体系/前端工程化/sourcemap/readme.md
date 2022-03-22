# sourcemap详解

sourcemap是一个映射文件，里面存储着位置信息（转换后代码的位置，和转化前代码位置的一种映射）

请注意： 当我们测试sourcemap生成时，不要使用webpack生成，因为webpack会自动产生一些自己额外的代码，增加了理解sourcemap的难度

## 生成sourcemap

请使用uglify-js来测试

安装uglify-js`npm install -g uglify-js`

```
    uglifyjs main.js  -o main.min.js --source-map
```

查看生成后的.map文件

```
{
    "version":3,
    // sources: 代表源文件
    "sources":[
        "main.js"
    ],
    // names: 转换前的所有变量名和属性名
    "names":[
        "obj",
        "c",
        "obj1",
        "a",
        "b",
        "console",
        "log"
    ],
    // mappings: 记录位置信息的字符串
    "mappings":"AAAA,MAAMA,IAAM,CAACC,EAAG,GAChBC,KAAKD,EACL,IAAIE,EAAI,KACR,IAAIC,EAAI,IACRC,QAAQC,IAAIH,EAAEC"
}

```

## sourcemap的mappings

mappings是map文件最重要的部分，它代表着转换前后文件的位置信息

mappings有如下规则：

- 每一个 ; 代表转换后代码的一行
- 每一个 , 代表转换后代码的一个位置

我们看上面的mapping，发现没有`;`, 说明转换后的代码只有一行

再看看`,`, 它代表转换后代码每个单词的位置（每个单词可以理解为js的关键字，如果var 变量名等等）

再分析位置信息：

位置信息是通过VLQ编码表示的，VLQ编码也是一种编码方式（有兴趣可了解下）

每个位置信息使用5位(也可能是4位，最少4位)，分别代表5个字段

- 第一位，表示这个位置在（转换后的代码的）的第几列。

- 第二位，表示这个位置属于sources属性中的哪一个文件。

- 第三位，表示这个位置属于转换前代码的第几行。

- 第四位，表示这个位置属于转换前代码的第几列。

- 第五位，表示这个位置属于names属性中的哪一个变量。

但是我们也不懂比如`AAAA`代表什么，因为它使用VLQ编码过了，那如何能转换为我们懂的位置信息呢?

使用vlq模块

首先安装vlq  `npm i vlq`

测试如下代码
```
const vlq = require('vlq');

const str = 'AAAA'

const pos = vlq.decode(str);

console.log(pos)
```

但是注意：它返回的是个相对位置，是与前一个位置的相对位置

查看具体位置的代码，放到test.js里

通过打印，可以看到代码具体的位置信息

src目录main.js代码对应打包后的代码的位置信息比较如下:

```
[ 0, 0, 0, 0 ]
[ 6, 0, 0, 6, 0 ]
[ 10, 0, 0, 12 ]
[ 11, 0, 0, 13, 1 ]
[ 13, 0, 0, 16 ]
[ 16, 0, 1, 0, 1 ]
[ 21, 0, 1, 5, 0 ]
[ 23, 0, 2, 0 ]
[ 27, 0, 2, 4, 2 ]
[ 29, 0, 2, 8 ]
[ 34, 0, 3, 0 ]
[ 38, 0, 3, 4, 1 ]
[ 40, 0, 3, 8 ]
[ 44, 0, 4, 0, 1 ]
[ 52, 0, 4, 8, 2 ]
[ 56, 0, 4, 12, -1 ]
[ 58, 0, 4, 14, 0 ]
```


