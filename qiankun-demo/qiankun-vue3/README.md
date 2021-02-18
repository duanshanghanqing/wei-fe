## 安装 Webpack 的核心模块以及它的 CLI 模块
    坑：必须是着两个版本，不然报错
    "webpack": "^5.22.0",
    "webpack-cli": "^3.3.12",
    npm i webpack@5.22.0 webpack-cli@3.3.12 --save-dev

    也要用 16 以上的
    "vue-loader": "^16.1.1",
    vue-loader依赖 @vue/compiler-sfc
    "@vue/compiler-sfc": "^3.0.2", 

## 编译
    npx 是 npm 5.2 以后新增的一个命令，可以用来更方便的执行远程模块或者项目 node_modules 中的 CLI 程序。
    
    npx webpack

## 配置 Webpack 的打包过程
    更目录增加配置
    webpack.config.js

## 编译 css
    npm install css-loader --save-dev

    css-loader 只会把 CSS 模块加载到 JS 代码中，而并不会使用这个模块。
    再使用一个 style-loader，把 css-loader 转换后的结果通过 style 标签追加到页面上。

    npm install style-loader --save-dev

## 体验插件机制
    更为合理的做法就是在每次完整打包之前，自动清理 dist 目录，这样每次打包过后，dist 目录中就只会存在那些必要的文件。

    npm install clean-webpack-plugin --save-dev

## 安装 webpack-dev-server
    
    npm install webpack-dev-server --save-dev


## 安装 autoprefixer
    npm i autoprefixer@8.0.0 -D

    这个要在 8 这个版本，不然报错

