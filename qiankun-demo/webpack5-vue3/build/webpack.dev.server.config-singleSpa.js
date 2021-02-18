const { merge } = require('webpack-merge');
const webpackdevconfig = require('./webpack.dev.server.config');
const { name } = require('../package');
module.exports = merge(webpackdevconfig, {
    output: {
        // 把子应用打包成 umd 库格式
        // library: `${name}-[name]`,
        // libraryTarget: 'umd',
        // jsonpFunction: `webpackJsonp_${name}`,

        // webpack5没有jsonpFunction
        library: `${name}-[name]`,
        filename: `${name}-[name].js`,
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*' // 支持跨域
        }
    }
});
// window.singleVue.bootstrap, window.singleVue.mount, window.singleVue.unmount
