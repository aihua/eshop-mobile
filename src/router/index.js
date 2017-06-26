import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

import Home from '@/views/Home'
import ShopClose from '@/views/ShopClose'
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

// 分为两类流程 点餐 和 代售(通过二维码中consignee字段判断 有则为代售 无则为点餐)
// 流程中 ? 表示 可选步骤
// 点餐流程
// DealMenu(菜单) => ShopCart(购物车) => PhoneVerify(?验证手机号码) => PeopleNumber(选择人数) => OrderSuccess(下订单) => BillDetail(订单详情) => (Wechat/Ali)pay(支付)

// 代售流程
// DealMenu(菜单) => PhoneVerify(?验证手机号码) => ShopCart(购物车) => OrderSuccess(下订单) => BillDetail(订单详情) => (Wechat/Ali)pay(支付)
const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop-close',
    name: 'ShopClose',
    component: ShopClose
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
  routes,
})

export default router

export {
  routes
}
