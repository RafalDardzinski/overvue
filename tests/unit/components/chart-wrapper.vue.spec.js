import chai from 'chai';
import spies from 'chai-spies';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import OvervueChartWrapper from '@/components/chart-wrapper.vue';
import utils from './chart/utils';

chai.use(spies);
const { mockDatasets, mockLabels } = utils;


const mountChartWrapper = () => shallowMount(OvervueChartWrapper, {
  propsData: {
    title: 'Test Chart',
    type: 'bar',
    getData: () => Promise.resolve({ datasets: mockDatasets(), labels: mockLabels() }),
    organizeData: data => data
  }
});

describe('OvervueChartWrapper (@/components/chart-wrapper.vue)', () => {
  describe('methods', () => {
    describe('init()', () => {
      it('calls props.getData()', () => {
        const wrapper = mountChartWrapper();
        const spy = chai.spy.on(wrapper.vm, 'getData');
        wrapper.vm.init.call(wrapper.vm);
        expect(spy).to.have.been.called();
      });

      describe('after successfully obtaining data from props.getData()', () => {
        let data, wrapper;
        beforeEach(done => {
          wrapper = mountChartWrapper();
          wrapper.vm.getData()
            .then(obtainedData => {
              data = obtainedData;
              return wrapper.vm.init.call(wrapper.vm);
            })
            .then(done);
        });
        
        it('assigns data to this.chartData', () => {
          expect(wrapper.vm.chartData).to.deep.equal(data);
        });

        it('sets this.dataFetched to true', () => {
          expect(wrapper.vm.dataFetched).to.be.true;
        });
      });
    });

    describe('setActiveFilter(func)', () => {
      it('sets this.activeFilter to func argument', () => {
        const wrapper = mountChartWrapper();
        const { setActiveFilter } = wrapper.vm;
        const mockFilterFunc = data => data;
        setActiveFilter.call(wrapper.vm, mockFilterFunc);
        expect(wrapper.vm.activeFilter).to.equal(mockFilterFunc);
      });
    });

    describe('setDataFetchedError(error)', () => {
      let wrapper, previousDataFetchedVal;
      const error = new Error('some error');
      beforeEach(() => {
        wrapper = mountChartWrapper();
        previousDataFetchedVal = wrapper.vm.dataFetched;
        wrapper.vm.setDataFetchedError.call(wrapper.vm, error);
      });

      it('sets this.dataFetchedError to error argument', () => {
        expect(wrapper.vm.dataFetchedError).to.equal(error);
      });

      it('sets this.dataFetched to true', () => {
        expect(previousDataFetchedVal, `Could not test the function: this.dataFetched was initialized as true`)
          .to.not.be.true;
        expect(wrapper.vm.dataFetched).to.be.true;
      });
    });
  });

  describe('computed', () => {
    describe('filteredData', () => {
      const { filteredData } = OvervueChartWrapper.computed;
      const activeFilterMock = data => true;

      describe('when this.chartData.length > 0', () => {
        it('returns this.activeFilter(this.chartData)', () => {
          const localThis = {
            chartData: [1, 2, 3],
            activeFilter: activeFilterMock
          };
          
          const spy = chai.spy.on(localThis, 'activeFilter');
          expect(filteredData.call(localThis)).to.equal(activeFilterMock(localThis.chartData));
          expect(spy).to.have.been.called.once.with(localThis.chartData);
        });
      });

      describe('when !!this.chartData.length equals false', () => {
        it('returns empty array', () => {
          const localThis = {
            chartData: [],
            activeFilter: activeFilterMock
          };

          const spy = chai.spy.on(localThis, 'activeFilter');
          expect(filteredData.call(localThis)).to.be.an('array').with.lengthOf(0);
          expect(spy).to.not.have.been.called();
        });
      });
    });

    describe('organizedData', () => {
      it('', () => {
        
      });
    });

    describe('datasets', () => {
      it('', () => {
        
      });
    });

    describe('labels', () => {
      it('', () => {
        
      });
    });

    describe('dataReady', () => {

    });
  });
  
  describe('render logic', () => {
    describe('header>h3', () => {
      it('has textContent that equals props.title', () => {
        
      });

      describe('when !!props.title is false', () => {
        it('is not rendered', () => {
          
        });
      });
    });

    describe('header>OvervueChartFilter', () => {
      describe('when props.filters.length > 1 && dataReady', () => {
        it('is rendered', () => {
          
        });

        it('calls setActiveFilter on @filterActivated event', () => {
          
        });
      });

      describe('when props.filters.length lt 1 or !!dataRady is false', () => {
        it('is not rendered', () => {
          
        });
      });
    });

    describe('div.chart', () => {
      describe('when !!this.dataFetchedError equals false', () => {
        it('is rendered', () => {
          
        });

        it('contains OvervueChart', () => {
          
        });
      });

      describe('when !!this.dataFetchedErrror equals true', () => {
        it('is not rendered', () => {
          
        });
      });
    });
  });
});