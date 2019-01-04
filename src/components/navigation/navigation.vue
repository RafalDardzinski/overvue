<template>
  <ul class="navigation-list">
    <li v-for="(routeRecord, index) in filteredRoutes" :key="index">
      <router-link class="button-link" :to="routeRecord.path">{{ routeRecord.meta.navigationName }}</router-link>
    </li>
  </ul>  
</template>
<script>
export default {
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    filteredRoutes() {
      return this.filterRoutes(this.routes);
    }
  },
  methods: {
    filterRoutes(routesArray = [{}]) {
      return routesArray.filter(routeRecord => !!routeRecord.meta && !!routeRecord.meta.navigationName);
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
