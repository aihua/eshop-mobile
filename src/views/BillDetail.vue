<template>
  <div class="bill-detail-container">
    <deal-header title="账单">
    </deal-header>
  
    <deal-content>
      <div class="bill-cost">
        <i class="icon-money"></i>
        <span class="text">{{orderDetail.totalPrice || orderDetail.totalVipPrice}}</span>
      </div>
      <div class="phone">
        <span>{{phoneNumber}}</span>
        <span class="text">已验证</span>
      </div>
      <div class="bill-detail">
        <div class="abstract">
          <span class="text">桌号: {{orderDetail.tableName}}</span>
          <span class="total-count">共 {{orderDetail.totalNum}} 份</span>
          <span class="total-cost">合计：
            <i class="icon-money"></i>
            <span>{{orderDetail.totalPrice || orderDetail.totalVipPrice}}</span>
          </span>
        </div>
        <div class="item" v-for="item in orderDetail.foods" :key="item.id">
          <div class="name">{{item.name}}</div>
  
          <div class="money">
            <span class="price">{{item.price}}元/{{item.unit}}</span>
            <span class="count">
              <span>x</span>
              <span>{{item.num}}</span>
            </span>
          </div>
        </div>
  
      </div>
    </deal-content>
  
    <deal-footer>
      <div class="ensure-btn" @click="ensure">
        <i class="icon-money"></i>
        <span>确认买单</span>
      </div>
    </deal-footer>
  
    <div class="deal-mask" v-show="showIframe"></div>
  </div>
</template>
<script>
import DealHeader from '@/components/DealHeader'
import DealContent from '@/components/DealContent'
import DealFooter from '@/components/DealFooter'

import storage from '@/util/storage'
import { mapGetters } from 'vuex'

export default {
  name: 'PhoneVerify',
  components: {
    DealHeader,
    DealContent,
    DealFooter,
  },
  data() {
    return {
    }
  },
  computed: {

    phoneNumber() {
      return storage.get('phoneNumber')
    },
    ...mapGetters(['orderDetail', 'showIframe'])
  },
  methods: {
    ensure() {
      const ua = navigator.userAgent;
      const match = ua.match(/micromessenger\/(\d)/i)
      if (match) {
        if (Number(match[1]) >= 5) { // 微信版本大于等于5 才支持支付功能
          this.$store.dispatch('FETCH_WECHATPAY_URL')
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: '您的微信版本过低, 不支持支付功能, 请升级微信版本 :-)',
            buttonText: '我知道了'
          })
        }
      } else if (ua.indexOf('AlipayClient') >= 0) {
        this.$store.dispatch('FETCH_ALIPAY_URL')
      } else {
        // this.$vux.alert.show({
        //   title: '提示',
        //   content: '请选择微信或支付宝扫描支付 :-)',
        //   buttonText: '我知道了'
        // })

        this.$store.dispatch('FETCH_ALIPAY_URL')
      }

    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/main.scss';

.bill-detail-container {
  height: 100%;
  .deal-header-container {
  }

  .deal-content-container {
    padding: 10px;
    background-color: #eee;
    overflow: auto;

    .bill-cost {
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;

      i {
        transform: scale(1.5);
      }

      .text {
        margin-left: 10px;
      }
    }

    .phone {
      height: 40px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      .text {
        color: #1AAD19;
      }
    }

    .bill-detail {
      margin-top: 10px;
      color: #888;

      .abstract {
        height: 50px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;

        .total-cost {
          color: #1AAD19;
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

          .count {
            transform: scale(1.3);
          }
        }
      }
    }
  }

  .deal-footer-container {
    .ensure-btn {
      flex: 1;
      background-color: #1AAD19;
    }
  }

  iframe {
    border: none;
    width: 100%;
    height: 80%;
    position: fixed;
    bottom: 0;
    transform: translateX(-50%);
    z-index: 2000;
  }

  .deal-mask {
    position: fixed;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  }
}
</style>


