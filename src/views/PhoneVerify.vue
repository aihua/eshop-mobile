<template>
  <div class="phone-verify-container">
    <deal-header title="验证手机号码">
  
    </deal-header>

    <deal-content>
      <div class="form-content">
        <div class="phone-input">
          <input type="number" :class="{'invalid': isInvalidPhone}" placeholder="请输入手机号码" v-model="phoneNumber">
        </div>
        <div class="verify-input">
          <input type="number" placeholder="请输入验证码" v-model="verifyCode">
          <button @click="fetchCode">获取验证码</button>
        </div>
      </div>
    </deal-content>

    <deal-footer>
      <div class="ensure-btn" @click="ensure">确认</div>
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
    'deal-dialog': DealDialog
  },
  data() {
    return {
      phoneNumber: '',
      verifyCode: '',
      showDialog: false,
      errorMsg: ''
    }
  },
  computed: {
    isInvalidPhone() {
      return !this.phoneNumber
    }
  },
  methods: {
    ensure() {
      this.$store.dispatch('VERIFY_SMS_CODE', {
        phoneNumber: this.phoneNumber,
        verifyCode: this.verifyCode
      })
      .then(data => {
        if (data.result === 'success') {
          storage.set('phoneNumber', this.phoneNumber)
          this.$router.push({name: 'PeopleNumber'})
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
    },
    fetchCode() {
      if (!this.isInvalidPhone) {
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

          &.invalid {
            border-color: red;
          }
        }
      }

      .verify-input {
        margin-top: 20px;
        border-radius: 5px;
        display: flex;
	      justify-content: space-between;

        input {
          width: 60%;
        }

        button {
          border-radius: 2px;
          color: white;
          background-color: #86b201;
          padding: 2px 5px;
        }
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
    .ensure-btn {
      flex: 1;
      background-color: #86b201;
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


