// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mixins from './mixins'

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

let instance = null
function render(props) {
    instance = new Vue({
        el: '#root', // 这里还挂载在自己的html中，基座会拿到这个挂载的html，将其插入到基座
        mixins,
        router,
        store,
        render: h => h(App)
    })
}
if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ // 动态注入路径
}

// 独立运行应用
if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

export const bootstrap = async (props) => { }
export const mount = async (props) => {
    console.log(props)
    render(props)
}
export const unmount = async (props) => {
    instance.$destroy()
}
