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
import MyProgress from "../components/user/MyProgress"
import MyCompanyInfo from "../components/user/CompanyInfo"
import CompanyRecruit from "../components/user/CompanyRecruit"
import CompanyRecruitInfo from "../components/user/CompanyRecruitInfo"
import CompanyCandidateInfo from "../components/user/CompanyCandidateInfo"
import AdminLogin from "../components/admin/AdminLogin"
import AdminHome from "../components/admin/AdminHome"
import AdminCandidate from "../components/admin/AdminCandidate"
import AdminCompany from "../components/admin/AdminCompany"
import AdminRecruit from "../components/admin/AdminRecruit"
import AdminJobType from "../components/admin/AdminJobType"


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
                path: 'myProgress',
                component: MyProgress
            },
            {
                path: 'companyInfo',
                component: MyCompanyInfo
            },
            {
                path: 'companyRecruit',
                component: CompanyRecruit
            },
            {
                name: 'companyRecruitInfo',
                path: 'companyRecruitInfo',
                component: CompanyRecruitInfo
            },
            {
                name: 'companyCandidateInfo',
                path: 'companyCandidateInfo',
                component: CompanyCandidateInfo
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
    },
    {
        path: '/admin',
        component: AdminLogin
    },
    {
        path: '/admin-home',
        component: AdminHome,
        children: [
            {
                path: 'candidate',
                component: AdminCandidate
            },
            {
                path: 'company',
                component: AdminCompany
            },
            {
                path: 'recruit',
                component: AdminRecruit
            },
            {
                path: 'jobType',
                component: AdminJobType
            }
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
