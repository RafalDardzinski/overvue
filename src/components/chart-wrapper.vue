<template>
  <div class="chart-wrapper" id="type">
    <header :class="{compact: compactMode}">
      <h3 v-if="title">{{title}}</h3>
      <div class="options">
        <overvue-chart-filter
        @filter:activated="setActiveFilter($event)"
        v-if="filters.length && dataReady"
        :filters="filters"
        :unfiltered-input-name="unfilteredInputName"
        :compact="compactMode"
        />
      </div>
    </header>
    <div class="chart" v-if="!dataFetchedError">
      <overvue-chart
      :chartType="type"
      :datasets="datasets"
      :labels="labels"
      :data-fetched="dataReady"
      :app-width="appWidth"
      ></overvue-chart>
    </div>
    <div v-else>
      Could not obtain data from the server. {{dataFetchedError.message}}
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
      dataFetchedError: null,
      wrapperWidth: 0
    }
  },
  computed: {
    filteredData() {
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
    },
    appWidth() {
      return this.$store.state.APP_OFFSET_WIDTH;
    },
    compactMode() {
      return this.wrapperWidth < 450;
    }
  },
  methods: {
    setActiveFilter(func) {
      this.activeFilter = func;
    },
    setDataFetchedError(error) {
      this.dataFetchedError = error;
      this.dataFetched = true;
    },
    calculateWrapperWidth() {
      return this.$el.offsetWidth;
    }
  },
  created() {
    this.getData()
      .then(data => {
        this.chartData = data;
        this.dataFetched = true;
      }).catch(error => {
        this.chartData = {};
        this.setDataFetchedError(error);
      });
  },
  mounted() {
    this.wrapperWidth = this.calculateWrapperWidth();
  },
  updated() {
    this.wrapperWidth = this.calculateWrapperWidth();
  },
  watch: {
    appWidth() {
      this.wrapperWidth = this.calculateWrapperWidth();
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-wrapper {
  box-sizing: border-box;
}

header {
  padding: 0 .0rem;
  display: flex;
  box-sizing: border-box;
  align-items: center;

  h4 {
    flex: 1.5;
  }

  .options {
    flex: 1;
  }
}

header.compact {
  h3 {
    flex: 1;
  }

  .options {
    flex: none;
  }
}
</style>
