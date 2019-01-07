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
  },
  data() {
    return {
      resizeTimeout: null,
      resizeWatchInterval: 500
    }
  },
  methods: {
    getAppOffsetWidth() {
      return this.$refs.layout.offsetWidth;
    },
    commitAppOffsetWidth(offsetWidth) {
      this.$store.commit('setAppOffsetWidth', offsetWidth);
    },
    addWindowResizeListener() {
      window.addEventListener('resize', this.handleResize);
      return window;
    },
    handleResize() {
      // promise to make it testable. Timeout to prevent throttling.
      return new Promise((resolve) => {
        if(!this.resizeTimeout) {
          this.resizeTimeout = setTimeout(() => {
            this.resizeTimeout = null;
            this.commitAppOffsetWidth(this.getAppOffsetWidth());
            resolve(true);
          }, 500);
        } else {
          resolve(false)
        }
      })
    }
  },
  mounted() {
    this.commitAppOffsetWidth(this.getAppOffsetWidth());
    this.addWindowResizeListener();
  }
}
</script>
<style lang="scss" scoped>

</style>
