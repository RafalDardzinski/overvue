<template>
  <ul class="navigation-list" :style="[ { width: navigationListWidth } ]">
    <li v-for="(routeRecord, index) in filteredRoutes" :key="index">
      <router-link :to="routeRecord.path" :class="{ home: routeRecord.path === '/' }">
        <div v-if="routeRecord.path === '/'">
          <overvue-logo logo-width="50%" font-size="1.2rem"></overvue-logo>
        </div>
        <div v-else>{{ routeRecord.meta.navigationName }}</div>
      </router-link>
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
    },
    sidebarWidth: Number
  },
  computed: {
    filteredRoutes() {
      return this.filterRoutes(this.routes);
    },
    navigationListWidth() {
      if (this.sidebarWidth) return `${this.sidebarWidth + 17}px`;
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
@import '@/config/colors.scss';
.navigation-list {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: block;
  position: relative;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 2rem;
}

a {
  text-decoration: none;
  padding: .5rem;
  display: block;
  outline: 0;
}

.home {
  padding: 2rem;
  background-color: $success;
  border-bottom: 2px solid $light-accent;
  margin-bottom: .5rem;
  position: sticky;
  top: 0px;
}

a:not(.home) {
  color: rgba($light-shades, .7);
  font-weight: normal;
  border-left: 2px solid rgba($light-accent, 0);
  transition: border-color .2s, color .2s;

  &:hover {
    color: $light-shades;
  }
}

a.router-link-exact-active:not(.home) {
  color: rgba($light-shades, 1);
  font-weight: normal;
  border-color: rgba($light-accent, 1);
}



</style>
