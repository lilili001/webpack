const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:{
        app:'./src/index.js',
        print:'./src/js/print.js'
    },
    devtool: 'inline-source-map',//前台报错可以直接查看到哪个文件报错
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080
    },
    output: {
        filename: '[name]-[hash:8].bundle.js',
        path:path.resolve(__dirname,'dist'),
        publicPath: "/"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
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
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            chunks:['app'] // 入口模块
        })
    ]
};