<template>
  <div class="home-container" :style="homeStyle">
    <footer class="footer">
      <router-link to="/deal-menu">
        <i class="icon-edit"></i>
        <div class="text">去点菜</div>
      </router-link>
      <router-link to="/shop-comment-view">
        <i class="icon-comment"></i>
        <div class="text">商家评价</div>
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
  data() {
    return {
      homeStyle: {}
    }
  },
  created() {
    document.title = storage.get('tenantName')
                                        
    if (storage.get('tenantId') === '68d473e77f459833bb06c60f9a8f4809') {
      this.homeStyle = {
        'background': `url(${require('../assets/images/xuehuabing-home.jpg')}) no-repeat`,
        'background-size': '100% 100%'
      }
    } else if (storage.get('tenantId') === '2cc4642a61354e4ed585390efce007f1') {
      this.homeStyle = {
        'background': `url(${require('../assets/images/lashangyin-home1.png')}) no-repeat`,
        'background-size': '100% 100%'
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (window.location.search) {
      const searchObj = objFrom(decodeURIComponent(window.location.search))
      store.commit('SET_QRCODE_INFO', searchObj)
    }
    // 从 首页进来 判断桌状态来路由到其他页面
    // 从 其他页面后退进来 不判断桌状态 让其直接进入home页
    if (from.path === '/') {
      next(vm => {
        store.dispatch('FETCH_TABLE_STATUS')
          .catch(err => {
            vm.$vux.alert.show({
              title: '提示',
              content: err.message,
              buttonText: '我知道了'
            })
          })
      })
    } else {
      next()
    }
  }
}
</script>
<style lang="scss" scoped>
.home-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  /*background: url(../assets/images/lashangyin-home1.png) no-repeat;
  background-size: 100% 93%;*/
}

.home-container .footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 5px 0;
  background-color: #f5f5f5;

  display: flex;
}

.home-container .footer a {
  display: inline-block;
  flex: 1;
  text-decoration: none;
  color: #282828;

  &:first-child {
    border-right: 1px solid black;
  }
  &:last-child {
    border-left: 1px solid black;
  }
}
</style>


