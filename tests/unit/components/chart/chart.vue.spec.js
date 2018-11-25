import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import OvervueChart from '@/components/chart/chart.vue';
import LoadingIndicator from '@/components/loading-indicator.vue';

// @todo: add the tests

describe('OvervueChart (@/components/chart/chart.vue)', () => {
  
  describe('when loaded property is false', () => {
    it('renders LoadingIndicator', () => {
      // expect(wrapper.contains(LoadingIndicator)).to.be.true;
    });

    it('keeps canvas.overvue-chart-canvas hidden', () => {
      // expect(wrapper.find('canvas.overvue-chart-canvas').isVisible()).to.be.true;
    });
  });

  describe('when ready property is true', () => {
    it('sets canvas.overvue-chart-canvas to be visible', () => {
      
    });

    it('removes LoadingIndicator from DOM', () => {
      
    });
  });

  describe('createChartInstance()', () => {
    it('returns instance of Chart', () => {
      
    });

    it('creates chart with type that matches props.chartType', () => {
      // maybe use factory?
    });

    it('assigns chart instance to data.chart', () => {
      
    });
  });

  describe('updateChartInstance()', () => {
    it('updates data.chart with datasets with colorified props.datasets', () => {
      
    });

    it('updates data.chart labels with props.labels', () => {

    });
  });
});
