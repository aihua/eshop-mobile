<template>
  <div class="people-number-container">
    <deal-header title="选择就餐人数">
    </deal-header>
  
    <deal-content>
      <transition enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
        <div v-if="showContent" class="people-number-content">
          <div class="line" v-for="subArr in numbers">
            <div class="number" v-for="item in subArr" @click="chooseNumber(item)">
              <div class="text">
                <span>{{item}}</span>
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
      showContent: false,
      numbers: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12]
      ]
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

      .line {
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


