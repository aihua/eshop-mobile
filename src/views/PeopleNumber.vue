<template>
  <div class="people-number-container">
    <deal-header title="选择就餐人数">
      <span class="people-number-title" slot="left">
        <i class="icon-back" @click="$router.back()"></i>
      </span>
    </deal-header>
  
    <deal-content>
      <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <div v-if="showContent" class="people-number-content">
          <div class="first-line">
            <div class="number" @click="chooseNumber(1)">
              <div class="text">
                <span>1</span>
              </div>
            </div>
            <div class="number" @click="chooseNumber(2)">
              <div class="text">
                <span>2</span>
              </div>
            </div>
            <div class="number" @click="chooseNumber(3)">
              <div class="text">
                <span>3</span>
              </div>
            </div>
          </div>
          <div class="second-line">
            <div class="number" @click="chooseNumber(4)">
              <div class="text">
                <span>4</span>
              </div>
            </div>
            <div class="number" @click="chooseNumber(5)">
              <div class="text">
                <span>5</span>
              </div>
            </div>
            <div class="number" @click="chooseNumber(6)">
              <div class="text">
                <span>6</span>
              </div>
            </div>
          </div>
          <div class="third-line">
            <div class="number" @click="chooseNumber(7)">
              <div class="text">
                <span>7</span>
              </div>
            </div>
            <div class="number" @click="chooseNumber(8)">
              <div class="text">
                <span>8</span>
              </div>
            </div>
            <div class="number" @click="chooseNumber(9)">
              <div class="text">
                <span>9</span>
              </div>
            </div>
          </div>
          <div class="forth-line">
            <div class="number" @click="chooseNumber(10)">
              <div class="text">
                <span>10</span>
              </div>
            </div>
            <div class="number" @click="chooseNumber(11)">
              <div class="text">
                <span>11</span>
              </div>
            </div>
            <div class="number" @click="chooseNumber(12)">
              <div class="text">
                <span>12</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
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
  name: 'PeopleNumber',
  components: {
    'deal-header': DealHeader,
    'deal-content': DealContent,
    'deal-footer': DealFooter,
  },
  data() {
    return {
      showContent: false
    }
  },
  methods: {
    chooseNumber(number) {
      // 发送 就餐人数请求 
      this.$store.dispatch('CHOOSE_PEOPLE_NUMBER', number)
    }
  },
  created() {
  },
  mounted() {
    window.setTimeout(() => {
      this.showContent = true
    }, 0)
  }
}
</script>
<style lang="scss" scoped>
.people-number-container {
  height: 100%;
  background-color: #eee;
  .deal-header-container {}

  .deal-content-container {
    padding: 10px;

    .people-number-content {

      .first-line,
      .second-line,
      .third-line,
      .forth-line {
        display: flex;
        margin-top: 15px;
        height: 33vw;

        .number {
          flex: 1;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;

          .text {
            position: relative;
            width: 80%; // height: 80px;
            box-shadow: 3px 3px 3px #aaa;
            height: 0;
            padding-bottom: 80%;
            border-radius: 50%;
            background-color: #86b201;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;

            font-size: 2rem;

            span {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%)
            }
          }
        }
      }
    }
  }
}
</style>


