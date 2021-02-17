const merge = require('webpack-merge');
const webpackdevconfig = require('./webpack.dev.server.config');
module.exports = merge(webpackdevconfig, {
    output: {
        filename: 'js/bundle.js',
        library: 'singleVue',
        libraryTarget: 'umd',
    },
});
// window.singleVue.bootstrap, window.singleVue.mount, window.singleVue.unmount
