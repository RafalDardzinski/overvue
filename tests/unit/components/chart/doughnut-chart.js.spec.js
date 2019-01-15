import chai from 'chai';
import chaiSubset from 'chai-subset';
import { expect } from 'chai';
import Chart from '@/components/chart/chart';
import DoughnutChart from '@/components/chart/doughnut-chart';
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
  return new DoughnutChart(canvasRef, data, options);
};

describe('DoughnutChart (@/components/chart/bar-chart.js)', () => {
  it('is an instance of Chart class', () => {
    const {canvasRef, data, options} = mockChartCreateParams();
    const doughnutChart = createValidChartInstance();
    expect(doughnutChart).to.be.an.instanceOf(Chart);
  });

  describe('DoughnutChart#ref', () => {
    let doughnutChart;
    beforeEach(() => doughnutChart = createValidChartInstance());

    it('contains instance of Chart.js object', () => {
      expect(doughnutChart.ref).to.be.an.instanceOf(ChartJS);
    });

    it(`contains object with type === 'doughnut`, () => {
      expect(doughnutChart.ref.config.type).to.equal('doughnut');
    });

    describe('when constructor was not provided with option parameter', () => {
      it('defaults to config.options.doughnut', () => {
        const {canvasRef, data} = mockChartCreateParams();
        const doughnutChart = new DoughnutChart(canvasRef, data);
        expect(doughnutChart.ref.options).to.containSubset(config.options.doughnut || config.options.default);
      });
    });
  });

  describe('DoughnutChart#styleDatasets(datasets)', () => {
    let mockDatasets, newDatasets;
    beforeEach(() => {
      mockDatasets = [{}, {}, {}];
      newDatasets = DoughnutChart.styleDatasets(mockDatasets);
    });

    it('adds backgroundColor property to each datasets member and returns mapped datasets', () => {
      newDatasets.forEach(d => {
        expect(d.backgroundColor).to.exist;
      });
    });

    it('adds borderColor property to each datasets member and returns mapped datasets', () => {
      newDatasets.forEach(d => {
        expect(d.borderColor).to.exist;
      });
    });

    it('adds borderWidth property to each datasets member and returns mapped datasets', () => {
      newDatasets.forEach(d => {
        expect(d.borderWidth).to.exist;
      });
    });
  });
});