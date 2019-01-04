<template>
  <nav>
    <overvue-navigation
    :routes="routes"
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
  data() {
    return {
      routes
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
