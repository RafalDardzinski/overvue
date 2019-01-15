import config from './config';
import Chart from './chart';

const type = 'doughnut';
class DoughnutChart extends Chart {
  constructor(canvasRef, data, opts = config.options[type]) {
    super(canvasRef, type, data, opts);
  }

  static styleDatasets(datasets) {
    const styleConfig = config.datasets[type] || config.datasets.default;
    return datasets.map(dataset => Object.assign({}, dataset, {
      backgroundColor: styleConfig.backgroundColors,
      borderColor: styleConfig.borderColors,
      borderWidth: styleConfig.borderWidth,
    }));
  }
}

export default DoughnutChart;