<template>
  <div class="food-detail">
    <div class="food-info">
      <div class="back-mark" @click="backMainPage">
        <i class="icon-back"></i>
      </div>
      <div>
        <img style="width:100%;height:300px;" :src="foodDetail.food.image" alt="">
      </div>
      <div class="title">{{foodDetail.food.name}}</div>
      <div class="favorite">
        <i class="icon-like"></i>
        <span class="text">{{foodDetail.food.sellCount}}</span>
      </div>
      <div class="price">
        <i class="icon-money"></i>
        <span class="normal-price">{{foodDetail.food.price}}/份</span>
  
        <span class="vip-text">会员:</span>
        <span class="vip-price">{{foodDetail.food.vipPrice}}/份</span>
      </div>
      <div class="addCart" @click="shoppingCart(foodDetail.food.id, foodDetail.typeIndex)">
        <button>加购物车</button>
      </div>
    </div>
    <div class="separate-lines">
    </div>
    <div class="food-comment">
      <h3>商品评价</h3>
  
      <div class="rating-item" v-for="(comment, index) in foodDetail.food.Ratings">
        <div class="user-info">
          <div class="avatar">
            <img width="40px" :src="comment.avatar">
          </div>
          <div class="phone">
            {{comment.username}}
          </div>
          <div class="time">{{comment.rateTime | time}}</div>
        </div>
  
        <div class="info">
          {{comment.text}}
        </div>
  
        <div class="actions">
          <div class="thumbs-up" @click="thumbsUp(index)">
            <i class="icon-Zambia" :class="{selected: selectedIndexes.indexOf(index) >= 0}"></i>
            <span>赞</span>
          </div>
        </div>
      </div>
  
      <div class="leave-message" v-if="hasPhoneNumber">
        <textarea class="text-area" v-model="text" placeholder="说两句话吧, 您的评价和建议, 将会为我们的改进, 提供很好的参考。"></textarea>
        <button class="btn" @click="commitComment">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import fecha from 'fecha'
import storage from '@/util/storage'

export default {
  data() {
    return {
      selectedIndexes: [],
      hasPhoneNumber: false,
      text: ''
    }
  },
  computed: {
    ...mapGetters(['foodDetail'])
  },
  created() {
    this.hasPhoneNumber = !!storage.get('phoneNumber')
  },
  filters: {
    time(v) {
      const date = new Date(v)
      return fecha.format(date, 'YYYY-MM-DD HH:mm')
    }
  },
  methods: {
    backMainPage() {
      this.$router.push('/deal-menu')
    },
    shoppingCart(foodId, typeId) {
      this.$store.dispatch('cartAdd', { foodId, typeId });
    },
    thumbsUp(index) {
      const i = this.selectedIndexes.indexOf(index)
      if (i >= 0) {
        this.selectedIndexes.splice(i, 1)
      } else {
        this.selectedIndexes.push(index)
      }
    },
    commitComment() {
      const params = {
        userName: storage.get('phoneNumber'),
        text: this.text,
        tenantId: storage.get('tenantId'),
        FoodId: this.foodDetail.food.id
      }
      this.$store.dispatch('COMMIT_FOOD_COMMENT', params)
      .then(_ => {
        this.text = ''
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.food-info {
  position: relative;
  .back-mark {
    position: absolute;
    width: 24px;
    height: 24px;
    line-height: 24px;
    /*border:1px solid #ccc;*/
    border-radius: 12px;
    background-color: rgba(153, 153, 153, 0.6);
    opacity: 0.5;
    top: 10px;
    left: 10px;
    text-align: center;
    .icon-back {
      color: #fff;
    }
  }
  .title,
  .favorite,
  .price {
    display: flex;
    margin-left: 5px;
    margin-top: 5px;
  }
  .favorite,
  .price {
    display: flex;
    align-items: center;

    .icon-like {
      color: #86b201;
    }
    .text {
      margin-left: 5px;
      color: #86b201;
    }
  }
  .price {
    .vip-text,
    .vip-price {
      color: #f00;
    }
    .vip-text {
      margin-left: 10px;
    }
  }
  .addCart {
    display: flex;
    position: absolute;
    right: 20px;
    bottom: -5px;
    button {
      background-color: #86b201;
      color: #fff;
      padding: 0;
      border: 0;
      width: 80px;
      height: 28px;
      font-size: 12px;
      letter-spacing: 2px;
      border-radius: 15px;
    }
  }
}

.separate-lines {
  margin-top: 15px;
  width: 100%;
  background-color: #efefef;
  height: 10px;
}

.food-comment {
  border-bottom: 1px solid #ddd;
  padding: 0 10px;
  h3 {
    text-align: left;
    margin-left: 10px;
    margin-top: 10px;
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .rating-item {
    margin-top: 5px;
    border-bottom: 1px solid #eee;

    .user-info {
      display: flex;
      justify-content: center;
      align-items: center;

      .avatar {
        width: 40px;
      }
      .phone,
      .rating,
      .time {
        flex: 1;
      }

      .icon-star {
        &.on {
          color: #86b201;
        }
      }
    }

    .info {
      padding-top: 10px;
      min-height: 50px;
      text-align: left;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      padding: 5px 0;

      .thumbs-up {
        width: 50px;
        height: 25px;
        border: 1px solid #999;
        border-radius: 5px;
        margin-right: 40px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 1rem;

        .selected {
          color: #86b201;
        }
      }
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
</style>
