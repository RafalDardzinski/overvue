import ChartJS from 'chart.js';
import config from './config';

// {} fallback to mock context so Chart.js will not throw error on rendering using vue-test-utils
const getContext = canvas => canvas.getContext('2d') || {};

const _ref = new WeakMap(); // ref private method
class Chart {
  constructor(canvasRef, type, data, opts) {
    const options = opts || config.options.default;
    const ctx = getContext(canvasRef);
    _ref.set(this, new ChartJS(ctx, {
      type,
      data,
      options
    }));
  }

  get ref() {
    return _ref.get(this);
  }

  setDatasets(datasets = []) {
    this.ref.data.datasets = datasets;
    return this;
  }

  setLabels(labels = []) {
    this.ref.data.labels = labels;
    return this;
  }

  update() {
    this.ref.update();
    return this;
  }

  // statics
  static validateConstructorArguments(canvasRef, type, data, options) {
    if (!(canvasRef instanceof HTMLCanvasElement))
      throw new Error(`${canvasRef} is not a valid canvas reference object.`); 
    if (!['line', 'bar', 'horizontalBar', 'radar', 'pie', 'polarArea', 'bubble', 'scatter'].includes(type))
      throw new Error(`${type} is not a valid chart type.`);
    if (typeof data !== 'object')
      throw new Error('data argument is not an object.');
    if (typeof options !== 'object')
      throw new Error('options argument is not an object.');
  }

  static createDataset(data = [], datasetConfig = {}) {
    return Object.assign({}, datasetConfig, {data});
  }

  static colorifyDatasets(datasets = [], colors = config.datasets.backgroundColors) {
    let colorsIterator = 0;
    datasets.forEach(dataset => {
      // reset iterator when reached colors maximum
      if (colorsIterator === colors.length)
        colorsIterator = 0;
      dataset.backgroundColor = colors[colorsIterator++];
    });
    return datasets;
  }

  // @todo: test setDatasets and setLabels
}

export default Chart;