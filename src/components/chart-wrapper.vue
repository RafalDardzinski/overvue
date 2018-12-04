<template>
  <div class="chart-wrapper">
    <header>
      <h3>{{title}}</h3>
    </header>
    <div class="chart">
      <overvue-chart
      :chartType="type"
      :datasets="datasets"
      :labels="labels"
      :loaded="loaded"
      ></overvue-chart>
    </div>
  </div>
</template>
<script>
import Chart from './chart/chart.vue';

export default {
  components: {
    'overvue-chart': Chart
  },
  props: {
    title: String,
    type: String,
    getData: {
      // fetches data, must return promise
      type: Function,
      required: true,
    },
    organizeData: {
      // returns { datasets, labels }
      type: Function,
      required: true
    }
  },
  data() {
    return {
      loaded: false,
      datasets: [],
      labels: []
    }
  },
  methods: {
    init() {
      this.loaded = false;
      this.getData()
        .then(this.organizeData)
        .then(({datasets, labels}) => {
          this.datasets = datasets;
          this.labels = labels;
          this.loaded = true;
        });
    }
  },
  created() {
    this.init();
  }
}
</script>
<style lang="scss" scoped>
.chart-wrapper {
  box-sizing: border-box;
}

header {
  padding: 0 .5rem;
}
</style>
