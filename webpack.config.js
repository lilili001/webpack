const path = require('path');
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'build.js',
        path:path.resolve('./build') //打包到了build目录下
    },
    devServer:{
        contentBase:'build', //访问目录 用了webpack-dev-server 就不会打包实体文件
        port:3000,
        compress:true,
        open:true //自动打开浏览器
    },
    module:{},
    plugins:[],
    mode:'development',
    resolve:{}, //配置解析
 }