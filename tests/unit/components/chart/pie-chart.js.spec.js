import chai from 'chai';
import chaiSubset from 'chai-subset';
import { expect } from 'chai';
import Chart from '@/components/chart/chart';
import PieChart from '@/components/chart/pie-chart';
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
  return new PieChart(canvasRef, data, options);
};

describe('PieChart (@/components/chart/bar-chart.js)', () => {
  it('is an instance of Chart class', () => {
    const {canvasRef, data, options} = mockChartCreateParams();
    const pieChart = createValidChartInstance();
    expect(pieChart).to.be.an.instanceOf(Chart);
  });

  describe('PieChart#ref', () => {
    let pieChart;
    beforeEach(() => pieChart = createValidChartInstance());

    it('contains instance of Chart.js object', () => {
      expect(pieChart.ref).to.be.an.instanceOf(ChartJS);
    });

    it(`contains object with type === 'pie`, () => {
      expect(pieChart.ref.config.type).to.equal('pie');
    });

    describe('when constructor was not provided with option parameter', () => {
      it('defaults to config.options.pie', () => {
        const {canvasRef, data} = mockChartCreateParams();
        const pieChart = new PieChart(canvasRef, data);
        expect(pieChart.ref.options).to.containSubset(config.options.pie || config.options.default);
      });
    });
  });

  describe('PieChart#styleDatasets(datasets)', () => {
    let mockDatasets, newDatasets;
    beforeEach(() => {
      mockDatasets = [{}, {}, {}];
      newDatasets = PieChart.styleDatasets(mockDatasets);
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