<template>
  <div class="layout" id="fixed-sidebar" ref="layout">
    <section class="content">
      <aside class="sidebar" :style="[ { width: sidebarWidth + 'px' } ]">
        <overvue-navigation-wrapper :sidebar-width="sidebarWidth"></overvue-navigation-wrapper>
      </aside>
      <div class="view">
        <router-view/>
          <footer>
            I'm a footer
          </footer>
      </div>
    </section>
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
      sidebarWidth: 200,
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/config/colors.scss';
#fixed-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  
}

.content {
  display: flex;
  box-sizing: border-box;
  flex: 1;
  min-height: 100vh;
}

.sidebar {
  display: flex;
  overflow: hidden;
  padding-right: 17px; // hide scrollbar
  box-sizing: border-box;
  // padding: .5rem;
  position: fixed;
  height: 100vh;
  background-color: rgba($main, 1);
  // temporary background
  background-image: url(https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260);
  background-size: fill;
  background-position: 50% 90%;
}

.view {
  padding: .5rem;
  margin-left: 250px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


</style>
