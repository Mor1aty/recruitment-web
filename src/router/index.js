import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from "../components/Register"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/home',
        component: Home
    }

]

const router = new VueRouter({
    routes
})

export default router
