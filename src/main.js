// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import { ToastPlugin, AlertPlugin, ConfirmPlugin } from 'vux'
import 'normalize.css'
import 'animate.css'
import './assets/iconfont/iconfont.css'

import App from './App'
import router from '@/router/index'
import store from '@/store/index'
import '@/util/polyfill.js'


FastClick.attach(document.body)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
