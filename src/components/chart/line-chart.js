import config from './config';
import Chart from './chart';

const type = 'line';
class LineChart extends Chart {
  constructor(canvasRef, data, opts = config.options[type]) {
    super(canvasRef, type, data, opts);
  }

  static styleDatasets(datasets, fillMode = false) {
    return Chart.styleDatasets(datasets, config.datasets.line)
      .map(dataset => {
        dataset.fill = fillMode;
        return dataset;
      });
  }
}

export default LineChart;