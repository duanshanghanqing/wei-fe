import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
// import Login from '@/views/Login'

Vue.use(Router)

const router = new Router({
    hashbang: true,
    mode: 'history',
    base: '/vue',
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
