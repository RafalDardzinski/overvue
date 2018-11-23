import config from './config';
import Chart from './chart';

const type = 'line';
class LineChart extends Chart {
  constructor(canvasRef, data, opts = config.options[type]) {
    super(canvasRef, type, data, opts);
  }
}

export default LineChart;