const {smart} = require('webpack-merge');
const base = require('./webpack.base.js');
const path = require('path');

module.exports = smart(base,{
    mode:'development',
    devtool:'source-map',
    devServer: {//开发环境下
        contentBase: path.join(__dirname, "../dist"),//静态服务文件夹
        compress: true,
        port: 8080,
        proxy:{
            /*'api':{
             target:'http://localhost:3000',
             pathRewrite:{'/api':''}//可以过滤api前缀
             }*/
        }
    },
})