<template>
  <div class="shop-close-container">
    <deal-header title="店铺已打烊">
      <span class="empty" slot="left" style="width: 40px;"></span>
    </deal-header>
  
    <deal-content>
      <div class="img">
        <img src="../assets/images/shop-close-logo.jpg"/>
      </div>
    </deal-content>
  
  </div>
</template>
<script>
import DealHeader from '@/components/DealHeader'
import DealContent from '@/components/DealContent'


export default {
  name: 'ShopCloase',
  components: {
    DealHeader,
    DealContent,
  },
}
</script>
<style lang="scss" scoped>
.shop-close-container {
  height: 100%;
  .deal-header-container {
  }

  .deal-content-container {
    .img {
      display: flex;
      justify-content: center;
      align-content: center;
      img {
        height: 200px;
      }
    }
  }
}
</style>


