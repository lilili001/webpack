const path = require('path');

module.exports = {
    entry:'./src/index.js',
    output: {
        filename: "main.js",
        path:path.resolve(__dirname,'dist'),
        publicPath: "http://localhost:63342/wbp/dist/"
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
            }
        ]
    }
};