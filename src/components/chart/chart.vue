<template>
  <div class="overvue-chart">
    <overvue-loading-indicator v-if="!dataFetched"></overvue-loading-indicator>
    <canvas class="overvue-chart-canvas"
    v-show="dataFetched"
    />
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
    dataFetched: {
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
    labels: Array,
    appWidth: Number
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    styledDatasets() {
      if (this.datasets) return ChartFactory.getChartClass(this.chartType).styleDatasets(this.datasets);
      return [];
    },
    chartData() {
      return [this.datasets, this.labels].join();
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
    },
    resizeCanvas(canvas) {
      return new Promise((resolve, reject) => {
        const displayVal = this.setElementDisplayVal(canvas, 'none');
        canvas.style.width = canvas.parentNode.offsetWidth + 'px';
        resolve({ canvas, displayVal });
      });
    },
    setElementDisplayVal(el, val) {
      const oldVal = el.style.display;
      el.style.display = val;
      return oldVal;
    }
  },
  watch: {
    ready() {
      if (this.ready) {
        this.updateChartInstance();
        this.$emit('chart:ready', this.updateChartInstance)
      }   
    },
    chartData() {
      this.updateChartInstance();
    },
    appWidth() {
      this.resizeCanvas(this.chart.ref.canvas)
        .then(({ canvas, displayVal }) => {
          this.setElementDisplayVal(canvas, displayVal);
        });
    }
  },
  mounted() {
    this.createEmptyChartInstance();
  }
}
</script>
