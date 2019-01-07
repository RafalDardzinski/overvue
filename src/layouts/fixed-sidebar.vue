<template>
  <div class="layout" id="fixed-sidebar" ref="layout">
    <section class="content">
      <aside class="sidebar">
        <header class="logo">
          logo goes here
        </header>
        <overvue-navigation-wrapper></overvue-navigation-wrapper>
      </aside>
      <div class="view">
        <router-view/>
      </div>
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
#fixed-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  box-sizing: border-box;
}

.content {
  display: flex;
}

.sidebar {
  min-width: 250px;

}

.view {
  flex: 1;
}


</style>
