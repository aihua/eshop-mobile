<template>
  <div class="deal-menu-container">
    <deal-dialog class="menu-dialog" v-model="showMenu" dialog-enter-active="animated fadeInLeft" dialog-leave-active="animated fadeOutLeft">
      <li class="menu-item" @click="choose('picMode')">
        <i class="icon-iconfontlist"></i>
        <span class="text">有图模式</span>
      </li>
      <li class="menu-item" @click="choose('noPicMode')">
        <i class="icon-ban"></i>
        <span class="text">无图模式</span>
      </li>
    </deal-dialog>
  
    <deal-header title="菜单">
      <span class="menu" slot="left">
        <i class="icon-menu" @click="show"></i>
      </span>
      <span class="search" slot="right">
        <i class="icon-search" @click="toSearch"></i>
      </span>
    </deal-header>
  
    <deal-content>
      <div class="left-tab">
        <ul class="dish-type-container">
          <li class="dish-type" :class="{'selected': menuCurrentIndex === index}"
           @click="selectFoodType(item, index)" v-for="(item, index) in allFoods" :key="item.id">
            <span class="text">{{item.name}}</span>
            <div class="food-count" v-if="item.selectFoodCount">{{item.selectFoodCount || ''}}</div>
          </li>
        </ul>
      </div>
  
      <div class="right-content" ref="foodsWrapper">
        <li class="food-type-container" v-for="(subFoods, index) in allFoods" :key="subFoods.id">
          <div class="food-type-title" :class="{selected: index === menuCurrentIndex}">{{subFoods.name}}</div>
          <food-item v-for="food in subFoods.foods" :key="food.id" :food="food" :type-index="index" 
          @change-food="changeFood($event, food, index)" @add-food="addFood(food, index)" 
          @remove-food="removeFood(food, index)" :mode="showMode" @show-detail="showDetail(food,index)">
          </food-item>
        </li>
      </div>
    </deal-content>
  
    <deal-footer>
      <shop-cart-bar :add-more="isAddMoreFood" :food-cost="tempShopCartFoodCost" :food-count="tempShopCartFoodCount" @go-shopcart="toShopCart"></shop-cart-bar>
    </deal-footer>
  
    <back-top></back-top>
  </div>
</template>
<script>
import { XButton } from 'vux'
import DealDialog from '@/components/DealDialog'
import DealHeader from '@/components/DealHeader'
import DealContent from '@/components/DealContent'
import DealFooter from '@/components/DealFooter'
import BackTop from '@/components/BackTop'
import FoodItem from '@/components/FoodItem'
import ShopCartBar from '@/components/ShopCartBar'

import { DealService, AlipayService, ShopCartService } from '@/http/index'
import { mapGetters } from 'vuex'

import { createSteps } from '@/util/index'
import storage from '@/util/storage'


