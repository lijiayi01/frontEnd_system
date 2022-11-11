# Vue 3 + TypeScript + Vite

## TypeScript

声明文件: declare 或 export 关键字；区别 declare 全局，export 需 import 导出

## Vite 设置环境变量

在 vue 中通过`import.meta.env.xxx`来使用

vite 默认读取根目录下的.env 文件

设置环境变量的方式:
` "dev": "vite --mode dev",`

--mode xxx, 就会读取.env.xxx 文件

只有以`VITE_前缀`的变量才会暴露给 vue 代码

## 引入全局 scss

定义变量的 scss 需要在 vite 中引入，否则会报错。

```
    scss: {
        additionalData: '@import "@/assets/scss/var.scss";@import "@/assets/scss/font.scss";'
    }
```
其他scss可以直接通过`@import '路径' `引入

## eslint和prettier

重要知识点: npm的eslint和 c eslint也能正常工作。具体看文章`https://juejin.cn/post/6990929456382607374`