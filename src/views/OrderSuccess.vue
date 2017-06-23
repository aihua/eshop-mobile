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
        <div class="item" v-for="item in orderDetail.foods" :key="item.id">
          <div class="name">{{item.name}}</div>
  
          <div class="money">
            <span class="price">{{item.price}}元/{{item.unit}}</span>
            <span v-if="item.unit === '斤'" class="food-remark">{{item.remark}}</span>
            <span class="count">
              <span>x</span>
              <span>{{item.num}}</span>
            </span>
          </div>
        </div>
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

    <toast v-model="showPrompt" type="text" width="15em">e代售提醒您请先买单, 谢谢！</toast>
  </div>
</template>
<script>
import { Toast } from 'vux'
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
    Toast
  },
  computed: {
    ...mapGetters(['orderDetail'])
  },
  data() {
    return {
      showPrompt: false
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
    toPay() {
      const self = this
      const durationFromOrdering = Date.now() - new Date(this.orderDetail.time).getTime()
      const twoMinutes = 2 * 60 * 1000
      if (storage.get('consignee')) {
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
  mounted() {
    if (storage.get('consignee')) {
      this.showPrompt = true
    }
    this.$store.dispatch('FETCH_ORDER')
  }
}
</script>
<style lang="scss" scoped>
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
        font-size: 1.1rem;
        line-height: 1.5rem;
        color: #999;
        letter-spacing: 1px;
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
          color: #86b201;
        }
      }

      .item {
        margin-top: 2px;
        height: 100px;
        background-color: #fff;

        .name {
          height: 50px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-left: 30px;
        }

        .money {
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: 30px;
          margin-right: 30px;

          .price {
            flex: 1;
          }
          .food-remark {
            flex: 2;
            text-overflow: ellipsis;
          }
          .count {
            flex: 1;
            transform: scale(1.3);
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


