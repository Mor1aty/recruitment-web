import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入 md5 加密
import md5 from 'js-md5'

// 导入NProgress, 包对应的JS和CSS
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'
// 导入 axios
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8088/api/'

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // request 拦截器，展示进度条
  NProgress.start()
  return config
}, _ => {
  this.$message.error('网络异常')
})

axios.interceptors.response.use(config => {
  // response 拦截器，隐藏进度条
  NProgress.done()
  return config
})

Vue.prototype.$http = axios
Vue.prototype.$md5 = md5

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
