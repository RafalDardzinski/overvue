<template>
  <div class="chart-wrapper">
    <header>
      <h3>{{title}}</h3>
      <overvue-chart-filter
      @filter:activated="setActiveFilter"
      v-if="filters.length > 1 && dataFetched"
      :filters="filters"
      non-filter-name="All users"
      />
    </header>
    <div class="chart">
      <overvue-chart
      :chartType="type"
      :datasets="datasets"
      :labels="labels"
      :data-fetched="dataFetched"
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
      chartData: [],
      activeFilter: vals => vals,
      dataFetched: false
    }
  },
  computed: {
    filteredData() {
      if (!this.chartData.length) return [];
      return this.activeFilter(this.chartData);
    },
    organizedData() {
      return this.organizeData(this.filteredData);
    },
    datasets() {
      return this.organizedData.datasets || [];
    },
    labels() {
      return this.organizedData.labels || [];
    }
  },
  methods: {
    init() {
      this.getData()
        .then(data => {
          this.chartData = data || [];
          this.dataFetched = true;
        });
    },
    setActiveFilter(func) {
      this.activeFilter = func;
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
