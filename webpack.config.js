const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode:"development",//默认两种模式 production,development
    entry:{
        app:'./src/index.js',
        print:'./src/js/print.js'
    },
    devtool: 'inline-source-map',//前台报错可以直接查看到哪个文件报错
    devServer: {//开发环境下
        contentBase: path.join(__dirname, "dist"),//静态服务文件夹
        compress: true,
        port: 8080
    },
    output: {
        filename: '[name]-[hash:8].bundle.js',
        path:path.resolve(__dirname,'dist'),//路径必须是一个绝对路径
        publicPath: "/"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[{
                    loader:'style-loader',
                    options:{
                        insertAt:'top' //插入到header最顶部
                    }
                },'css-loader']
            },
            {
                test:/\.less/,
                use:[
                        {
                            loader:'style-loader',
                            options:{
                                insertAt:'top' //插入到header最顶部
                            }
                        },
                        'css-loader',
                        'less-loader'
                    ]
            },
            {
                test:/\.scss/,
                use:[
                    {
                        loader:'style-loader',
                        options:{
                            insertAt:'top' //插入到header最顶部
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use:['file-loader']
            },
            {
                test:/\.(csv|tsv)$/,
                use:['csv-loader']
            },
            {
                test: /\.xml$/,
                use:['xml-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'Output Management',
            filename:'index.html',
            template:'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            hash:true,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            chunks:['app'] // 入口模块
        })
    ]
};

