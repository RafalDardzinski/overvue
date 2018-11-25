<template>
  <div class="about">
    <overvue-error-boundary>
      <overvue-chart 
      chart-type="bar"
      :loaded="dataLoaded"
      :datasets="[{label: 'First', data: [2, 5, 8]},
      {label: 'Second', data: [10, 11, 3]}]"
      :labels="['One', 'Two', 'Three']"
      />
      <overvue-chart 
      chart-type="line"
      :loaded="dataLoaded"
      :datasets="[{label: 'First', data: [0, 1, 2]},
      {label: 'Second', data: [1, 8, 5]}]"
      :labels="['One', 'Two', 'Three']"
      />
    </overvue-error-boundary>
  </div>
</template>
<script>
import OvervueChart from '@/components/chart/chart.vue';
import OvervueErrorBoundary from '@/components/error-boundary.vue';

export default {
  components: {
    'overvue-chart': OvervueChart,
    'overvue-error-boundary': OvervueErrorBoundary
  },
  data() {
    return {
      dataLoaded: false
    }
  },
  methods: {
    setDataLoaded() {
      this.dataLoaded = true;
    }
  },
  mounted() {
    setTimeout(this.setDataLoaded, 2000);
  }
}
</script>
<style lang="scss" scoped>

</style>
