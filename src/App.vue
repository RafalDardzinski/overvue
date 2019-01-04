<template>
  <div id="app" ref="app">
    <overvue-navigation-wrapper></overvue-navigation-wrapper>
    <router-view/>
  </div>
</template>
<script>
import OvervueNavigationWrapper from '@/components/navigation-wrapper';
export default {
  components: {
    'overvue-navigation-wrapper': OvervueNavigationWrapper,
  },
  data() {
    return {
      resizeTimeout: null
    }
  },
  methods: {
    getAppOffsetWidth() {
      return this.$refs.app.offsetWidth;
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

<style lang="scss">
@import '@/styles/typography.scss';
@import '@/styles/buttons.scss';

#app {
  color: #2c3e50;
}

</style>
