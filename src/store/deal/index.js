import Vue from 'vue'
import {
  DealService,
  ShopCartService,
  OrderService,
  SMSService,
  AlipayService,
  TableService,
  CommentService,
  WechatService
 } from '@/http/index'
import storage from '@/util/storage'
import router from '@/router/index'

const state = {
  showMode: 'noPicMode',
  shopComments: '',
  // {
  //   foodId1: {
  //     num: 1,
  //     remark: '备注'
  //   },
  //   foodId2: {
  //     num: 2,
  //     remark: '备注2'
  //   },
  //   ...
  // }
  tempShopCart: {
  },
  shopCart: {
    foods: [],
    tableId: 0,
    totalNum: 0,
    totalPrice: 0,
    totalVipPrice: 0
  },
  // 订单备注
  remark: '',
  allFoods: [],
  loading: false,
  enterActiveClass: '',
  leaveActiveClass: '',
  alipayUrl: '',
  // 二维码 标识 租户/桌号信息
  searchObj: null,
  // 是否 加菜状态
  isAddMoreFood: false,
  // 是否下单成功
  orderingSuccess: false,
  // 订单详情
  orderDetail: {},
  showIframe: false,
  foodDetail:{}
}

const mutations = {
  UPDATE_SHOW_MODE(state, mode) {
    state.showMode = mode
  },
  SET_ALL_FOODS(state, foods) {
    // TOFIX 去除foods中的null
    foods.forEach(e => {
      e.foods = e.foods.filter(f => f)
    })
    state.allFoods = foods
  },
  ADD_FOOD(state, { food, num = 1, remark = '', typeIndex }) {
    debugger
    // 临时购物车 food 数量加一
    if (state.tempShopCart[food.id]) {
      if (food.unit === '份') {
        state.tempShopCart[food.id].num += 1
        state.tempShopCart[food.id].remark = remark
      } else if (food.unit === '斤') {
        state.tempShopCart[food.id].num = num
        state.tempShopCart[food.id].remark = remark
      }
    } else {
      Vue.set(state.tempShopCart, food.id, {num, remark})
    }
    // foodTypes 里选中食物加一
    const foodType = state.allFoods[typeIndex]

    if (foodType.selectFoodCount) {
      if (food.unit === '份') {
        foodType.selectFoodCount += 1
      } else if (food.unit === '斤') {
        // ignore
      }
    } else {
      Vue.set(foodType, 'selectFoodCount', 1)
    }
  },
  REMOVE_FOOD(state, { food, num = 1, typeIndex }) {
    debugger
    // 临时购物车 food 数量减一
    if (state.tempShopCart[food.id]) {
      state.tempShopCart[food.id].num -= 1
      if (state.tempShopCart[food.id].num === 0) {
        Vue.delete(state.tempShopCart, food.id)
      }
    }
    // foodTypes 里选中食物减一
    const foodType = state.allFoods[typeIndex]

    if (foodType.selectFoodCount) {
      foodType.selectFoodCount -= 1
      if (foodType.selectFoodCount === 0) {
        Vue.delete(foodType, 'selectFoodCount')
      }
    }
  },

  SHOW_LOADING(state, load) {
    if (load === true) {
      state.loading = load
    } else { // 延迟loading动画的消失 防止太快出现=>消失 体验不好
      setTimeout(() => {
        state.loading = load
      }, 300)
    }
  },
  UPDATE_ACTIVE_CLASS(state, { enter, leave }) {
    state.enterActiveClass = enter
    state.leaveActiveClass = leave
  },
  SET_ALIPAY_URL(state, url) {
    state.alipayUrl = url
  },
  SET_QRCODE_INFO(state, searchObj) {
    storage.set('tableId', searchObj.tableId)
    storage.set('tenantId', searchObj.tenantId)
    storage.set('tenantName', searchObj.tenantName)
    if (searchObj.consignee) {
      storage.set('consignee', searchObj.consignee)
    } else {
      storage.remove('consignee')
    }
  },
  SET_SHOP_CART(state, shopCart) {
    state.shopCart = shopCart
  },
  ADD_MORE_FOOD(state) {
    state.isAddMoreFood = true
    state.tempShopCart = {}
  },
  ORDERING_SUCCESS(state) {
    state.orderingSuccess = true
  },
  SET_ORDER_DETAIL(state, order) {
    state.orderDetail = order
  },
  SHOW_IFRAME(state) {
    state.showIframe = true
  },
  SET_ORDER_REMARK(state, remark) {
    state.remark = remark
  },
  DINERS_NUM(state, number) {
    state.dinersNum = number
  },
  SET_FOOD_DETAIL(state, { food, typeIndex }) {
    state.foodDetail = { food, typeIndex }
  },

  SET_SHOP_COMMENT(state, ratings) {
    state.shopComments = ratings
  }
}

