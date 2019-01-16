<template>
  <div class="close-asteroids-per-day">
    <overvue-chart-wrapper
    :getData="getNearEarthObjects"
    :organizeData="organizeData"
    type="line"
    title="Number of Near Earth Objects"
    ></overvue-chart-wrapper>
  </div>
</template>
<script>
import OvervueChartWrapper from '@/components/chart-wrapper.vue';
import NasaNeoAdapter from '@/data-access-layer/nasa-neo';
import moment from 'moment';
export default {
  components: {
    'overvue-chart-wrapper': OvervueChartWrapper,
  },
  methods: {
    getNearEarthObjects() {
      const startDate = moment().format('YYYY-MM-DD');
      return NasaNeoAdapter.getNearEarthObjects(startDate);
    },
    organizeData(data) {
      const labels = Object.keys(data);
      const datasets = [{
        label: 'Number of near earth objects',
        data: labels.map(l => data[l].length),
      }];

      return { labels, datasets };
    },
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>

</style>
