<template>
  <div class="overvue-chart">
    <overvue-loading-indicator v-if="!ready"></overvue-loading-indicator>
    <canvas class="overvue-chart-canvas"
    v-show="ready"
    />
    <p>ready: {{ready}}</p>
  </div>  
</template>
<script>
import OvervueLoadingIndicator from '@/components/loading-indicator';
import OvervueErrorBoundary from '@/components/error-boundary.vue';
import Chart from '@/components/chart/chart.js'
import ChartFactory from './chart-factory.js';

export default {
  components: {
    'overvue-loading-indicator': OvervueLoadingIndicator,
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
      if (this.datasets) return ChartFactory.getChartClass(this.chartType).styleDatasets(this.datasets);
      return [];
    }
  },
  methods: {
    getChartCanvas() {
      return this.$el.querySelector('.overvue-chart-canvas');
    },
    createEmptyChartInstance() {
      const canvas = this.getChartCanvas();
      const chart = ChartFactory.createEmptyChartInstance(canvas, this.chartType);
      this.chart = chart;
      return chart;
    },
    updateChartInstance() {
      this.chart.setDatasets(this.styledDatasets);
      this.chart.setLabels(this.labels);
      this.chart.update();
      return this.chart;
    }
  },
  watch: {
    ready() {
      if (this.ready) {
        this.updateChartInstance();
        this.$emit('chart:ready', this.updateChartInstance)
      }   
    }
  },
  mounted() {
    this.createEmptyChartInstance();
  }
}
</script>

<style lang="scss" scoped>

</style>