const actions = {
  'SELECT_SHOW_MODE': ({ commit }, mode) => {
    commit('UPDATE_SHOW_MODE', mode)
  },
  FETCH_ALL_FOODS: ({ commit }) => {
    if (state.allFoods.length === 0) {
      return DealService.getAllFoods()
      .then(data => {
        commit('SET_ALL_FOODS', data.goods.map(e => {
          Object.assign(e, {selectFoodCount: ''})
          return e
        }))
      })
    } else {
      return Promise.resolve(state.allFoods)
    }
    
  },
  ADD_FOOD: ({ commit }, { food, num, remark, typeIndex }) => {
    commit('ADD_FOOD', { food, num, remark, typeIndex })
  },
  REMOVE_FOOD: ({ commit }, { food, num, remark, typeIndex }) => {
    commit('REMOVE_FOOD', { food, num, remark, typeIndex })
  },
  SET_QRCODE_INFO: ({ commit }, searchObj) => {
    commit('SET_QRCODE_INFO', searchObj)
  },
  cartAdd:({commit},{foodId,typeId}) => {
    commit('addForCart',{foodId,typeId})
  },
  ADD_SHOP_CART: ({ commit }) => {
    commit('SHOW_LOADING', true)
    const foodArray = Object.keys(state.tempShopCart).map(foodId => {
      return {
        FoodId: Number(foodId),
        num: state.tempShopCart[foodId].num,
        remark: state.tempShopCart[foodId].remark
      }
    })
    // 如果临时购物车有菜
    if (foodArray.length > 0) {
      const params = { foods: foodArray }
      // 标识 购物车中是谁点的菜
      const tableUser = storage.get('tableUser')
      if (tableUser) {
        params.tableUser = tableUser
      }
      return ShopCartService.addShopCart(params, storage.get('consignee'))
        .then(data => {
          commit('SHOW_LOADING', false)
          // 本地缓存 tableUser
          storage.set('tableUser', data.result)
          router.push({ name: 'ShopCart' })
        })
        .catch(err => {
          console.error(err)
          commit('SHOW_LOADING', false)
        })
    } else {// 如果临时购物车没有菜(处于加菜状态)
      return Promise.resolve()
      .then(_ => {
        commit('SHOW_LOADING', false)
        router.push({ name: 'ShopCart' })
      })
    }

  },
  FETCH_SHOP_CART: ({ commit }) => {
    commit('SHOW_LOADING', true)

    return ShopCartService.getShopCart()
      .then(data => {
        commit('SHOW_LOADING', false)
        console.log(data)

        data.foods.sort((a, b) => a.id - b.id)
        // 将foods中相同tableUser相同foodId 合并到一起
        data.foods = data.foods.reduce((accu, curr) => {
          const exisit = accu.find(e => e.id === curr.id && e.tableUser === curr.tableUser)
          if (exisit) {
            exisit.num += curr.num
          } else {
            accu.push(curr)
          }

          return accu
        }, [])
        commit('SET_SHOP_CART', data)
      })
      .catch(err => {
        console.log(err)
        commit('SHOW_LOADING', false)
      })
  },
  SHOP_CART_CHANGE_FOOD: ({ commit, dispatch }, food) => {
    commit('SHOW_LOADING', true)

    const condition = {
      FoodId: food.id,
      addNum: 0, 
      newNum: food.num,
      tableUser: food.tableUser
    }
    return ShopCartService.editShopCart(condition, storage.get('consignee'))
    .then(_ => dispatch('FETCH_SHOP_CART'))
  },
  SHOP_CART_REMOVE_FOOD: ({ commit, dispatch }, food) => {
    commit('SHOW_LOADING', true)

    const condition = {
      FoodId: food.id,
      addNum: -1, 
      tableUser: food.tableUser
    }
    return ShopCartService.editShopCart(condition, storage.get('consignee'))
    .then(_ => dispatch('FETCH_SHOP_CART'))
  },

  SHOP_CART_DELETE_FOOD: ({ commit, dispatch }, food) => {
    commit('SHOW_LOADING', true)

    const condition = {
      FoodId: food.id,
      addNum: 0,
      tableUser: food.tableUser
    }
    return ShopCartService.editShopCart(condition, storage.get('consignee'))
    .then(_ => dispatch('FETCH_SHOP_CART'))
  },
  SHOP_CART_ADD_FOOD: ({ commit, dispatch }, food) => {
    commit('SHOW_LOADING', true)

    const condition = {
      FoodId: food.id,
      addNum: 1,
      tableUser: food.tableUser
    }
    return ShopCartService.editShopCart(condition, storage.get('consignee'))
    .then(_ => dispatch('FETCH_SHOP_CART'))
  },

  ADD_MORE_FOOD: ({ commit }) => {
    commit('ADD_MORE_FOOD')
    router.push({ name: 'DealMenu' })
  },
  CHOOSE_PEOPLE_NUMBER: ({ commit, dispatch }, number) => {
    commit('DINERS_NUM', number)
    return dispatch('ADD_ORDER')
  },

  ADD_ORDER: ({ commit }) => {
    router.push({name: 'Ordering'})
    const params = {
      phone: storage.get('phoneNumber'),
      info: state.remark,
      dinersNum: state.dinersNum
    }
    return OrderService.addOrder(params, storage.get('consignee'))
    .then(data => {
      commit('ORDERING_SUCCESS')
    })
    .catch(err => {
      console.error(err)
      router.push({name: 'OrderFailed'})
    })
  },
  FETCH_ORDER: ({ commit }, tradeNo) => {
    return OrderService.getOrder(tradeNo)
    .then(data => {
      commit('SET_ORDER_DETAIL', data)
      // 将相同id的food合并
      data.foods = data.foods.reduce((accu, curr) => {
        const exisit = accu.find(e => e.id === curr.id)
        if (exisit) {
          exisit.num += curr.num
        } else {
          accu.push(curr)
        }
        return accu
      }, [])

    })
    .catch(err => {
      console.error(err)
    })
  },
  FETCH_SMS_CODE: ({ commit }, phoneNumber) => {
    return SMSService.getCode(phoneNumber)
    .then(data => {
      console.log(data)
      return data.reason
    })
    .catch(err => {
      console.log(err)
    })
  },
  VERIFY_SMS_CODE: ({ commit }, {phoneNumber, verifyCode}) => {
    return SMSService.verifyCode(phoneNumber, verifyCode)
    .then(data => {
      return data
    })
    .catch(err => {
      console.log(err)
    })
  },
  FETCH_ALIPAY_URL: ({ commit }) => {
    // commit('SHOW_IFRAME', true)
    // commit('SET_ALIPAY_URL', 'https://www.baidu.com')

    router.push({name: 'Alipay'})

    return AlipayService.getWapParams(state.orderDetail.totalPrice || state.orderDetail.totalVipPrice)
      .then(data => {
        console.log(data)
        commit('SHOW_IFRAME', true)
        const url = `https://openapi.alipay.com/gateway.do?${data.params}`
        commit('SET_ALIPAY_URL', url)
      })
      .catch(err => {
        console.error(err)
      })
  },

  FETCH_WECHATPAY_URL: ({ commit }) => {
    WechatService.redirect()
    .then(data => {
      window.location.href = data.url
    })
  },

  FETCH_TABLE_STATUS: ({ commit, state }) => {
    const tableId = storage.get('tableId')
    TableService.getStatus(tableId)
    .then(data => {
      if (data.tableStatus === 0) {// 空桌
        router.push({name: 'Home'})
      } else if (data.tableStatus === 1) {// 已下购物车
        router.push({name: 'ShopCart'})
      } else if (data.tableStatus === 2) {// 已下单
        router.push({name: 'OrderSuccess'})
      } else {
        console.error(`unknown table status; status: `, data.tableStatus)
      }
    })
    .catch(err => {
      console.error(err)
    })

  },

  FETCH_SHOP_COMMENT: ({ commit }) => {
    CommentService.getShopComment()
    .then(data => {
      commit('SET_SHOP_COMMENT', data.merchantRatings.sort((a, b) => {
        const milliSecondsA = new Date(a.time).getTime()
        const milliSecondsB = new Date(b.time).getTime()
        return milliSecondsB - milliSecondsA
      }))
    })
  },

  COMMIT_COMMENT: ({ commit }, params) => {
    CommentService.addShopComment(params)
    .then(data => {
      console.log(data)
      router.push({name: 'OrderSuccess'})
    })
  },

  COMMIT_FOOD_COMMENT: ({ commit }, params) => {
    return CommentService.addFoodComment(params)
    .then(data => {
      console.log(data)
    })
  }
}

