import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
Vue.use(Router)

const router = new Router({
    base: '/vue2',
    hashbang: true,
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login')
        }
    ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
    next()
})

export default router
