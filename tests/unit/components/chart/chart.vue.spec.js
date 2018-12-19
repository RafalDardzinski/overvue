import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import Chart from '@/components/chart/chart.js';
import OvervueChart from '@/components/chart/chart.vue';
import LoadingIndicator from '@/components/loading-indicator.vue';
import mockDatasets from './utils/mockDatasets';

const createOvervueChartWrapper = () => {
  return shallowMount(OvervueChart, {
    propsData: {
      chartType: 'bar'
    }
  });
};

describe('OvervueChart (@/components/chart/chart.vue)', () => {
  describe('computed properties:', () => {
    describe('styledDatasets', () => {
      let localThis;
      beforeEach(() => localThis = {datasets: mockDatasets()});

      it('returns styled datasets', () => {
        localThis.chartType = 'bar';
        expect(OvervueChart.computed.styledDatasets.call(localThis))
          .to.deep.equal(Chart.styleDatasets(mockDatasets()));
      });

      describe('when !!props.datasets is false', () => {
        it('returns an empty array', () => {
          localThis.datasets = null;
          expect(OvervueChart.computed.styledDatasets.call(localThis)).to.be.an('array').with.lengthOf(0);
        });
      });
    });
  });

  describe('methods:', () => {
    let wrapper;
    beforeEach(() => wrapper = createOvervueChartWrapper());

    describe('getChartCanvas()', () => {
      it('returns canvas.overvue-chart-canvas', () => {
        expect(wrapper.vm.getChartCanvas()).to.be.an.instanceOf(HTMLCanvasElement);
        expect(wrapper.vm.getChartCanvas().className).to.equal('overvue-chart-canvas');
      });
    });

    describe('createEmptyChartInstance()', () => {
      it('returns instance of Chart', () => {
        const {createEmptyChartInstance} = wrapper.vm;
        expect(createEmptyChartInstance()).to.be.an.instanceOf(Chart);
      });
  
      it('assigns chart instance to data.chart', () => {
        wrapper.vm.createEmptyChartInstance();
        const {chart} = wrapper.vm;
        expect(chart).to.be.an.instanceOf(Chart);
      });
    });
  
    describe('updateChartInstance()', () => {
      // mock update function which causes problems in test environment
      beforeEach(() => {
        wrapper.vm.chart.update = () => true;
      });
      it('calls data.chart.setDatasets() with computed.styledDatasets as argument', () => {
        const spy = chai.spy.on(wrapper.vm.chart, 'setDatasets');
        wrapper.vm.updateChartInstance.call(wrapper.vm);
        expect(spy).to.have.been.called().with(wrapper.vm.styledDatasets);
      });
  
      it('calls data.chart.setLabels() with props.labels as argument', () => {
        const spy = chai.spy.on(wrapper.vm.chart, 'setLabels');
        wrapper.vm.updateChartInstance.call(wrapper.vm);
        expect(spy).to.have.been.called().with(wrapper.vm.labels);
      });

      it('calls data.chart.update()', () => {
        const spy = chai.spy.on(wrapper.vm.chart, 'update');
        wrapper.vm.updateChartInstance.call(wrapper.vm);
        expect(spy).to.have.been.called();
      });

      it('returns data.chart', () => {
        expect(wrapper.vm.updateChartInstance()).to.equal(wrapper.vm.chart);
      });
    });
  });

  describe('render logic:', () => {
    let wrapper;
    beforeEach(() => wrapper = createOvervueChartWrapper());
    describe('when dataFetched property is false', () => {
      beforeEach(() => wrapper.setProps({dataFetched: false}));
      it('renders LoadingIndicator', () => {
        expect(wrapper.contains(LoadingIndicator)).to.equal(true);
      });
  
      it('keeps canvas.overvue-chart-canvas hidden', () => {
        expect(wrapper.find('canvas.overvue-chart-canvas').isVisible()).to.equal(false);
      });
    });
  
    describe('when dataFetched property is true', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = createOvervueChartWrapper();
        wrapper.setProps({dataFetched: true});
      });

      it('sets canvas.overvue-chart-canvas to be visible', () => {
        expect(wrapper.find('canvas.overvue-chart-canvas').isVisible()).to.equal(true);
      });
  
      it('removes LoadingIndicator from DOM', () => {
        expect(wrapper.contains(LoadingIndicator)).to.equal(false);
      });
    });
  });
});
