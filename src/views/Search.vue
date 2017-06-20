<template>
  <div class="search-container">
    <deal-header title="Search">
      <span class="back" slot="left">
        <i class="icon-back" @click="$router.back()"></i>
      </span>
    </deal-header>

    <div class="search-area"></div>
  </div>
</template>
<script>
import DealHeader from '@/components/DealHeader'
export default {
  name: 'Search',
  components: {
    'deal-header': DealHeader
  }
}
</script>
<style lang="scss" scoped>
.search-container {
  .back {
    width: 44px;
    transform: scale(.8);
  }

  .search-area {

  }
}
</style>


