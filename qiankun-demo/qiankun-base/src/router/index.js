import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
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
            component: () => import('@/views/Home')
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
