const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动创建html文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//清除多余文件

module.exports = {
    devtool: 'cheap-module-eval-source-map',// 用于开发调试，方便清楚是那个文件出错 (共有7种)
    entry: {
        index:'./src/test/main/index.js'
    },
    output: {
        filename: 'index.js', // 输出的文件名
        path: path.resolve(__dirname, 'dist') // 
    },
    performance: {
        hints: 'warning', // 枚举 false关闭
        maxEntrypointSize: 50000000, //入口文件的最大体积，单位字节
        maxAssetSize: 30000000, //生成文件的最大体积，单位字节
        assetFilter: function(assetFilename) { //只给出js文件的性能提示
          return assetFilename.endsWith('.js');
        }
      },
    module: {
        rules: [{
            test: /\.css$/,
            use:"style-loader!css-loader"
        }, {
            test: /\.scss$/,
            use:["style-loader","css-loader","sass-loader"]
           // 加载时顺序从右向左 
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        },
        {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
         }
    
    ]
    },
    // 开启一个虚拟服务器
    devServer: {
        contentBase: './dist',
        hot: true,
        port:3006
    },
    plugins: [
        new CleanWebpackPlugin(),//每次编译都会把dist下的文件清除，我们可以在合适的时候打开这行代码，例如我们打包的时候，开发过程中这段代码关闭比较好
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html' //使用一个模板
        })
    ]
};
// entry 是入口文件
// output 是编译后文件
// __dirname 全局变量 代表当前文件所在文件夹的完整路径
// path.resolve 返回一个路径 __dirname+'/dist'