<template>
  <div class="chart-wrapper">
    <header>
      <h3>{{title}}</h3>
      <overvue-chart-filter
      @filter:activated="setActiveFilter"
      v-if="filters.length > 1 && dataReady"
      :filters="filters"
      :unfiltered-input-name="unfilteredInputName"
      />
    </header>
    <div class="chart" v-if="!dataFetchedError">
      <overvue-chart
      :chartType="type"
      :datasets="datasets"
      :labels="labels"
      :data-fetched="dataReady"
      ></overvue-chart>
    </div>
    <div v-else>
      Could not obtain data from the server.
    </div>
  </div>
</template>
<script>
import Chart from './chart/chart.vue';
import ChartFilter from './chart/chart-filter.vue';
import ErrorBoudary from './error-boundary.vue';

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
    },
    unfilteredInputName: String
  },
  data() {
    return {
      chartData: [],
      activeFilter: vals => vals,
      dataFetched: false,
      dataFetchedError: undefined
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
    },
    dataReady() {
      return this.dataFetched && !this.dataFetchedError;
    }
  },
  methods: {
    init() {
      return this.getData()
        .then(data => {
          this.chartData = data;
          this.dataFetched = true;
          return Promise.resolve();
        })
    },
    setActiveFilter(func) {
      this.activeFilter = func;
    },
    setDataFetchedError(error) {
      this.dataFetchedError = error;
      this.dataFetched = true;
    }
  },
  created() {
    this.init()
      .catch(error => {
        this.setDataFetchedError(error);
        throw new Error(`Could not initialize ${this.title || 'chart'}.\n${error}`);
      })
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
