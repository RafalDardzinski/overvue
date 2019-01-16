<template>
  <span class="tweened-number">
    {{ number }}
  </span>
</template>
<script>
import TweenLite from 'gsap/TweenLite';

export default {
  props: {
    value: {
      type: Number,
      required: true,
      default: 0
    },
    decimal: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1.4,
    },
  },
  computed: {
    number() {
      return this.tweenedValue.toFixed(this.decimal);
    }
  },
  data() {
    return {
      tweenedValue: 0,
    }
  },
  mounted() {
    TweenLite.to(this, this.duration, { tweenedValue: this.value, ease: Power3.easeInOut })
  },
  watch: {
    value() {
      TweenLite.to(this, this.duration, { tweenedValue: this.value, ease: Power3.easeInOut })
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