export default {
  name: 'DealMenu',
  components: {
    DealDialog,
    DealHeader,
    DealContent,
    DealFooter,
    FoodItem,
    ShopCartBar,
    BackTop,
    XButton
  },
  data() {
    return {
      showMenu: false,// 是否显示左上角的menu
      listHeight: [],// 菜单右边菜品子列表的高度
      foodsScrollY: 0,// 菜单右边滚动区的 滚动y轴偏差
      menuCurrentIndex: 0,// 菜单左边 当前选中索引,
      totalConsumer: 100, // 会员门槛金额
      ratio: 0.8, // 快满会员金额 比率
      hasPromptAlmostVip: false, // 是否已经提示 快满会员
      hasPromptVip: false // 是否已经提示 可以成为会员
    }
  },
  computed: {
    ...mapGetters([
      'allFoods',
      'tempShopCartFoodCount',
      'tempShopCartFoodCost',
      'isAddMoreFood',
      'shopCart',
      'showMode'
    ])
  },
  watch: {
    foodsScrollY(v) {
      for (let i = 0, l = this.listHeight.length; i < l; i++) {
        let topHeight = this.listHeight[i]
        let bottomHeight = this.listHeight[i + 1]
        if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
          this.menuCurrentIndex = i
          return
        }
      }
      this.menuCurrentIndex = 0
    },
    'tempShopCartFoodCost': function (val, oldVal) {
      if (!this.hasPromptAlmostVip && val > this.totalConsumer * this.ratio) {
        this.hasPromptAlmostVip = true
        const text = `还差${(this.totalConsumer - val).toFixed(2)}元可成为会员, 享受会员价 : )`

        this.$vux.alert.show({
          title: '提示',
          content: text,
          buttonText: '我知道了'
        })
      }

      if (!this.hasPromptVip && val >= this.totalConsumer) {
        this.hasPromptVip = true
        const text = `消费已满${this.totalConsumer}元, 可晋升为会员`

        this.$vux.alert.show({
          title: '提示',
          content: text,
          buttonText: '我知道了'
        })
      }
      
    },

  },
  methods: {
    addFood(food, typeIndex) {
      this.$store.dispatch('ADD_FOOD', { food, typeIndex })
    },
    showDetail(food, typeIndex) {
      this.$router.push({ name: 'FoodDetail' })
      this.$store.commit('SET_FOOD_DETAIL', { food, typeIndex })
    },

    removeFood(food, typeIndex) {
      this.$store.dispatch('REMOVE_FOOD', { food, typeIndex })
    },
    changeFood(ev, food, typeIndex) {
      console.log(ev, food, typeIndex)
    },
    choose(mode) {
      this.showMenu = false;
      this.$store.dispatch('SELECT_SHOW_MODE', mode)
    },
    show() {
      this.showMenu = !this.showMenu
    },
    toSearch() {
      this.$router.push({ name: 'Search' })
    },
    toShopCart() {
      // 如果临时购物车和购物车 都没有 则提示 还没有点菜
      if (this.tempShopCartFoodCost === 0 && this.shopCart.totalPrice === 0) {
        this.$vux.alert.show({
          title: '提示',
          content: '购物车还是空的呢 : )',
          buttonText: '我知道了'
        })
      } else {
        // 如果是代售 则需先提供手机号码
        if (storage.has('consignee')) {
          if (storage.has('phoneNumber')) {
            this.$store.dispatch('ADD_SHOP_CART')
          } else {
            this.$router.push({name: 'PhoneVerify'})
          }
        } else {
          this.$store.dispatch('ADD_SHOP_CART')
        }
        
      }
    },
    selectFoodType(foodType, index) {
      this.menuCurrentIndex = index
      this._scrollFoods(index)
    },
    _scrollFoods(index) {
      // clearInterval(this._timer)
      // const steps = createSteps(this.foodsScrollY, this.listHeight[index], 10)

      // this._timer = setInterval(() => {
      //   const step = steps.shift()
      //   if (steps.length === 0) {
      //     clearInterval(this._timer)
      //   }
      //   window.scrollTo(0, step)
      // }, 1)

      window.scrollTo(0, this.listHeight[index])
    },
    _initAllFoods() {
      this.$store.dispatch('FETCH_ALL_FOODS')
        .then(_ => {
          this._initScroll()// 初始化scrollListener
          this._calcHeight()// 初始化不同品种菜列表 的高度
          this._initRectTop()// 初始化 菜品滚动区的视口top
        })
    },
    _initScroll() {
      document.addEventListener('scroll', this._scrollListener)
    },
    _destroyScroll() {
      document.removeEventListener('scroll', this._scrollListener)
    },
    _scrollListener() {
      const rect = this.$refs.foodsWrapper.getBoundingClientRect()
      const scrollY = -(rect.top - this._rectTop)
      this.foodsScrollY = scrollY
    },
    _calcHeight() {
      const foodsList = this.$refs.foodsWrapper.querySelectorAll('.food-type-container')
      let height = 0
      this.listHeight.push(height)
      for (let list of foodsList) {
        height += list.offsetHeight
        this.listHeight.push(height)
      }
    },
    _initRectTop() {
      this._rectTop = this.$refs.foodsWrapper.getBoundingClientRect().top
    }
  },
  mounted() {
    this._initAllFoods()
  },
  beforeDestroy() {
    this._destroyScroll()
  }
}
</script>
<style lang="scss" scoped>
// @import 'style/main.scss';

.deal-menu-container {
  height: 100%;
  // background-color: $main;
  .deal-dialog-container.menu-dialog {

    .deal-dialog {
      position: fixed;
      top: 40px;
      left: 0;
      width: 200px;
      transform: none;
      color: #313131;
      background-color: #fff;
      transition: all .3s ease;
      z-index: 5000;

      .menu-item {
        margin: 5px;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:first-child {
          border-bottom: 1px solid #715151;
        }
        .text {
          margin-left: 15px;
        }
      }
    }
  }

  .deal-header-container {
    .menu {
      width: 44px;
    }
    .search {
      width: 44px;
    }
  }

  .deal-content-container {
    .left-tab {
      position: fixed;
      top: 40px;
      left: 0;
      bottom: 40px;
      width: 80px;
      border-right: 1px solid #aaa;
      overflow: overlay;

      .dish-type-container {
        position: relative;
        .dish-type {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 45px;
          font-size: .9rem;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid #aaa;
          text-align: center;
          cursor: pointer;

          .food-count {
            position: absolute;
            left: 54px;
            top: 7px;
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 14px;
            padding: 1px 0;
            color: #111;
            background-color: #86b201;
            text-align: center;
            border-radius: 50%;
            font-size: 12px;
            width: 18px;
            height: 18px;
          }

          &.selected {
            color: #86b201;
          }
        }
      }
    }

    .right-content {
      position: absolute;
      left: 80px;
      width: calc(100% - 100px);
      padding: 0 10px 40px 10px;

      .food-type-container {
        text-align: left;
        border-bottom: 10px solid #c9d6a2;
        .food-type-title {
          display: flex;
          align-items: center;
          background-color: #f2f2f2;
          height: 30px;
          padding-left: 5px;
        }

        .selected {
          font-weight: 600;
        }
      }
    }
  }

  .deal-footer-container {
    background-color: black;
  }
}
</style>


