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
