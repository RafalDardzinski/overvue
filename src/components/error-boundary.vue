<template>
  <div class="overvue-error-boundary">
    <slot v-if="!error" />
    <!-- @todo - expand this -->
    <div class="error-message" v-else>Error: {{ error.message }}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      error: null
    }
  },
  methods: {
    interceptError(error) {
      this.error = error;
    }
  },
  errorCaptured (error, vm, info) {
    this.interceptError(error);
  }
}
</script>
<style lang="scss" scoped>
.error-message {
  text-align: center;
  color: red;
}
</style>


