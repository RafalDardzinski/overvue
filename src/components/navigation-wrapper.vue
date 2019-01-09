<template>
  <nav>
    <overvue-navigation
    :routes="routes"
    :sidebar-width="sidebarWidth"
    ></overvue-navigation>
  </nav>
</template>
<script>
import OvervueNavigation from '@/components/navigation/navigation.vue';
import routes from '@/config/routes';
export default {
  components: {
    'overvue-navigation': OvervueNavigation
  },
  props: {
    sidebarWidth: Number
  },
  data() {
    return {
      routes
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/config/colors.scss';
nav {
  background-color: rgba($main, .9);
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

</style>
