# 实现微前端需要改造的点

## 准备好基础vue项目结构

# child-vue 改造如下

## 1.安装 single-spa-vue
    npm i single-spa-vue -S

## 2.添加 child-vue/build/webpack.dev.server.config-singleSpa.js 文件
```
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
```

## 3.修改 child-vue/src/main.js 文件
```
    // import 'babel-polyfill' // 这一行注释，因为和父容器重复会报错
    import Vue from 'vue'
    import App from './App'
    import router from './router'
    import store from './store'
    import mixins from './mixins'
    import singleSpaVue from 'single-spa-vue'

    import './directive'
    import './libs'
    import './plugin'

    Vue.config.productionTip = false

    // 全局混合
    Vue.mixin(mixins)

    // new Vue({
    //     el: '#root',
    //     mixins,
    //     router,
    //     store,
    //     render: h => h(App)
    // })

    // 需要父应用加载子应用
    // 使用 single-spa/single-spa-vue/single-spa-react,实现路基劫持，应用加载
    // 子应用需要实现 bootstrap, mount, unmount 这三个方法
    const appOptions = {
        el: '#vue', // 要挂载在父应用中的dom节点的 id="vue"
        mixins,
        router,
        store,
        render: h => h(App)
    }
    const vueLifecycles = singleSpaVue({ // 返回的对象就包括这三个方法
        Vue,
        appOptions
    })
    // 导出3个方法，协议接入，父应用会调用这些方法
    export const bootstrap = vueLifecycles.bootstrap
    export const mount = vueLifecycles.mount
    export const unmount = vueLifecycles.unmount

    // 需要把子应用打包成一个个lib文件给别人使用

    // 如果是父应用引用我，子应用的路由是动态加载，会有问题？解决问题
    if (window.singleSpaNavigate) {
        __webpack_public_path__ = 'http://localhost:9001/'
    }

    // 独立访问子应用
    if (!window.singleSpaNavigate) {
        delete appOptions.el
        new Vue(appOptions).$mount('#root')
    }
```

## 4.修改 child-vue/src/App.vue 文件
```
    <template>
    <div>
        <router-link to="/home">home</router-link>
        <router-link to="/login">login</router-link>
        <router-view></router-view>
    </div>
    </template>

    <script>
    export default {
    name: 'App'
    }
    </script>

```

## 5. child-vue/src/router/index.js 文件添加
```
    base: '/vue',
```

## 6. 添加启动配置 child-vue/package.json 
```
    "start:spa": "webpack-dev-server --progress --config ./build/webpack.dev.server.config-singleSpa.js",
```

# parent-vue 项目改造如下

## 1.安装 single-spa
    npm i single-spa -S

## 2.改造 parent-vue/src/main.js 文件如下
```
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mixins from './mixins'
import { registerApplication, start } from 'single-spa'

import './directive'
import './libs'
import './plugin'

Vue.config.productionTip = false

// 全局混合
Vue.mixin(mixins)

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
    })
}

/**
 * 参数一：应用名称
 * 参数二：返回一个 Promise 对象的函数
 */
registerApplication(
    'myApp',
    async () => {
        // 加载另一个应用
        await loadScript('http://localhost:9001/js/bundle.js')
        return window.singleVue // 返回 bootstrap，mount，unmount 这三个方法
    },
    location => location.pathname.startsWith('/vue'), // 激活条件，当匹配到该路径后激活子应用，调用async方法
    { // 穿给子应用的参数
        a: 1
    }
)

// 开启应用
start()

// single-spa 缺点
// 1.不够灵活，不能动态加载js文件
// 2.样式不隔离，没有js沙箱机制

new Vue({
    el: '#root',
    mixins,
    router,
    store,
    render: h => h(App)
})
```

## 3.改造 parent-vue/src/App.vue 如下
```
<template>
  <div class="app">
    <!-- <router-view></router-view> -->
    <router-link to="/vue">加载vue应用</router-link>
    <div id="vue"></div>
  </div>
</template>
```


# 解决css隔离问题问题
    子应用之间隔离：
        Dynamic Stylesheet：动态样式表，当应用切换时移除老应用样式，添加新应用样式
    
    主应用和子应用之间的样式隔离：
        BEM(Block Element Modifier) 约定项目前缀
        CSS-Modules 打包时生成不冲突的选择器名
        Shadow Dom 真正意义上的隔离
        css-in-js
