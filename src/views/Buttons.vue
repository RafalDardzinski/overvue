<template>
  <div class="buttons-and-icons">
    <h1>Buttons & Icons</h1>
    <article>
      <header><h2>Buttons</h2></header>
      <section>
        <header><h3>Enabled</h3></header>
        <button class="button-primary">Primary</button>
        <button class="button-secondary">Secondary</button>
        <button class="button-success">Success</button>
        <button class="button-warning">Warning</button>
        <button class="button-danger">Danger</button>
        <button class="button-info">Info</button>
        <button class="button-link">Link</button>
      </section>
      <section>
        <header><h3>Disabled</h3></header>
        <button class="button-primary button--disabled">Primary</button>
        <button class="button-secondary button--disabled">Secondary</button>
        <button class="button-success button--disabled">Success</button>
        <button class="button-warning button--disabled">Warning</button>
        <button class="button-danger button--disabled">Danger</button>
        <button class="button-info button--disabled">Info</button>
        <button class="button-link button--disabled">Link</button>
      </section>
    </article>
    <article>
      <header><h2>Icons</h2></header>
      <section>
        <h3>Overvue Logo</h3>
        <overvue-logo width="4rem"></overvue-logo>
        <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      </section>
    </article>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import OvervueLogo from '@/components/logo.vue';
export default {
  name: 'home',
  components: {
    HelloWorld,
    'overvue-logo': OvervueLogo
  }
}
</script>
<style lang="scss" scoped>
.buttons-and-icons {
  margin: 1rem 0;

  & button {
    margin: .5rem;
    width: 100px;
  }

  & h4 {
    margin: 0 .5rem;
  }

}

svg {
  transition: 1s;
}

svg:hover * {
  fill: green;
}
</style>
