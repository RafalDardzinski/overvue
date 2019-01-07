<template>
  <div class="layout" id="fixed-sidebar" ref="layout">
    <section class="sidebar">
      <overvue-navigation-wrapper></overvue-navigation-wrapper>
    </section>
    <section class="view">
      <router-view/>
    </section>
    <footer>
      I'm a footer
    </footer>
  </div>
</template>
<script>
import OvervueNavigationWrapper from '@/components/navigation-wrapper.vue';
export default {
  components: {
    'overvue-navigation-wrapper': OvervueNavigationWrapper
  }
}
</script>
<style lang="scss" scoped>

</style>
