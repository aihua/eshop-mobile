<template>
  <div class="shopcart-bar-container">
    <div class="left-area">
      <span>{{addMore ? '新增' : ''}}菜品</span>
      <div class="food-count">{{foodCount}}</div>
      <i class="icon-money"></i>
      <span>{{foodCost}}</span>
    </div>
    <div class="right-area">
      <x-button class="btn" type="primary" @click.native="toShopCart">购物车</x-button>
    </div>
  </div>
</template>
<script>
import { XButton } from 'vux'
export default {
  name: 'ShopCartBar',
  components: {
    XButton
  },
  props: {
    addMore: {
      type: Boolean,
      default: false
    },
    foodCount: {
      type: Number
    },
    foodCost: {
      type: Number
    }
  },
  methods: {
    toShopCart() {
      this.$emit('go-shopcart')
    }
  }
}
</script>
<style lang="scss" scoped>
.shopcart-bar-container {
  width: 100%;
  display: flex;
  
  .left-area {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .food-count {
      position: absolute;
      left: 26%;
      top: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 14px;
      padding: 1px 0;
      background-color: #da4553;
      text-align: center;
      border-radius: 50%;
      font-size: 12px;
      width: 18px;
      height: 18px;
    }
  }

  .right-area {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
      width: 80%;
    }
  }
}
</style>
