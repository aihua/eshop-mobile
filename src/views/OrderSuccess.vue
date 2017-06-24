<template>
  <div class="order-success-container">
    <deal-header title="下单成功">
      <span class="empty" slot="left" style="width: 40px;">
      </span>
    </deal-header>
  
    <deal-content>
      <div class="tip">
        <div class="line">
          <i class="icon-point"></i>
          <span>若退出, 再扫二维码, 即可加菜或买单</span>
        </div>
        <div class="line" v-if="canEditOrder">
          <div class="btn-group">
            <!--<div class="edit-btn">
              <x-button type="primary" @click.native="editOrder">修改</x-button>
            </div>-->
            <div class="cancel-btn" style="margin-left: 10px;">
              <x-button type="primary" @click.native="cancelOrder">取消</x-button>
            </div>
          </div>
          <div class="placeholder"></div>
        </div>
        <!--<div class="line">
                    <i class="icon-point"></i>
                    <span>加菜码为下单验证手机号的后四位哦</span>
                  </div>-->
      </div>
      <div class="order-info">
        <div class="table-number">
          <span style="margin-left: 20px;">台
            <span style="width: 30px; display:inline-block"></span>
            号：</span>
          <span>{{orderDetail.tableId}}</span>
        </div>
        <div class="order-time">
          <span>下单时间：</span>
          <span>{{orderDetail.time | time}}</span>
        </div>
      </div>
  
      <div class="order-detail">
        <div class="abstract">
          <span class="text">账单详情</span>
          <span class="total-count">份数: {{orderDetail.totalNum}}</span>
          <span class="total-cost" v-if="orderDetail.totalPrice">普通价：
            <i class="icon-money"></i>
            <span>{{orderDetail.totalPrice}}</span>
          </span>
          <span class="total-cost" v-if="orderDetail.totalVipPrice">会员价:
            <i class="icon-money"></i>
            <span>{{orderDetail.totalVipPrice}}</span>
            <span>已优惠 {{orderDetail.discount}}</span>
          </span>
        </div>
        <swipeout :disabled="true">
          <div v-for="item in orderDetail.foods" :key="item.id">
            <swipeout-item transition-mode="follow">
              <div slot="right-menu">
                <swipeout-button @click.native="deleteFood(item)" type="warn">删除</swipeout-button>
              </div>
              <div slot="content">
                <div class="order-item">
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
                        <x-number style="flex: 5;" v-if="isEditable" v-model="item.num" @on-change="changeFood(item)" :min="0.1" :step="0.1"></x-number>
                        <div v-else class="food-count">{{item.num}}</div>
                      </template>
                    </div>
                  </div>
                </div>
                <div class="food-remark" v-if="item.unit === '斤'" style="padding: 10px;">
                  <p>备注： {{item.remark}}</p>
                </div>
              </div>
            </swipeout-item>
          </div>
        </swipeout>
      </div>
    </deal-content>
  
    <deal-footer>
      <div class="comment" @click="toShopComment">
        <i class="icon-comment"></i>
        <span class="text">评价</span>
      </div>
  
      <div class="add-food" @click="addMoreFood">
        <i class="icon-food"></i>
        <span class="text">加菜</span>
      </div>
  
      <div class="pay" @click="toPay">
        <i class="icon-pay"></i>
        <span class="text">买单</span>
      </div>
  
      <div class="vip" @click="toVIPCard">
        <i class="icon-vip"></i>
        <span class="text">VIP</span>
      </div>
    </deal-footer>
  
    <toast v-model="showPrompt" type="text" width="15em" :time="7000">e代售提醒您先买单, 订单10分钟后失效, 谢谢！</toast>
  </div>
</template>
<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, Toast, XButton, XNumber } from 'vux'
import DealHeader from '@/components/DealHeader'
import DealContent from '@/components/DealContent'
import DealFooter from '@/components/DealFooter'

import { mapGetters } from 'vuex'
import storage from '@/util/storage'

