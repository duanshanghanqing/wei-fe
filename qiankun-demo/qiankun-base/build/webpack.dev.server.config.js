const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackdevconfig = require('./webpack.dev.config');
module.exports = merge(webpackdevconfig, {
    devServer: {
        port: 9000,
        contentBase: './static',
        hot: true,
        historyApiFallback: true, // 解决f5刷新界面报404问题
        open: true,
        proxy: {
            "/pcapi": {
                target: "https://alph.laifuyun.com",
                secure: false,
                changeOrigin: true
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
