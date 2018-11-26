import BarChart from './bar-chart';
import LineChart from './line-chart';

const charts = {
  bar: BarChart,
  line: LineChart
};

class ChartFactory {
  static createEmptyChartInstance (canvasRef, type) {
    return new charts[type](canvasRef);
  }
}

export default ChartFactory;