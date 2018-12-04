import {expect} from 'chai';

import ChartFactory from '@/components/chart/chart-factory';
import BarChart from '@/components/chart/bar-chart';
import LineChart from '@/components/chart/line-chart';

describe('ChartFactory (@/components/chart/chart-factory.js)', () => {
  let canvasRef;
  beforeEach(() => {
    canvasRef = document.createElement('canvas');
  });

  describe('static methods', () => {
    describe('ChartFactory.createEmptyChartInstance()', () => {
      it('returns BarChart instance when called with "bar" as type argument', () => {
        expect(ChartFactory.createEmptyChartInstance(canvasRef, 'bar')).to.be.an.instanceOf(BarChart);
      });

      it('returns LineChart instance when called with "line" as type argument', () => {
        expect(ChartFactory.createEmptyChartInstance(canvasRef, 'line')).to.be.an.instanceOf(LineChart);
      });
    });

    describe('ChartFactory.getChartClass()', () => {
      it('returns BarChart when called with "bar" as type argument', () => {
        expect(ChartFactory.getChartClass('bar')).to.equal(BarChart);
      });

      it('returns LineChart when called with "line" as type argument', () => {
        expect(ChartFactory.getChartClass('line')).to.equal(LineChart);
      });
    });
  });
});