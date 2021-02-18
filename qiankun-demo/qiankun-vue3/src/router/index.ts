import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home/index.vue';
import About from '../views/About/index.vue';

const routes = [
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
        path: '/about',
        name: 'about',
        component: About
    }
]


const router = createRouter({
    history: createWebHistory('/vue3/'),
    routes,
})

export default router;
