import { expect } from 'chai';
import Chart from '@/components/chart/chart';
import ChartJS from 'chart.js';

const mockChartCreateParams = (type = 'bar', data = {}, options = {}) => {
  const canvasRef = document.createElement('canvas');
  canvasRef.getContext = () => {return {};};
  return {
    canvasRef, 
    type, 
    data, 
    options
  };
};

describe('@/components/chart/chart.js', () => {
  describe('Chart.create(canvasRef, type, data, option)', () => {
    it('returns instance of Chart.js object', () => {
      const {canvasRef, type, data, options} = mockChartCreateParams();
      const chart = Chart.create(canvasRef, type, data, options);
      expect(chart).to.be.an.instanceof(ChartJS);
    });

    describe('when not passed valid canvas element as canvasRef parameter', () => {
      it('throws an error: "{{canvasRef}} is not a valid canvas reference object."', () => {
        const invalidElementRef = document.createElement('div');
        const {type, data, options} = mockChartCreateParams();
        expect(Chart.create.bind(this, invalidElementRef, type, data, options)).to.throw(`${invalidElementRef} is not a valid canvas reference object.`);
      });
    });

    describe('when passed incorrect type', () => {
      it('throws an error: {{type}} is not a valid chart type.', () => {
        const {canvasRef, data, options} = mockChartCreateParams();
        const invalidType = 'polar';
        expect(Chart.create.bind(this, canvasRef, invalidType, data, options)).to.throw(`${invalidType} is not a valid chart type.`);
      });
    });

    describe('when data is not an object', () => {
      it('throws an error: data argument is not an object.', () => {
        const {canvasRef, type, options} = mockChartCreateParams();
        expect(Chart.create.bind(this, canvasRef, type, '', options)).to.throw(`data argument is not an object.`);
      });
    });

    describe('when options is not an object', () => {
      it('throws an error: options argument is not an object.', () => {
        const {canvasRef, type, data} = mockChartCreateParams();
        expect(Chart.create.bind(this, canvasRef, type, data, '')).to.throw(`options argument is not an object.`);
      });
    });
  });
});