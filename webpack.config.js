//require("@babel/polyfill");

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//压缩js
const TerserJSPlugin = require('terser-webpack-plugin');
// 抽离style为link的css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩　css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: "development",//默认两种模式 production,development
    entry: {
        app: './src/index.js',
        print: './src/js/print.js'
    },
    devtool: 'inline-source-map',//前台报错可以直接查看到哪个文件报错
    devServer: {//开发环境下
        contentBase: path.join(__dirname, "dist"),//静态服务文件夹
        compress: true,
        port: 8080
    },
    output: {
        filename: '[name]-[hash:8].bundle.js',
        path: path.resolve(__dirname, 'dist'),//路径必须是一个绝对路径
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                include:path.resolve(__dirname,'src'),
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{//es6 转化为es5
                        presets:[ ['@babel/preset-env',{
                            corejs: '2.0',
                            useBuiltIns:'usage'
                        }]],
                        plugins:["@babel/plugin-transform-runtime"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',//解析css之前就加上前缀
                    'less-loader'
                ]
            },
            {
                test: /\.scss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',//解析css之前就加上前缀
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash:8].css'
        }),
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
            chunks: ['app'] // 入口模块
        })
    ],//用于生产的
    optimization: {
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
};

