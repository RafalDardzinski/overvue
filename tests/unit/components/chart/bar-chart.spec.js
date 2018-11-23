import chai from 'chai';
import chaiSubset from 'chai-subset';
import { expect } from 'chai';
import Chart from '@/components/chart/chart';
import BarChart from '@/components/chart/bar-chart';
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
  return new BarChart(canvasRef, data, options);
};

describe('BarChart (@/components/chart/bar-chart.js)', () => {
  it('is an instance of Chart class', () => {
    const {canvasRef, data, options} = mockChartCreateParams();
    const barChart = createValidChartInstance();
    expect(barChart).to.be.an.instanceOf(Chart);
  });

  describe('Chart#ref', () => {
    let barChart;
    beforeEach(() => barChart = createValidChartInstance());

    it('contains instance of Chart.js object', () => {
      expect(barChart.ref).to.be.an.instanceOf(ChartJS);
    });

    it(`contains object with type === 'bar`, () => {
      expect(barChart.ref.config.type).to.equal('bar');
    });

    describe('when constructor was not provided with option parameter', () => {
      it('defaults to config.options.bar', () => {
        const {canvasRef, data} = mockChartCreateParams();
        const barChart = new BarChart(canvasRef, data);
        expect(barChart.ref.options).to.containSubset(config.options.bar || config.options.default);
      });
    });
  });
});