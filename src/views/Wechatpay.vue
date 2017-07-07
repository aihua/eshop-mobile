<template>
  <div class="wechat-callback-container">
    <deal-header title="结账单">
      <span class="empty" slot="left" style="width: 40px;">
      </span>
    </deal-header>
  
    <deal-content v-if="payEnd">
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
                <span>{{orderDetail.tableName}}</span>
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
              <span>微信：</span>
              <span class="text">{{orderDetail.totalPrice}}</span>
            </div>
          </div>
  
          <div class="order-detail">
            <div class="order-title">
              <span>账单详情</span>
            </div>
            <div class="order-item" v-for="item in orderDetail.foods" :key="item.$index">
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

import { WechatService } from '@/http/index'
import { objFrom } from '@/util/index'
import { mapGetters } from 'vuex'
import storage from '@/util/storage'
import fecha from 'fecha'

export default {
  name: 'WechatCallback',
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
      tenantName: '',
      payEnd: false,  // 是否支付完成
      payParams: null, // 请求支付参数
      tradeNo: null // 当前订单号
    }
  },

  methods: {
    invokePay() {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', this.payParams,
        (res) => {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            this.$store.dispatch('FETCH_ORDER', this.tradeNo)
              .then(() => {
                this.payEnd = true
              })
              .catch(err => {
                this.$vux.alert.show({
                  title: '提示',
                  content: '获取订单失败',
                  buttonText: '我知道了'
                })
              })
          }
          if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            this.$vux.alert.show({
              title: '提示',
              content: '支付取消',
              buttonText: '我知道了'
            })
          }
          if (res.err_msg === 'get_brand_wcpay_request:fail') {
            this.$vux.alert.show({
              title: '提示',
              content: '支付失败',
              buttonText: '我知道了'
            })
          }
        }
      )
    }
  },
  created() {
    this.tenantName = storage.get('tenantName')
    const obj = objFrom(decodeURIComponent(location.search))

    window.alert(JSON.stringify(obj))

    WechatService.getWechatPayParams(obj.code)
      .then(data => {
        this.tradeNo = data.trade_no
        data.timeStamp = data.timestamp
        this.payTime = fecha.format(new Date(data.timestamp * 1000), 'YYYY-MM-DD HH:mm:ss')
        delete data.timestamp
        delete data.trade_no
        this.payParams = data

        if (typeof WeixinJSBridge !== 'undefined') {
          this.invokePay()
        }
      })

    function onBridgeReady() {
      if (this.payParams) {
        this.invokePay()
      }

    }
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady.bind(this), false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady.bind(this))
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady.bind(this))
      }
    } else {
      onBridgeReady()
    }

    // {
    //       "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
    //       "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
    //       "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
    //       "package":"prepay_id=u802345jgfjsdfgsdg888",     
    //       "signType":"MD5",         //微信签名方式：     
    //       "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
    //   	}
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/main.scss';

.wechat-callback-container {
  height: 100%;
  background-color: #eee;
  .deal-header-container {}

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
              color: #1AAD19#1AAD19;
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






