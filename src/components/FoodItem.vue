<template>
  <li class="food-item">
    <div v-if="mode === 'picMode'" class="food-img">
      <img class="img" :src="food.image" alt="">
    </div>

    <div class="food-info" @click="showDetails" >
      <div class="title">{{food.name}}</div>
      <div class="favorite">
        <i class="icon-like"></i>
        <span class="text">{{food.sellCount}}</span>
      </div>
      <div class="price">
        <i class="icon-money"></i>
        <span class="normal-price">{{food.price}}/{{food.unit}}</span>

        <span class="vip-text">会员:</span>
        <span class="vip-price">{{food.vipPrice}}/{{food.unit}}</span>
      </div>
    </div>
    <div class="food-action" v-if="food.unit === '份'">
      <span class="sub">
        <i class="icon-sub" v-show="foodCount > 0" @click="removeFood"></i>
      </span>
      <span class="food-count">
        {{foodCount > 0 ? foodCount : ''}}
      </span>
      <span class="plus">
        <i class="icon-plus" @click="addFood"></i>
      </span>
    </div>
    <div class="food-action" v-else>
      <span v-if="hasChoose">已点</span>
      <span v-else>请点击选择斤数/口味</span>
    </div>

  </li>
</template>
<script>
import DealDialog from '@/components/DealDialog'
export default {
  name: 'FoodItem',
  components:{
    'deal-dialog' : DealDialog
  },
  data(){
      return{
          showModal:false,
      }
  },
  props: {
    food: {
      type: Object,
      required: true
    },
    mode: {
      type: String
    },
    typeIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    foodCount() {
      if (this.$store.state.deal.tempShopCart[this.food.id]) {
        return this.$store.state.deal.tempShopCart[this.food.id].num
      }
      return 0
    },
    hasChoose() {
      return !!this.$store.state.deal.tempShopCart[this.food.id]
    }
  },
  methods: {
    removeFood() {
      this.$emit('remove-food')
    },
    addFood() {
      this.$emit('add-food')
    },
    showDetails() {
      this.$emit('show-detail')
    },
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
.food-item {
  display: flex;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #aaa;

  .food-img {
    flex: 1;
    background: url(../assets/images/default.jpg);
    background-size: 100% 100%;

    .img {
      width: 100%;
      height: 100%;
    }
  }

  .food-info {
    flex: 3;
    /*margin-left: 5px;*/
    .title,
    .favorite,
    .price {
      margin-top: 5px;
      margin-left:5px;
    }
    .title{
      text-align:left;
    }
    .price{
      margin-bottom:5px;
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
      .vip-text {
        margin-left: 10px;
        color: red;
      }
      .vip-price,
      .text
      {
        color: red;
      }
    }
  }

  .food-action {
    flex: 1;
    padding-top: 25px;
    display: flex;

    .sub,
    .food-count,
    .plus {
      flex: 1;
      display: flex;
	    justify-content: center;
    }

    .icon-plus, .icon-sub {
      color: #86b201;
    }

  }

  .addCart{
   position:absolute;
    right:10px;
    bottom:5px;
    button{
      background-color:#86b201;
      color:#fff;
      padding:0;
      border:0;
      width:80px;
      height:28px;
      font-size:12px;
      letter-spacing: 2px;
      border-radius:15px;
    }
  }
}
</style>


