## webpack功能：
- 代码转换：scss,less,转为 ts 转为js
- 文件优化: 压缩合并js css,图片合并优化
- 代码分割:（公共文件抽离，路由懒加载）
- 自动刷新
- 自动发布

1.初始化项目
```
npm init -y
npm i -D webpack webpack-cli
```

webpack 默认支持js模块化,```module.exports,require(xx)``` 

```$xslt
module.exports = {
    
}
```