<template>
  <div class="overvue-chart">
    <overvue-loading-indicator v-if="!loaded"></overvue-loading-indicator>
    <canvas class="overvue-chart-canvas" 
    v-show="ready"
    />
    <p>ready: {{ready}}</p>
  </div>  
</template>
<script>
import LoadingIndicator from '@/components/loading-indicator';
import OvervueErrorBoundary from '@/components/error-boundary.vue';
import Chart from '@/components/chart/chart.js'
import BarChart from './bar-chart';
import LineChart from './line-chart';

const charts = {
  bar: BarChart,
  line: LineChart
};

export default {
  components: {
    'overvue-loading-indicator': LoadingIndicator,
    'overvue-error-boundary': OvervueErrorBoundary
  },
  props: {
    loaded: {
      type: Boolean,
      default: false
    },
    chartType: {
      type: String,
      required: true,
      // apply only implemented chart types
      validator: (value) => ['bar', 'line'].includes(value.toLowerCase())
    },
    datasets: Array,
    labels: Array
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    ready() {
      return !!this.loaded  // data must be loaded
        && !!this.datasets  // datasets must be defined
        && !!this.labels    // labels must be defined
        && !!this.chart     //chart must be built
    },
    styledDatasets() {
      if (this.datasets) return Chart.colorifyDatasets(this.datasets);
      return [];
    }
  },
  methods: {
    createChartInstance() {
      const canvas = this.$el.querySelector('.overvue-chart-canvas');
      const ChartClass = charts[this.chartType];
      const chart = new ChartClass(canvas);
      this.chart = chart;
      return chart;
    },
    updateChartInstance() {
      this.chart.setDatasets(this.styledDatasets);
      this.chart.setLabels(this.labels);
      this.chart.update();
    }
  },
  watch: {
    ready() {
      if (this.ready) 
        this.updateChartInstance();
    }
  },
  mounted() {
    this.createChartInstance();
  }
}
</script>

<style lang="scss" scoped>

</style>
