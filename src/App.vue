<template>
  <div id="app" ref="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/buttons">Buttons</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
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


// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
