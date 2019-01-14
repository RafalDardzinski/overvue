<template>
  <div class="buttons-and-icons">
    <h1>Buttons & Icons</h1>
    <article>
      <header><h2>Buttons</h2></header>
      <section>
        <header>Enabled</header>
        <button class="button-primary">Primary</button>
        <button class="button-secondary">Secondary</button>
        <button class="button-success">Success</button>
        <button class="button-warning">Warning</button>
        <button class="button-danger">Danger</button>
        <button class="button-info">Info</button>
        <button class="button-link">Link</button>
      </section>
      <section>
        <header>Disabled</header>
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
        <div class="icons">
          <figure>
            <header>Overvue Logo:</header>
            <overvue-logo logo-width="4rem" :logo-fill="colors.primary"></overvue-logo>
          </figure>
          <figure>
            <header>Filter:</header>
            <font-awesome-icon icon="filter"></font-awesome-icon>
          </figure>
        </div>
      </section>
    </article>
    <article>
      <header>
        <h2>Credits</h2>
      </header>
      <p>
        Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
      </p>
    </article>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import OvervueLogo from '@/components/logo.vue';
import colors from '@/config/colors.scss';
export default {
  name: 'home',
  components: {
    HelloWorld,
    'overvue-logo': OvervueLogo
  },
  data() {
    return {
      colors
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/config/colors.scss';
.buttons-and-icons {
  margin: 1rem 0;

  button {
    margin: .5rem;
    width: 100px;
  }

  h4 {
    margin: 0 .5rem;
  }

  .icons {
    display: flex;
    color: $primary;
  }

}

figure {
  display: block;
  margin: 0 .5rem;
  padding: 0;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  font-size: 4rem;

  header {
    margin: .5rem;
    font-weight: bold;
    color: $info;
    font-size: 1.2rem;
  }
}
</style>
