<template>
  <div class="order-failed-container">
    <deal-header title="下单失败">
  
    </deal-header>
  
    <deal-content>
      <div class="tip">
        <i class="icon-fail"></i>
        <span class="text">抱歉, 由于服务器原因, 下单失败了, 请重新下单</span>
      </div>
    </deal-content>
  
    <deal-footer>
      <div class="comment" @click="reAddOrder()">
        <i class="icon-comment"></i>
        <span class="text">重新下单</span>
      </div>
    </deal-footer>
  </div>
</template>
<script>
import DealHeader from '@/components/DealHeader'
import DealContent from '@/components/DealContent'
import DealFooter from '@/components/DealFooter'

export default {
  name: 'OrderSuccess',
  components: {
    'deal-header': DealHeader,
    'deal-content': DealContent,
    'deal-footer': DealFooter,
  },
  data() {
    return {
      
    }
  },
  methods: {
    reAddOrder() {
      this.$store.dispatch('ADD_ORDER')
    }
  }
}
</script>
<style lang="scss" scoped>
.order-failed-container {
  height: 100%;
  .deal-header-container {}

  .deal-content-container {
    padding: 10px;
    background-color: #eee;

    .tip {
      margin-top: 25px;
      display: flex;
      flex-direction: column;
      font-size: 1rem;

      i {
        color: red;
        transform: scale(2);
      }

      .text {
        margin-top: 20px;
      }
    }
  }

  .deal-footer-container {
    .comment {
      flex: 1;
    }
  }

}
</style>


