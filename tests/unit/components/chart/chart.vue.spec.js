import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import Chart from '@/components/chart/chart.js';
import OvervueChart from '@/components/chart/chart.vue';
import LoadingIndicator from '@/components/loading-indicator.vue';
import mockDatasets from './utils/mockDatasets';

// @todo: add the tests

const createOvervueChartWrapper = () => {
  return shallowMount(OvervueChart, {
    propsData: {
      chartType: 'bar'
    }
  });
};

describe('OvervueChart (@/components/chart/chart.vue)', () => {
  describe('computed properties:', () => {
    let wrapper;
    beforeEach(() => wrapper = createOvervueChartWrapper());
    describe('ready', () => {
      beforeEach(() => {
        // set props / data to true so computed.ready returns true
        wrapper.setProps({loaded: true, datasets: [], labels: []});
        wrapper.setData({chart: true});
      });

      it('returns true when all of the following returns true: props.loaded, !!props.datasets, !!props.labels, !!data.chart', () => {
        expect(wrapper.vm.ready).to.be.true;
      });

      it('returns false if props.loaded is false', () => {
        wrapper.setProps({loaded: false});
        expect(wrapper.vm.ready).to.be.false;
      });

      it('returns false if props.datasets is false', () => {
        wrapper.setProps({datasets: false});
        expect(wrapper.vm.ready).to.be.false;
      });

      it('returns false if props.labels is false', () => {
        wrapper.setProps({labels: false});
        expect(wrapper.vm.ready).to.be.false;
      });

      it('returns false if data.chart is false', () => {
        wrapper.setData({chart: false});
        expect(wrapper.vm.ready).to.be.false;
      });
    });

    describe('styledDatasets', () => {
      it('returns colorified datasets', () => {
        wrapper.setData({datasets: mockDatasets});
        expect(wrapper.vm.styledDatasets).to.deep.equal(Chart.colorifyDatasets(mockDatasets));
      });

      describe('when !!datasets is false', () => {
        it('returns an empty array', () => {
          wrapper.setData({datasets: null});
          expect(wrapper.vm.styledDatasets).to.be.an('array').with.lengthOf(0);
        });
      });
    });
  });

  describe('methods:', () => {
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

  describe('render logic:', () => {
    let wrapper;
    beforeEach(() => wrapper = createOvervueChartWrapper());
    describe('when loaded property is false', () => {
      beforeEach(() => wrapper.setProps({loaded: false}));
      it('renders LoadingIndicator', () => {
        expect(wrapper.contains(LoadingIndicator)).to.be.true;
      });
  
      it('keeps canvas.overvue-chart-canvas hidden', () => {
        expect(wrapper.find('canvas.overvue-chart-canvas').isVisible()).to.be.false;
      });
    });
  
    describe('when ready property is true', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = mount(OvervueChart, {
          propsData: {
            chartType: 'bar',
            loaded: true
          }
        });
      });

      it('sets canvas.overvue-chart-canvas to be visible', () => {
        // expect(wrapper.find('canvas.overvue-chart-canvas').isVisible()).to.be.true;
      });
  
      it('removes LoadingIndicator from DOM', () => {
        
      });
    });
  });
});
