import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    hashbang: true,
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login')
        },
        {
            path: '/interview',
            name: 'Interview',
            component: () => import('@/views/Interview'),
            children: [
                {
                    path: 'computed',
                    name: 'Computed',
                    component: () => import('@/views/Interview/Computed')
                },
                {
                    path: 'classStyle',
                    name: 'ClassStyle',
                    component: () => import('@/views/Interview/ClassStyle')
                },
                {
                    path: 'ifShow',
                    name: 'IfShow',
                    component: () => import('@/views/Interview/IfShow')
                },
                {
                    path: 'forList',
                    name: 'ForList',
                    component: () => import('@/views/Interview/ForList')
                }
            ]
        },
        {
            path: '/main',
            name: 'Main',
            component: () => import('@/views/Main'),
            children: [
                {
                    path: 'createCardNumber',
                    name: 'CreateCardNumber',
                    component: () => import('@/views/Main/CreateCardNumber')
                },
                {
                    path: 'cardMumberManagement',
                    name: 'CardMumberManagement',
                    component: () => import('@/views/Main/CardMumberManagement')
                },
                {
                    path: 'statistics',
                    name: 'Statistics',
                    component: () => import('@/views/Main/Statistics')
                },
                {
                    path: 'advertisement',
                    name: 'Advertisement',
                    component: () => import('@/views/Main/Advertisement')
                },
                {
                    path: '/order',
                    name: 'Order',
                    component: () => import('@/views/Main/Order')
                }
            ]
        }
    ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
    next()
})

export default router
