<template>
  <div id="app">
    <loading v-show="loading"></loading>
    <transition :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from '@/components/Loading'
export default {
  name: 'app',
  components: {
    'loading': Loading
  },
  computed: {
    ...mapGetters([
      'enterActiveClass',
      'leaveActiveClass',
      'loading'
    ])
  },
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}

ul,
textarea {
  margin: 0;
  padding: 0;
  border: 0;
}

li {
  list-style: none;
}
</style>
