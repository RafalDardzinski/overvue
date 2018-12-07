<template>
  <div class="chart-filter">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum tempore ipsam voluptates assumenda id in tempora commodi accusantium, placeat sequi laudantium eligendi impedit quae nam eaque esse vitae quis reprehenderit.
  </div>  
</template>
<script>
export default {
  props: {
    filters: {
      type: Array,
      default: () => [],
      validator: value => {
        return value.every(el => el.name && el.function)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
