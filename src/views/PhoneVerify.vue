<template>
  <div class="phone-verify-container">
    <deal-header title="验证手机号码">
  
    </deal-header>
  
    <deal-content>
      <div class="form-content">
        <div class="phone-input">
          <x-input title="手机号码" ref="phoneNumber" v-model="phoneNumber" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        </div>
        <div class="verify-input">

  
          <x-input title="验证码" class="weui-vcode" v-model="verifyCode">
            <x-button slot="right" type="primary" mini @click.native="fetchCode" :disabled="disabled" style="width: 100px;">{{btnText}}</x-button>
          </x-input>
        </div>
      </div>
    </deal-content>
  
    <deal-footer>
      <x-button type="primary" @click.native="ensure" class="button">确认</x-button>
    </deal-footer>
  
    <deal-dialog v-model="showDialog">
      <div class="content">{{errorMsg}}</div>
      <div class="btn-group">
        <span class="ok" @click="ensureFail">我知道了</span>
      </div>
    </deal-dialog>
  </div>
</template>
<script>
import { XButton, XInput } from 'vux'
import DealHeader from '@/components/DealHeader'
import DealContent from '@/components/DealContent'
import DealFooter from '@/components/DealFooter'

import DealDialog from '@/components/DealDialog'

import storage from '@/util/storage'

export default {
  name: 'PhoneVerify',
  components: {
    'deal-header': DealHeader,
    'deal-content': DealContent,
    'deal-footer': DealFooter,
    'deal-dialog': DealDialog,
    XButton,
    XInput
  },
  data() {
    return {
      phoneNumber: '',
      verifyCode: '',
      showDialog: false,
      disabled: false,
      btnText: '发送验证码',
      restSeconds: 60,
      timeId: null,
      errorMsg: '',
    }
  },
  methods: {
    ensure() {
      debugger
      if (this.phoneNumber && this.verifyCode && this.$refs.phoneNumber.valid) {
        this.$store.dispatch('VERIFY_SMS_CODE', {
          phoneNumber: this.phoneNumber,
          verifyCode: this.verifyCode
        })
          .then(data => {
            if (data.result === 'success') {
              storage.set('phoneNumber', this.phoneNumber)
              this.$router.push({ name: 'PeopleNumber' })
            } else if (data.result === '验证码不正确') {
              this.showDialog = true
              this.errorMsg = '验证码输入错误, 请重新输入验证码。'
            } else if (data.result === '验证码已超时') {
              this.showDialog = true
              this.errorMsg = '验证码超时, 请重新输入验证码。'
            } else {
              this.showDialog = true
              this.errorMsg = '验证码未知错误, 请重新输入验证码。'
            }
          })
      }
    },
    fetchCode() {
      if (this.phoneNumber && this.$refs.phoneNumber.valid) {
        this.disabled = true

        this.timeId = window.setInterval(() => {
          this.restSeconds -= 1
          this.btnText = `${this.restSeconds} 秒`

          if (this.restSeconds === 0) {
            window.clearInterval(this.timeId)
            this.btnText = '发送验证码'
            this.disabled = false
            this.restSeconds = 60
          }
        }, 1e3)

        this.$store.dispatch('FETCH_SMS_CODE', this.phoneNumber)
          .then(reason => {
            if (reason !== '') {
              this.showDialog = true
              this.errorMsg = reason
            }
          })
      }
    },
    ensureFail() {
      this.showDialog = false
      this.verifyCode = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.phone-verify-container {
  height: 100%;
  .deal-header-container {}

  .deal-content-container {
    padding: 10px;
    background-color: #eee;
    overflow: auto;

    .form-content {
      .phone-input {
        border-radius: 5px;
        background-color: #fff;

        input {
          width: 100%;
        }
      }

      .verify-input {
        margin-top: 20px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        background-color: white;
      }

      input {
        padding: 3px 10px;
        line-height: 2;
        box-sizing: border-box;
        transition: border-color .5s ease-out;
      }
    }
  }

  .deal-footer-container {
    .button {
      height: 100%;
    }
  }

  .deal-dialog-container {
    .deal-dialog {
      .content {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .btn-group {
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .ok {
          flex: 1;
          color: #86b201;
        }
      }
    }
  }
}
</style>


