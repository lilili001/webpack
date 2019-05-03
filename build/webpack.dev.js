const {smart} = require('webpack-merge');
const base = require('./webpack.base.js');
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    optimization: {
        splitChunks: {
            cacheGroups: {
                //公共的模块
                common: {
                    chunks: 'initial',
                    name: 'common',
                    minSize: 0,
                    minChunks: 2,
                },
                //抽离第三方模块
                vendor: {
                    priority: 1,
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 30000,
                    reuseExistingChunk: true // 可设置是否重用该chunk
                },
            }
        },
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            chunksSortMode: 'dependency',
            chunks: ['app','common','vendor'] // 引入的代码块
        }),
        new Webpack.NamedModulesPlugin(),//打印更新的模块路径
        new Webpack.HotModuleReplacementPlugin()//热更新插件
    ]
})