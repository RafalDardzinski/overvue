import ChartJS from 'chart.js';

const _ref = new WeakMap(); // ref private method
class Chart {
  constructor(canvasRef, type, data, options) {
    const ctx = canvasRef.getContext('2d');
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
}

export default Chart;