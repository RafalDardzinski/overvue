<template>
  <div class="layout" id="fixed-sidebar" ref="layout">
    <section class="content">
      <aside class="sidebar">
        <overvue-navigation-wrapper></overvue-navigation-wrapper>
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
  }
}
</script>
<style lang="scss" scoped>
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
  min-width: 200px;
  box-sizing: border-box;
  padding: .5rem;
  position: fixed;
  height: 100vh;
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
