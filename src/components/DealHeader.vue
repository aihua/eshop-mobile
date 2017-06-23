<template>
  <div class="deal-header-container">
    <header class="deal-header">
      <slot name="left">
        <span class="header-left">
          <i class="icon-back" @click="$router.back()"></i>
        </span>
      </slot>
      <span class="title">{{title}}</span>
      <slot name="right">
        <span class="header-right"></span>
      </slot>
    </header>
  </div>
</template>

<script>
export default {
  name: 'DealHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggelMenu() {
      this.showMenu = !this.showMenu
    },
    selectMode(mode) {
      this.showMenu = false
      this.$store.dispatch('selectedShowMode', mode)
    },
    show() {
      this.showMenu = true
    }
  }
}
</script>
<style lang="scss" scoped>
.deal-header-container {
  height: 40px;

  .deal-header {
    position: fixed;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    padding: 0 5px;
    box-shadow: 0 0 4px rgba(0, 0, 0, .25);
    z-index: 6;
    background-color: hsla(0, 0%, 100%, .95);
    transition: all .3s ease;
    display: flex;
    align-items: center;
    text-align: center;

    .title {
      flex: 1;
    }

    .header-left,
    .header-right {
       width: 40px;
    }
  }
}
</style>


