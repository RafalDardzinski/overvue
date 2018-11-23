import chai from 'chai';
import chaiSubset from 'chai-subset';
import { expect } from 'chai';
import Chart from '@/components/chart/chart';
import LineChart from '@/components/chart/line-chart';
import ChartJS from 'chart.js';
import config from '@/components/chart/config';

chai.use(chaiSubset);

const mockChartCreateParams = ( data = {}, options = {}) => {
  const canvasRef = document.createElement('canvas');
  canvasRef.getContext = () => {return {};};
  return {
    canvasRef, 
    data, 
    options
  };
};

const createValidChartInstance = () => {
  const {canvasRef, data, options} = mockChartCreateParams();
  return new LineChart(canvasRef, data, options);
};

describe('LineChart (@/components/chart/line-chart.js)', () => {
  it('is an instance of Chart class', () => {
    const {canvasRef, data, options} = mockChartCreateParams();
    const lineChart = createValidChartInstance();
    expect(lineChart).to.be.an.instanceOf(Chart);
  });

  describe('LineChart#ref', () => {
    let lineChart;
    beforeEach(() => lineChart = createValidChartInstance());

    it('contains instance of Chart.js object', () => {
      expect(lineChart.ref).to.be.an.instanceOf(ChartJS);
    });

    it(`contains object with type === 'line`, () => {
      expect(lineChart.ref.config.type).to.equal('line');
    });

    describe('when constructor was not provided with option parameter', () => {
      it('defaults to config.options.line', () => {
        const {canvasRef, data} = mockChartCreateParams();
        const lineChart = new LineChart(canvasRef, data);
        expect(lineChart.ref.options).to.containSubset(config.options.line || config.options.default);
      });
    });
  });
});