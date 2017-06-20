<template>
  <div class="home-container">
    <footer class="footer">
      <router-link to="/deal-menu">
        <i class="icon-edit"></i>
        <div class="text">去点菜</div>
      </router-link>
      <router-link to="/shop-comment-view">
        <i class="icon-pay"></i>
        <div class="text">商家评论({{shopComments.length}})</div>
      </router-link>
    </footer>
  </div>
</template>
<script>
import { objFrom } from '@/util/index'
import { mapGetters } from 'vuex'

import storage from '@/util/storage'
import store from '@/store/index'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['shopComments'])
  },
  created() {
  },
  beforeRouteEnter(to, from, next) {
    if (window.location.search) {
      const searchObj = objFrom(decodeURIComponent(window.location.search))
      store.commit('SET_QRCODE_INFO', searchObj)
      store.dispatch('FETCH_SHOP_COMMENT')
    }
    if (from.path === '/') {
      store.dispatch('FETCH_TABLE_STATUS')
    }
    next()
  }
}
</script>
<style scoped>
.home-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: url(../assets/images/lashangyin-home1.png) no-repeat;
  background-size: 100% 93%;
}

.home-container .footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 5px 0;
  background-color: #f5f5f5;
}

.home-container .footer a {
  display: inline-block;
  width: 48%;
  text-decoration: none;
  color: #282828;
}
</style>


