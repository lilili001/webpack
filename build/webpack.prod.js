const {smart} = require('webpack-merge');
const base = require('./webpack.base.js');
const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = smart(base,{
    mode:'production',
    devtool:false,
    output: {
        filename: 'js/[name]-[hash:8].bundle.js',
        path: path.resolve(__dirname, '../dist'),//路径必须是一个绝对路径
        publicPath: "http://localhost:63342/webpack-learn/dist/"
    },
    //用于生产的
    optimization: {
        splitChunks:{
            cacheGroups:{
                //公共的模块
                common:{
                    chunks:'initial',
                    name:'common',
                    minSize:0,
                    minChunks:2,
                },
                //抽离第三方模块
                vendor:{
                    priority:1,
                    name:'vendor',
                    test:/node_modules/,
                    chunks:'initial',
                    minSize:30000,
                    reuseExistingChunk: true // 可设置是否重用该chunk
                },
            }
        },
        //用了optimize-css-assets-webpack-plugin这个插件就必须用js压缩插件,否则js不会被压缩
        minimizer: [
            new TerserJSPlugin({
                cache:true,
                parallel:true,//是否是并发打包的
                sourceMap:true,//源码映射
                exclude:/\/node_modules/
            }),
            new OptimizeCSSAssetsPlugin({})],
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            hash: true,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            chunks: ['app','common','vendor'] // 引入的代码块
        }),
    ]
})