const getters = {
  tempShopCart(state) {
    return state.tempShopCart
  },
  tempShopCartFoodCount(state) {
    return Object.keys(state.tempShopCart).reduce((accu, curr) => {
      return accu + state.tempShopCart[curr].num
    }, 0)
  },
  tempShopCartFoodCost(state) {
    let total = 0

    Object.keys(state.tempShopCart).forEach(foodId => {
      for (let type of state.allFoods) {
        for (let food of type.foods) {
          if (food.id === Number(foodId)) {
            const temp = food.price * state.tempShopCart[foodId].num
            total += Math.round((temp * 100))/100
          }
        }
      }
    })

    return total
  },
  foodDetail(state) {
    return state.foodDetail
  },
  showMode(state) {
    return state.showMode
  },
  shopComments(state) {
    return state.shopComments
  },
  allFoods(state) {
    return state.allFoods
  },
  shopCart(state) {
    return state.shopCart
  },
  loading(state) {
    return state.loading
  },
  enterActiveClass(state) {
    return state.enterActiveClass
  },
  leaveActiveClass(state) {
    return state.leaveActiveClass
  },
  isAddMoreFood(state) {
    return state.isAddMoreFood
  },
  orderingSuccess(state) {
    return state.orderingSuccess
  },
  orderDetail(state) {
    return state.orderDetail
  },
  showIframe(state) {
    return state.showIframe
  }
}

export {
  state,
  mutations,
  actions,
  getters
}
