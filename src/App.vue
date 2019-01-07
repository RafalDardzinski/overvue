<template>
  <div id="app" ref="app">
    <overvue-layout />
  </div>
</template>
<script>
import Layout from '@/layouts/fixed-sidebar.vue';
// import OvervueNavigationWrapper from '@/components/navigation-wrapper';
export default {
  components: {
    'overvue-layout': Layout,
  },
}
</script>

<style lang="scss">
@import '@/styles/typography.scss';
@import '@/styles/buttons.scss';

#app {
  color: #2c3e50;
}

</style>
