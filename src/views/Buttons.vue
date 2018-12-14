<template>
  <div class="buttons">
    <section>
      <header><h4>Normal</h4></header>
      <button class="button-primary">Primary</button>
      <button class="button-secondary">Secondary</button>
      <button class="button-success">Success</button>
      <button class="button-warning">Warning</button>
      <button class="button-danger">Danger</button>
      <button class="button-info">Info</button>
    </section>
    <section>
      <header><h4>Disabled</h4></header>
      <button class="button-primary button--disabled">Primary</button>
      <button class="button-secondary button--disabled">Secondary</button>
      <button class="button-success button--disabled">Success</button>
      <button class="button-warning button--disabled">Warning</button>
      <button class="button-danger button--disabled">Danger</button>
      <button class="button-info button--disabled">Info</button>
    </section>
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

  & button {
    margin: .5rem;
    width: 100px;
  }

  & h4 {
    margin: 0 .5rem;
  }

}
</style>
