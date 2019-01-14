import config from './config';
import Chart from './chart';

const type = 'doughnut';
class DoughnutChart extends Chart {
  constructor(canvasRef, data, opts = config.options[type]) {
    super(canvasRef, type, data, opts);
  }

  static styleDatasets(datasets) {
    const styleConfig = config.datasets[type] || config.datasets.default;
    return datasets.map((dataset, index) => {
      dataset.backgroundColor = styleConfig.backgroundColors;
      dataset.borderColor = styleConfig.borderColors;
      dataset.borderWidth = styleConfig.borderWidth;
      return dataset;
    });
  }
}

export default DoughnutChart;