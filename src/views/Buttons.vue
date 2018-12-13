<template>
  <div class="buttons">
    <header><h4>Normal</h4></header>
    <button>Template</button>
    <button class="button-primary">Primary</button>
    <button class="button-secondary">Secondary</button>
    <button class="button-success">Success</button>
    <button class="button-warning">Warning</button>
    <button class="button-danger">Danger</button>
    <button class="button-info">Info</button>
    <button class="button-light">Light</button>
    <button class="button-dark">Dark</button>
    <button class="button-link">Link</button> 
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
<style lang="scss" scoped>
.buttons {
  margin: 1rem 0;

  &>button {
    margin: .5rem;
    width: 100px;
  }

  & h4 {
    margin: 0;
  }

}
</style>
