<template>
  <div class="ordering-container">
    <deal-header title="正在下单">
      <span class="empty" slot="left" style="width: 40px;">
      </span>
    </deal-header>
    
    <deal-content>
      <process-bar @end="end"></process-bar>
      <div class="text">
        订单正在飞向厨房, 客官请耐心等待 ：)
      </div>
    </deal-content>
  </div>
</template>
<script>
import DealHeader from '@/components/DealHeader'
import DealContent from '@/components/DealContent'
import ProcessBar from '@/components/ProcessBar'

import { mapGetters } from 'vuex'
export default {
  name: 'Ordering',
  components: {
    'deal-header': DealHeader,
    'deal-content': DealContent,
    'process-bar': ProcessBar
  },
  data() {
    return {
      animationEnd: false
    }
  },
  computed: {
    ...mapGetters(['orderingSuccess'])
  },
  watch: {
    orderingSuccess(v) {
      if (v && this.animationEnd) {
        this.$router.push({ name: 'OrderSuccess' })
      }
    }
  },
  methods: {
    end() {
      this.animationEnd = true
      if (this.orderingSuccess) {
        this.$router.push({ name: 'OrderSuccess' })
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.ordering-container {
  height: 100%;
  .deal-header-container {
    .placeholder {
      width: 44px;
    }
  }

  .deal-content-container {
    padding: 10px;
    background-color: #eee;

    .process-bar-container {
      margin: 50px 0;
    }
    .text {
      text-align: center;
      font-size: 1.2rem;
      color: #86b201;
    }
  }
}
</style>


