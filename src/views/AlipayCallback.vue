<template>
  <div class="alipay-callback-container">
    <deal-header title="结账单">
    </deal-header>
  
    <deal-content>
      <div class="bill-content">
        <div class="bill-header">
          <div class="bill-inner-header">
            <div class="block"></div>
          </div>
        </div>
  
        <div class="bill-detail">
          <div class="tenant-name">{{tenantName}}</div>
          <div class="bill-abstract">
            <div class="table-info">
              <div class="table-number">
                <span>桌号：</span>
                <span>{{orderDetail.tableId}}</span>
              </div>
              <div class="people-number">
                <span>人数：</span>
                <span>{{orderDetail.diners_num}}人</span>
              </div>
            </div>
  
            <div class="ordering-time">
              <span>下单时间：</span>
              <span>{{orderDetail.time | time}}</span>
            </div>
            <div class="pay-time">
              <span>支付时间：</span>
              <span>{{payTime | time}}</span>
            </div>
          </div>
  
          <div class="money-info">
            <div class="bill-money">
              <span>账单金额：</span>
              <span class="text">{{orderDetail.totalPrice}}</span>
            </div>
            <div class="bill-mode">
              <span>支付宝：</span>
              <span class="text">{{orderDetail.totalPrice}}</span>
            </div>
          </div>
  
          <div class="order-detail">
            <div class="order-title">
              <span>账单详情</span>
            </div>
            <div class="order-item" v-for="item in orderDetail.foods">
              <span>{{item.name}}</span>
              <span>x {{item.num}}</span>
              <span>{{item.price}}元/份</span>
            </div>
            <div class="order-total">
              <span>总计</span>
              <span>{{orderDetail.totalPrice}}元</span>
            </div>
          </div>
  
          <div class="welcome">
            <span>谢谢光临</span>
          </div>
        </div>
      </div>
    </deal-content>
  </div>
</template>
<script>
import DealHeader from '@/components/DealHeader'
import DealContent from '@/components/DealContent'
import DealFooter from '@/components/DealFooter'

import { objFrom } from '@/util/index'
import { mapGetters } from 'vuex'
import storage from '@/util/storage'
export default {
  name: 'AlipayCallback',
  components: {
    'deal-header': DealHeader,
    'deal-content': DealContent,
    'deal-footer': DealFooter,
  },
  computed: {
    ...mapGetters(['orderDetail'])
  },
  filters: {
    // 格式化后台返回下单时间 只显示时间部分
    time(v) {
      return v && v.split(' ')[1]
    }
  },
  data() {
    return {
      payTime: '',
      tenantName: ''
    }
  },
  created() {
    this.tenantName = storage.get('tenantName')
    const obj = objFrom(decodeURIComponent(location.search))
    this.payTime = obj.timestamp

    this.$store.dispatch('FETCH_ORDER', obj.out_trade_no)
  }
}
</script>
<style lang="scss" scoped>
.alipay-callback-container {
  height: 100%;
  background-color: #eee;
  .deal-header-container {
    
  }

  .deal-content-container {
    padding: 10px;
    background-color: #eee;

    .bill-content {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
      background-color: #eee;
      color: #888;
      .bill-header {
        width: 90%;
        height: 30px;
        background-color: white;
        border-radius: 35px;
        display: flex;
        justify-content: center;
        align-items: center;

        .bill-inner-header {
          width: 90%;
          height: 15px;
          background-color: #96a596;
          border-radius: 35px;
          display: flex;
          justify-content: center;
          align-items: center;

          .block {
            width: 95%;
            height: 3px;
            background-color: #000;
          }
        }
      }

      .bill-detail {
        background-color: white;
        width: 80%;

        .tenant-name {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 60px;
          font-size: 1.3rem;
        }

        .bill-abstract {
          padding: 0 10px;
          font-size: 1.1rem;
          padding-bottom: 20px;
          border-bottom: 1px solid #999;
          .table-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
          }

          .ordering-time,
          .pay-time {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 30px;
          }
        }

        .money-info {
          padding: 0 10px;
          border-bottom: 1px solid #999;
          .bill-money,
          .bill-mode {
            height: 40px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }

          .bill-money {
            .text {
              color: #86b201;
            }
          }
        }

        .order-detail {
          padding: 0 10px;
          .order-title,
          .order-item,
          .order-total {
            height: 50px;
            display: flex;
            border-bottom: 1px solid #999;
            align-items: center;
          }

          .order-title {
            justify-content: flex-start;
          }

          .order-item {
            justify-content: space-between;
          }

          .order-total {
            justify-content: space-between;
          }
        }

        .welcome {
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
        }
      }
    }
  }
}
</style>


