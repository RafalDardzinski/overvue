// import Chart from 'chart.js';


// const validatePrototype = (input, proto) => input instanceof proto;

// const drawChart = (destinationCanvas, chartObject) => {
//   const ctx = destinationCanvas.getContext('2d');
//   return new Chart(ctx, chartObject);
// };

const _chartRef = new WeakMap(); // chartRef private property

class Chart {
  constructor(chartRef) {
    _chartRef.set(this, chartRef);
    this.update = function() {
      _chartRef.get(this).update();
    };
  }
  setDatasets(newDatasets) {
    const chartRef = _chartRef.get(this);
    chartRef.data.datasets = newDatasets;
  }
  setLabels(newLabels) {
    const chartRef = _chartRef.get(this);
    chartRef.data.labels = newLabels;
  }
}