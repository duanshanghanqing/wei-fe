const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: path.join(__dirname, '..', 'src', 'main.js'),
    output: {
        path: path.join(__dirname, '..', 'static'),
        publicPath: '/',
        filename: 'js/bundle-[hash].js'
    },
    module: {
        rules: [
            // 编译.vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader' // 依赖 vue-template-compiler
            },
            // 编译js文件，配置.babelrc文件
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    { 
                        loader: 'babel-loader'
                    }
                ],
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            }
        ]
    },
    // 还需要添加以下内容
    resolve: {
        alias: {
            //确定vue的构建版本
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new VueLoaderPlugin()
    ]
};
