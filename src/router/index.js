import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from "../components/Register"
import Index from "../components/recruit/Index"
import Company from "../components/recruit/Company"
import RecruitInfo from "../components/recruit/RecruitInfo"
import CompanyInfo from "../components/recruit/CompanyInfo"
import CandidateInfo from "../components/user/CandidateInfo"


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home
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
        component: Home,
        children: [
            {
                path: 'index',
                component: Index
            },
            {
                path: 'company',
                component: Company
            },
            {
                path: 'candidateInfo',
                component: CandidateInfo
            },
            {
                name: 'recruitInfo',
                path: 'recruitInfo',
                component: RecruitInfo
            },
            {
                name: 'companyInfo',
                path: 'companyInfo',
                component: CompanyInfo
            },
        ]


    }

]

const router = new VueRouter({
    routes
})
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router
