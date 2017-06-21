import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import store from '@/store/index'

import Home from '@/views/Home'
import DealMenu from '@/views/DealMenu'
import Search from '@/views/Search'
import ShopCart from '@/views/ShopCart'
import PhoneVerify from '@/views/PhoneVerify'
import PeopleNumber from '@/views/PeopleNumber'
import Ordering from '@/views/Ordering'
import OrderSuccess from '@/views/OrderSuccess'
import BillDetail from '@/views/BillDetail'
import AlipayCallback from '@/views/AlipayCallback'
import OrderFailed from '@/views/OrderFailed'
import ShopComment from '@/views/ShopComment'
import VIPCard from '@/views/VIPCard'
import Alipay from '@/views/Alipay'
import FoodDetail from '@/views/FoodDetail'
import ShopCommentView from '@/views/ShopCommentView'
import Wechatpay from '@/views/Wechatpay'

Vue.use(Router)

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/deal-menu',
    name: 'DealMenu',
    component: DealMenu,
  },
  {
    path: '/food-detail',
    name: 'FoodDetail',
    component: FoodDetail
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/shop-cart',
    name: 'ShopCart',
    component: ShopCart
  },
  {
    path: '/phone-verify',
    name: 'PhoneVerify',
    component: PhoneVerify
  },
  {
    path: '/people-number',
    name: 'PeopleNumber',
    component: PeopleNumber
  },
  {
    path: '/ordering',
    name: 'Ordering',
    component: Ordering
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: OrderSuccess
  },
  {
    path: '/bill-detail',
    name: 'BillDetail',
    component: BillDetail
  },
  {
    path: '/alipay-callback',
    name: 'AlipayCallback',
    component: AlipayCallback
  },
  {
    path: '/order-failed',
    name: 'OrderFailed',
    component: OrderFailed
  },
  {
    path: '/shop-comment',
    name: 'ShopComment',
    component: ShopComment
  },
  {
    path: '/vip-card',
    name: 'VIPCard',
    component: VIPCard
  },
  {
    path: '/alipay',
    name: 'Alipay',
    component: Alipay
  }, {
    path: '/shop-comment-view',
    name: 'ShopCommentView',
    component: ShopCommentView
  }, {
    path: '/wechatpay',
    name: 'Wechatpay',
    component: Wechatpay
  }
]

const router = new Router({
  mode: 'history',
  routes
})

// 路由切换动画
// router.beforeEach((to, from, next) => {
//   const toIndex = routes.findIndex(e => e.path === to.path)
//   const fromIndex = routes.findIndex(e => e.path === from.path)
//   if (toIndex < fromIndex) {
//     store.commit('UPDATE_ACTIVE_CLASS', {
//       enter: 'animated slideInLeft',
//       leave: 'animated slideOutRight'
//     })
//   } else {
//     store.commit('UPDATE_ACTIVE_CLASS', {
//       enter: 'animated slideInRight',
//       leave: 'animated slideOutLeft'
//     })
//   }

//   console.log(`toIndex: ${toIndex}; fromIndex: ${fromIndex}`)
//   next()
// })

export default router

export {
  routes
}
