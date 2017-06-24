<template>
  <div class="shop-comment-container">
    <deal-header title="餐厅评价">
    </deal-header>
  
    <deal-content>
      <div class="shop-rating">
        <div class="title">
          餐厅评分
        </div>
        <div class="item" v-for="item in items">
          <rating :title="item.title" v-model="item.rating"></rating>
        </div>
      </div>
      <div class="leave-message">
        <textarea class="text-area" v-model="text" placeholder="说两句话吧, 您的评价和建议, 将会为我们的改进, 提供很好的参考。"></textarea>
        <button class="btn" @click="commitComment">提交</button>
      </div>
    </deal-content>
  </div>
</template>
<script>
import DealHeader from '@/components/DealHeader'
import DealContent from '@/components/DealContent'
import DealFooter from '@/components/DealFooter'

import Rating from '@/components/Rating'
import storage from '@/util/storage' 

export default {
  name: 'ShopComment',
  components: {
    'deal-header': DealHeader,
    'deal-content': DealContent,
    'deal-footer': DealFooter,
    'rating': Rating
  },
  data() {
    return {
      text: '',
      items: [
        {
          title: '口味',
          value: 'tasteScore',
          rating: 4
        },
        {
          title: '服务',
          value: 'serviceScore',
          rating: 4
        },
        {
          title: '环境',
          value: 'environmentScore',
          rating: 4
        }
      ]
    }
  },
  methods: {
    commitComment() {
      const score = this.items.map(e => ({[e.value]: e.rating})).reduce((accu, curr) => {
        Object.assign(accu, curr)
        return accu
      }, {})
      const params = {
        userName: storage.get('phoneNumber'),
        text: this.text,
        tenantId: storage.get('tenantId'),
        ...score
      }

      this.$store.dispatch('COMMIT_COMMENT', params)
      .then(data => {
        console.log(data)
        this.$vux.toast.show({
          text: '感谢评论 : )',
          type: 'text',
        })
        window.setTimeout(() => {
          this.$router.push({ name: 'OrderSuccess' })
        }, 2e3)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.shop-comment-container {
  height: 100%;
  .deal-header-container {}

  .deal-content-container {
    padding: 10px;
    background-color: #eee;

    .shop-rating {
      background-color: #fff;
      height: 200px;
      color: #888;

      .title {
        height: 50px;
        margin: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .leave-message {
      margin-top: 20px;

      .text-area {
        width: 100%;
        height: 100px;
        padding: 10px;
        box-sizing: border-box;
      }

      .btn {
        width: 100%;
        height: 40px;
        color: #888;
        background-color: #fff;
        border: 2px solid #bbb;
      }
    }
  }
}
</style>


