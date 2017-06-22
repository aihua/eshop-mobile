<template>
  <div class="search-container">
    <deal-header title="Search">
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

  .search-area {

  }
}
</style>


