<template>
  <iframe :src="src"></iframe>
</template>

<script>
export default {
  name: 'Alipay',
  computed: {
    src() {
      return this.$store.state.deal.alipayUrl
    }
  }
}
</script>
<style lang="scss" scoped>
iframe {
  border: none;
  width: 100%;
  height: 100%;
}
</style>



