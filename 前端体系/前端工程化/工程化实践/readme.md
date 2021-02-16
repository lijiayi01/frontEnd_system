# 前端工程化实践

什么算是真正前端工程化，可能有些人认为webpack + webapck dev server + babel这些就算是。

但其实我觉得，前端工程化包含的内容不止这些，可能包含： 代码规范、提交规范、webpack、监控、性能优化、CICD构建等一系列流程。

下面我们会按照上面说的一步一步去分析、实践。

## 代码规范

我们以vue项目为例，通过vue-cli创建项目后，我们加上eslint，来规范我们的代码。

所以，对于js, 我们以eslint的规范来编写代码（规范很多，下文有选出几种常见的规范）,在编译过程中就可以发现报错。

可能有些同学尝试过eslint规范代码，但是发现写两行代码，编译就报红，所以很多人慢慢就关闭了eslint查询。

其实有很多方法来让编辑器自动来规范我们代码。

比如vscode。

怎么操作呢？

- 安装eslint插件
- 然后 File -> Preference-> Settings，搜索 eslint，点击 Edit in setting.json，添加如下代码：
```
    "editor.codeActionsOnSave": {
        "source.fixAll": true,
    },
    // 添加vue支持
    "eslint.validate": ["javascript", "vue", "html"],
```

- 以后保存的时候，vscode会自动修改代码成eslint规范代码。

css编码规范：