export default {
  name: 'OrderSuccess',
  components: {
    DealHeader,
    DealContent,
    DealFooter,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Toast,
    XButton,
    XNumber
  },
  computed: {
    ...mapGetters(['orderDetail'])
  },
  data() {
    return {
      showPrompt: false,
      canEditOrder: false,
      isEditable: false
    }
  },
  filters: {
    // 格式化后台返回下单时间 只显示时间部分
    time(v) {
      return v && v.split(' ')[1]
    }
  },
  methods: {
    toShopComment() {
      this.$router.push({ name: 'ShopComment' })
    },
    addMoreFood() {
      this.$store.dispatch('ADD_MORE_FOOD')
    },
    editOrder() {
      this.isEditable = !this.isEditable
    },
    cancelOrder() {
      const self = this
      this.$vux.confirm.show({
        title: '提示',
        content: '确定取消订单?',
        onConfirm() {
          self.$store.dispatch('CANCEL_ORDER')
          .then(_ => {
            self.$router.push({ name: 'DealMenu' })
          })
          .catch(_ => {
            self.$router.push({ name: 'DealMenu' })
          })
        }
      })
    },
    changeFood(food) {
      this.$store.dispatch('ORDER_CHANGE_FOOD', food)
    },
    removeFood(food) {
      this.$store.dispatch('ORDER_REMOVE_FOOD', food)
    },
    deleteFood(food) {
      this.$store.dispatch('ORDER_DELETE_FOOD', food)
    },
    addFood(food) {
      this.$store.dispatch('ORDER_ADD_FOOD', food)
    },
    toPay() {
      const self = this
      const durationFromOrdering = Date.now() - new Date(this.orderDetail.time).getTime()
      const twoMinutes = 2 * 60 * 1000
      if (storage.has('consignee')) {
        this.$router.push({ name: 'BillDetail' })
      } else {
        if (durationFromOrdering < twoMinutes) {// 如果刚下单 提醒客户是否直接买单
          this.$vux.confirm.show({
            title: '提示',
            content: '是否用餐完毕, 现在去买单?',
            onConfirm() {
              self.$router.push({ name: 'BillDetail' })
            }
          })
        } else {
          this.$router.push({ name: 'BillDetail' })
        }
      }
    },
    toVIPCard() {
      this.$router.push({ name: 'VIPCard' })
    },
  },
  created() {
    if (storage.has('consignee')) {
      this.showPrompt = true
      this.canEditOrder = true
    }
    this.$store.dispatch('FETCH_ORDER')
    .catch(err => {
      this.$vux.alert.show({
        title: '提示',
        content: '获取订单失败',
        buttonText: '我知道了'
      })
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/main.scss';

.order-success-container {
  height: 100%;
  .deal-header-container {}

  .deal-content-container {
    padding: 10px;
    background-color: #eee;
    overflow: auto;

    .tip {
      margin-top: 5px;
      .line {
        margin-top: 10px;
        font-size: 1.1rem;
        line-height: 1.5rem;
        color: #999;
        letter-spacing: 1px;
        display: flex;

        .btn-group,
        .placeholder {
          flex: 1;
        }

        .btn-group {
          display: flex;
          .edit-btn,
          .cancel-btn {
            flex: 1;
          }
        }
      }
    }

    .order-info {
      width: 100%;
      height: 40px;
      margin-top: 10px;
      color: #999;
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;

      .table-number,
      .order-time {
        flex: 1;
      }

      .table-number {
        display: flex;
        justify-content: flex-start;
      }
    }



    .order-detail {
      margin-top: 10px;
      color: #888;

      .abstract {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        background-color: #fff;

        .total-cost {
          color: #1AAD19;
        }
      }

        
        .order-item {
          margin-top: 2px;
          height: 100px;
          background-color: #fff;
          height: 60px;
          display: flex;
          padding: 10px;
          background-color: #fff;
          border-radius: 5px;

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
                color: #1AAD19;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.3rem;
              }
            }
          }
        }
    }
  }

  .deal-footer-container {
    background-color: black;

    .comment,
    .add-food,
    .pay,
    .vip {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        margin-left: 5px;
      }
    }
  }
}
</style>


