<template>
  <ul class="navigation-list">
    <li class="home">
      <router-link to="/" ref="home">
        <overvue-logo

        :isLink="true"
        ></overvue-logo>
      </router-link>
    </li>
    <li v-for="(routeRecord, index) in filteredRoutes" :key="index">
      <router-link class="button-link" :to="routeRecord.path">{{ routeRecord.meta.navigationName }}</router-link>
    </li>
  </ul>  
</template>
<script>
import OvervueLogo from '@/components/logo.vue';
export default {
  components: {
    'overvue-logo': OvervueLogo
  },
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    filteredRoutes() {
      return this.filterRoutes(this.routes);
    },
  },
  methods: {
    filterRoutes(routesArray = [{}]) {
      return routesArray.filter(routeRecord => !!routeRecord.meta && !!routeRecord.meta.navigationName && routeRecord.path !== '/');
    }
  },
}
</script>
<style lang="scss" scoped>
.navigation-list {
  list-style: none;
  margin: 0;
  box-sizing: border-box;
  padding-left: .5rem;
  font-size: 1.2rem;
  position: relative;
}

li {
  box-sizing: border-box;
}

li.home {
  // text-align: center;
  display: flex;
  
  & * {
    flex: 1;
  }
}

</style>
