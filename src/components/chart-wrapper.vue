<template>
  <div class="chart-wrapper">
    <header>
      <h3>{{title}}</h3>
      <overvue-chart-filter
      v-if="filters.length"
      :filters="filters"
      />
    </header>
    <div class="chart">
      <overvue-chart
      @chart:ready="setFunctionUpdate"
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
import ChartFilter from './chart/chart-filter.vue';

export default {
  components: {
    'overvue-chart': Chart,
    'overvue-chart-filter': ChartFilter
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
    },
    filters: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loaded: false,
      datasets: [],
      labels: [],
      activeFilter: vals => vals,
      updateFunc: null
    }
  },
  methods: {
    init() {
      this.loaded = false;
      this.getData()
        .then(this.activeFilter)
        .then(this.organizeData)
        .then(({datasets, labels}) => {
          this.datasets = datasets;
          this.labels = labels;
          this.loaded = true;
        });
    },
    setFunctionUpdate(updateFunc) {
      this.updateFunc = updateFunc;
    },
    setDefaultActiveFilter() {
      const defaultFilter =  this.filters.find(f => f.default);
      if (defaultFilter) {
        this.activeFilter = defaultFilter.function;
      }
    }
  },
  created() {
    this.setDefaultActiveFilter()
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
