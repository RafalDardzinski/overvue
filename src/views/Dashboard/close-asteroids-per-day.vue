<template>
  <div class="close-asteroids-per-day">
    <overvue-chart-wrapper
    :getData="getCloseAsteroidsPerDate"
    :organizeData="organizeData"
    type="bar"
    title="Posts per user"
    ></overvue-chart-wrapper>
  </div>
</template>
<script>
import OvervueChartWrapper from '@/components/chart-wrapper.vue';
import NasaNeoAdapter from '@/data-access-layer/nasa-neo';
export default {
  components: {
    'overvue-chart-wrapper': OvervueChartWrapper,
  },
  methods: {
    getCloseAsteroidsPerDate() {
      return NasaNeoAdapter.getAsteroidsClosestToEarth('2019-04-11');
    },
    organizeData(data) {
      return {}
    },
  },
  created() {
    this.getCloseAsteroidsPerDate().then(data => {
      console.log('NASA:')
      console.log(data)
    }).catch(e => {
      e.then(x => console.log(x));
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
