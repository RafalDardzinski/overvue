import BarChart from './bar-chart';
import LineChart from './line-chart';
import PieChart from './pie-chart';
import DoughnutChart from './doughnut-chart';

const charts = {
  bar: BarChart,
  line: LineChart,
  pie: PieChart,
  doughnut: DoughnutChart,
};

class ChartFactory {
  static createEmptyChartInstance (canvasRef, type) {
    return new charts[type](canvasRef, {});
  }
  static getChartClass (type) {
    return charts[type];
  } 
}

export default ChartFactory;