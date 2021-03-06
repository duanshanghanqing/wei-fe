import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mixins from './mixins'
import { registerMicroApps, start } from 'qiankun'

import './directive'
import './libs'
import './plugin'

Vue.config.productionTip = false

// 全局混合
Vue.mixin(mixins)

// 基座加载应用
const apps = [
    {
        name: 'vueApp', // 应用名称
        entry: 'http://localhost:9003/', // 默认加载子项目这个html，解析js，动态执行（子应用必须支持跨域）
        container: '#vue2', // 挂载节点，容器名称
        activeRule: '/vue2', // 激活子应用所匹配的路径，激活条件
        props: {// 传递参数到子应用
            a: 1
        }
    },
    {
        name: 'reactApp', // 应用名称
        entry: 'http://localhost:9006/', // 默认加载子项目这个html，解析js，动态执行（子应用必须支持跨域）
        container: '#react', // 挂载节点，容器名称
        activeRule: '/react' // 激活子应用所匹配的路径，激活条件
    },
    {
        name: 'vue3App', // 应用名称
        entry: 'http://localhost:9009/', // 默认加载子项目这个html，解析js，动态执行（子应用必须支持跨域）
        container: '#vue3', // 挂载节点，容器名称
        activeRule: '/vue3' // 激活子应用所匹配的路径，激活条件
    },
    {
        name: 'webpack5-vue3', // 应用名称
        entry: 'http://localhost:9012/', // 默认加载子项目这个html，解析js，动态执行（子应用必须支持跨域）
        container: '#webpack5-vue3', // 挂载节点，容器名称
        activeRule: '/webpack5-vue3' // 激活子应用所匹配的路径，激活条件
    }
]
registerMicroApps(apps, {
    // beforeLoad
    // beforeMount
    // beforeUnmount
}) // 注册应用
start({
    prefetch: false // 取消预加载
})

new Vue({
    el: '#root',
    mixins,
    router,
    store,
    render: h => h(App)
})
