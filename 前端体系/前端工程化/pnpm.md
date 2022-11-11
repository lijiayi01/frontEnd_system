# pnpm

pnpm解决了`幽灵依赖` `依赖嵌套`问题

pnpm从全局 store 硬连接到 node_modules/.pnpm，然后之间通过软链接来组织依赖关系

## 软、硬链接

硬链接：两个文件共享同样文件内容，就是同样的 inode ，一旦文件1和文件2之间有了硬链接，那么修改任何一个文件，修改的都是同一块内容，删除任意一个文件，都不会影响另外一个文件

软链接：相当于windows的快捷方式。file2 只是 file1 的一个快捷方式，它指向的是 file1 ，所以显示的是 file1 的内容，删除了file2不会影响file1， 但是删除file1， file2就会变成死链接

## pnpm install

pnpm install生成的目录：

.pnpm 和 package.json中的依赖, 这样就解决了幽灵依赖， 不在package.json中的依赖不会出现在这里

.pnpm目录包含了该项目下所有的扁平化依赖（此时是硬链接，链接到pnpm全局store里的包）

.pnpm里的A依赖里的node_module目录依赖是.pnpm目录下所有的扁平化依赖中的一个(此时是软连接)

和.pnpm同级的那些依赖也是软连接，链接到.pnpm下的文件

## 幽灵依赖

幽灵依赖就是你的project中package.json并没有将A包依赖，但是project的依赖B包依赖了A包， 此时代码中可以`import A`，且不会报错。但是如果有一天依赖B升级，删除了对A包的依赖，此时`import A` error

