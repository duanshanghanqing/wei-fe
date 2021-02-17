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
