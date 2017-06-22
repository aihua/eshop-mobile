<template>
  <div class="shop-comment-view-container">
    <deal-header :title="title">
    </deal-header>
  
    <deal-content>
      <div class="total-ratings">
        <rating :title="totalTitle" v-model="totalRating"></rating>
      </div>
  
      <div class="ratings-list">
        <div class="title">
          <span>全部评价</span>
        </div>
  
        <div class="content">
          <template v-if="shopComments.length">
            <div class="rating-item" v-for="(comment, index) in shopComments">
              <div class="user-info">
                <div class="avatar">
                  <img width="40px" :src="comment.avatar">
                </div>
                <div class="phone">
                  {{comment.userName}}
                </div>
                <div class="rating">
                  <i class="icon-star" v-for="(item, index) in 5" :class="{'on': index <= comment.averageScore}"></i>
                </div>
                <div class="time">{{comment.createdAt | time}}</div>
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
          </template>
          <template v-else>
            <p>还没有商家评价呢 ：)</p>
          </template>

        </div>
      </div>
    </deal-content>
  </div>
</template>
<script>
import DealHeader from '@/components/DealHeader'
import DealContent from '@/components/DealContent'
import DealFooter from '@/components/DealFooter'
import Rating from '@/components/Rating'


import { mapGetters } from 'vuex'
import fecha from 'fecha'

export default {
  name: 'ShopCommentView',
  components: {
    'deal-header': DealHeader,
    'deal-content': DealContent,
    'deal-footer': DealFooter,
    'rating': Rating
  },
  computed: {
    ...mapGetters(['shopComments']),
    title() {
      return '餐厅评价(' + this.shopComments.length + ')'
    }
  },
  filters: {
    time(v) {
      const date = new Date(v)
      return fecha.format(date, 'YYYY-MM-DD')
    }
  },
  data() {
    return {
      totalTitle: '总体评价',
      totalRating: 4.4,
      selectedIndexes: []
    }
  },
  methods: {
    thumbsUp(index) {
      const i = this.selectedIndexes.indexOf(index)
      if (i >= 0) {
        this.selectedIndexes.splice(i, 1)
      } else {
        this.selectedIndexes.push(index)
      }
    }
  },
  created() {
    // 计算 totalRating
  }
}
</script>
<style lang="scss" scoped>
.shop-comment-view-container {
  height: 100%;
  .deal-header-container {}

  .deal-content-container {
    padding: 0 0 10px 0;
    background-color: #eee;

    .total-ratings {
      background-color: white;
    }

    .ratings-list {
      margin-top: 20px;
      background-color: white;
      padding: 0 10px;
      .title {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }

      .content {
        padding: 10px 0;

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
      }
    }
  }
}
</style>


