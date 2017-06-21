<template>
  <div class="deal-footer-container">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'DealFooter'
}
</script>
<style lang="scss" scoped>
.deal-footer-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 50px;
  height: 50px;
  // background-color: #24292c;
  color: #fff;
  text-align: center;
}
</style>


