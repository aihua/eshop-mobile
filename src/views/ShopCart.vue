<template>
  <div class="shop-cart-container">
    <deal-header title="购物车">
      <span class="back" slot="left">
        <i class="icon-back" @click="$router.back()"></i>
      </span>
    </deal-header>
  
    <deal-content>
      <div class="table-info">
        <span class="table-number">桌号: {{shopCart.tableId}}</span>
        <span class="food-count">合计: {{shopCart.totalNum}}份</span>
        <span class="food-cost">
          <i class="icon-money"></i>
          <span>{{shopCart.totalPrice}}</span>
        </span>
      </div>
  
      <div class="order-list">
        <template v-if="shopCart.foods.length">
          <swipeout>
            <div v-for="item in shopCart.foods">
              <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                <div slot="right-menu">
                  <swipeout-button @click.native="deleteFood(item)" type="warn">删除</swipeout-button>
                </div>
  
                <div slot="content" class="order-item">
                  <div class="icon me" v-if="isMe(item.tableUser)">我</div>
                  <div class="icon" :class="['user-' + item.tableUserNumber]" v-else>{{item.tableUserNumber}}号</div>
                  <div class="item-detail">
                    <div class="food-name">{{item.name}}</div>
                    <div class="food-money">
                      <div class="food-price">{{item.price}} 元/{{item.unit}}</div>
                      <template v-if="item.unit === '份'">
                        <i v-if="isEditable" class="icon-sub" @click="removeFood(item)"></i>
                        <div class="food-count">{{item.num}}</div>
                        <i v-if="isEditable" class="icon-plus" @click="addFood(item)"></i>
                      </template>
                      <template v-else>
                        <x-number style="flex: 5;" v-if="isEditable" v-model="item.num" @on-change="changeFood(item)" :step="0.1"></x-number>
                        <div v-else class="food-count">{{item.num}}</div>
                      </template>
                    </div>
                  </div>
                </div>
              </swipeout-item>
            </div>
          </swipeout>
        </template>
        <template v-else>
          <div class="order-tip">
            <i class="icon icon-tip"></i>
            <span class="text">您还未点菜哟 ：)</span>
          </div>
        </template>
  
        <div class="remark">
          <textarea v-model="remark" rows="4" :placeholder="placeholder"></textarea>
        </div>
  
      </div>
    </deal-content>
  
    <deal-footer>
      <div class="left-area" @click="refreshOrder">
        <i class="icon-refresh"></i>
        <span class="text">刷新订单</span>
      </div>
      <div class="center-area" @click="editOrder">
        <i class="icon-pencil"></i>
        <span class="text">修改订单</span>
      </div>
      <div class="right-area" @click="ensureOrder">
        <i class="icon-order"></i>
        <span class="text">确认下单</span>
      </div>
    </deal-footer>

    
  </div>
</template>
<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, XNumber, Group } from 'vux'

import DealHeader from '@/components/DealHeader'
import DealContent from '@/components/DealContent'
import DealFooter from '@/components/DealFooter'
import storage from '@/util/storage'
import { mapGetters } from 'vuex'

export default {
  name: 'ShopCart',
  components: {
    DealHeader,
    DealContent,
    DealFooter,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XNumber,
    Group
  },
  data() {
    return {
      isEditable: false,
      remark: '',
      placeholder: '',
    }
  },
  computed: {
    ...mapGetters([
      'shopCart'
    ])
  },
  methods: {
    
    handleEvents(ev) {
      console.log(ev)
    },
    onButtonClick(s) {
      console.log(s)
    },
    isMe(tableUser) {
      return localStorage.getItem('tableUser') === tableUser
    },
    addMoreFood() {
      this.$store.dispatch('ADD_MORE_FOOD')
    },
    refreshOrder() {
      this.$store.dispatch('FETCH_SHOP_CART')
    },
    editOrder() {
      this.isEditable = !this.isEditable
    },
    ensureOrder() {
      const phoneNumber = storage.get('phoneNumber')

      this.$store.commit('SET_ORDER_REMARK', this.remark)
      if (phoneNumber) {
        this.$router.push({ name: 'PeopleNumber' })
      } else {
        this.$router.push({ name: 'PhoneVerify' })
      }
    },
    changeFood(food) {
      this.$store.dispatch('SHOP_CART_CHANGE_FOOD', food)
    },
    removeFood(food) {
      this.$store.dispatch('SHOP_CART_REMOVE_FOOD', food)
    },
    deleteFood(food) {
      this.$store.dispatch('SHOP_CART_DELETE_FOOD', food)
    },
    addFood(food) {
      this.$store.dispatch('SHOP_CART_ADD_FOOD', food)
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_SHOP_CART')

    
  },
  created() {
    if (storage.get('consignee')) {
      this.placeholder = '该订单为代售商品，如收货地址变更，请填写具体地址，默认为本二维码所在地址'
    } else {
      this.placeholder = '填写备注'
    }
  }
}
</script>
<style lang="scss" scoped>
.shop-cart-container {
  height: 100%;
  .deal-header-container {
    .add-more-food {
      .btn {
        position: absolute;
        left: 10px;
        top: 6px;
        padding: 3px 10px 2px 10px;
        color: #86b201;
        border: 1px solid #86b201;
        line-height: 20px;
        border-radius: 5px;
      }
    }
  }

  .deal-content-container {
    padding: 10px;
    background-color: #eee;

    .table-info {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      margin-top: 10px;
      background-color: #fff;
      text-align: center;
      border-radius: 5px;
      .table-number,
      .food-count,
      .food-cost {
        flex: 1;
      }

      .food-cost {
        color: #86b201;
      }
    }

    .remark {
      margin-top: 10px;

      textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 10px;
        display: flex;
        align-items: center;
      }
    }

    .order-list {
      margin-top: 10px;
      margin-bottom: 50px;
      .order-item {
        height: 60px;
        display: flex;
        padding: 10px;
        background-color: #fff;
        border-radius: 5px;
        .icon {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 1.2rem;
          height: 60px;
          border-radius: 10px;
        }

        .me {
          background-color: #dc5151;
        }

        .user-1 {
          background-color: #20A0FF;
        }

        .user-2 {
          background-color: #13CE66;
        }

        .user-3 {
          background-color: #F7BA2A;
        }

        .user-4 {
          background-color: #1F2D3D;
        }

        .user-5 {
          background-color: #99A9BF;
        }

        .item-detail {
          flex: 4;
          padding: 0 10px;

          .food-name {
            text-align: left;
          }

          .food-money {
            display: flex;
            margin-top: 14px;
            color: #c1d0be;
            height: 27px;

            .food-price {
              flex: 3;
            }
            .food-count {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .food-price {
              text-align: left;
            }

            i {
              flex: 2;
              color: #86b201;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }

      .order-item:not(:first-child) {
        margin-top: 1px;
      }

      .order-tip {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #86b201;
        background-color: #fff;
        height: 200px;
        border-radius: 5px;

        .icon {
          transform: scale(1.5)
        }
        .text {
          margin-left: 10px;
        }
      }
    }
  }

  .deal-footer-container {
    .left-area,
    .center-area,
    .right-area {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin-left: 10px;
      }
    }

    .left-area,
    .center-area {
      color: #fff;
      background-color: #000;
    }

    .right-area {
      color: #fff;
      background-color: #86b201;
    }
  }
}
</style>


