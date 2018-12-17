import chai from 'chai';
import spies from 'chai-spies';
import Vuex from 'vuex';
import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import OvervueChartWrapper from '@/components/chart-wrapper.vue';
import OvervueChartFilter from '@/components/chart/chart-filter.vue';
import OvervueChart from '@/components/chart/chart.vue';
import utils from './chart/utils';

chai.use(spies);
const { mockDatasets, mockLabels } = utils;

const store = new Vuex.Store({
  state: {
    APP_OFFSET_WIDTH: 480
  }
});

const localVue = createLocalVue();
localVue.use(Vuex);

const mountChartWrapper = (mountFunc = shallowMount) => mountFunc(OvervueChartWrapper, {
  localVue,
  store,
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

    describe('calculateWrapperWidth()', () => {
      it('returns this.$el.offsetWidth', () => {
        const offsetWidth = 471;
        const localThis = {
          $el: { offsetWidth }
        };
        const { calculateWrapperWidth } = OvervueChartWrapper.methods;

        expect(calculateWrapperWidth.call(localThis)).to.equal(offsetWidth);
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
      it(`returns this.organizeData(this.filteredData)`, () => {
        const organizeDataMock = () => true;
        const filteredDataMock = [1, 2, 3];
        const localThis = {
          organizeData: organizeDataMock,
          filteredData: filteredDataMock
        };
        const { organizedData } = OvervueChartWrapper.computed;
        const spy = chai.spy.on(localThis, 'organizeData');

        expect(organizedData.call(localThis)).to.equal(organizeDataMock(filteredDataMock));
        expect(spy).to.have.been.called.once.with(localThis.filteredData);
      });
    });

    describe('datasets', () => {
      const { datasets } = OvervueChartWrapper.computed;
      
      it('returns this.organizedData.datasets', () => {
        const localThis = {
          organizedData: { datasets: mockDatasets() }
        };
        expect(datasets.call(localThis)).to.equal(localThis.organizedData.datasets);
      });
      
      describe('when !!organizedData.datasets is false', () => {
        it('returns empty array', () => {
          const localThis = {
            organizedData: {}
          };
          expect(datasets.call(localThis)).to.be.an('array').with.lengthOf(0);
        });
      });
    });

    describe('labels', () => {
      const { labels } = OvervueChartWrapper.computed;
      
      it('returns this.organizedData.labels', () => {
        const localThis = {
          organizedData: { labels: mockLabels() }
        };
        expect(labels.call(localThis)).to.equal(localThis.organizedData.labels);
      });
      
      describe('when !!organizedData.labels is false', () => {
        it('returns empty array', () => {
          const localThis = {
            organizedData: {}
          };
          expect(labels.call(localThis)).to.be.an('array').with.lengthOf(0);
        });
      });
    });

    describe('dataReady', () => {
      const { dataReady } = OvervueChartWrapper.computed;
      let localThis;
      beforeEach(() => {
        localThis = { dataFetched: true, dataFetchedError: false };
      });
      
      describe('when !!this.dataFetched is true and !!this.dataFetchedError is false', () => {
        it('returns true', () => {
          expect(dataReady.call(localThis)).to.be.true;
        });
      });
      
      describe('when !!this.dataFetched is false', () => {
        it('returns false', () => {
          localThis.dataFetched = false;
          expect(dataReady.call(localThis)).to.be.false;
        });
      });

      describe('when !!this.dataFetchedError is true', () => {
        it('returns false', () => {
          localThis.dataFetchedError = true;
          expect(dataReady.call(localThis)).to.be.false;
        });
      });
    });

    describe('appWidth', () => {
      it('returns $store.state.APP_OFFSET_WIDTH', () => {
        const APP_OFFSET_WIDTH = 548;
        const localThis = {
          $store: {
            state: { APP_OFFSET_WIDTH }
          }
        };

        const { appWidth } = OvervueChartWrapper.computed;
        expect(appWidth.call(localThis)).to.equal(APP_OFFSET_WIDTH);
      });
    });

    describe('compactMode', () => {
      const localThis = {
        wrapperWidth: null
      };
      const { compactMode } = OvervueChartWrapper.computed;

      describe('when this.wrapperWidth < 450', () => {
        it('returns true', () => {
          localThis.wrapperWidth = 449;
          expect(compactMode.call(localThis)).to.be.true;
        });
      });

      describe('when this.wrapperWidth >= 450', () => {
        it('returns false', () => {
          localThis.wrapperWidth = 450;
          expect(compactMode.call(localThis)).to.be.false;
        });
      });
    });
  });
  
  describe('render logic', () => {    
    describe('header>h4', () => {
      let wrapper, headerContent;
      beforeEach(() => {
        wrapper = mountChartWrapper();
        headerContent = wrapper.find('header>h4');
      });

      describe('when !!props.title is true', () => {
        it('is rendered', () => {
          expect(headerContent).to.exist;
        });

        it('has textContent that equals props.title', () => {
          expect(headerContent.text()).to.equal(wrapper.vm.title);
        });
      });

      describe('when !!props.title is false', () => {
        it('is not rendered', () => {
          wrapper.setProps({
            title: undefined
          });
          expect(wrapper.contains('header>h3')).to.be.false;
        });
      });
    });

    describe('header>OvervueChartFilter', () => {
      describe('when !!props.filters.length is true and !!dataReady is true', () => {
        it('is rendered', () => {
          const wrapper = shallowMount(OvervueChartWrapper, {
            localVue,
            store,
            propsData: {
              getData: () => Promise.resolve({ datasets: mockDatasets(), labels: mockLabels() }),
              organizeData: data => data,
              filters: [1]
            },
            computed: {
              dataReady() {
                return true;
              }
            },
          });
          
          expect(wrapper.contains(OvervueChartFilter)).to.be.true;
        });

        it('calls setActiveFilter with payload on @filter:activated event', () => {
          const wrapper = shallowMount(OvervueChartWrapper, {
            localVue,
            store,
            propsData: {
              getData: () => Promise.resolve({ datasets: mockDatasets(), labels: mockLabels() }),
              organizeData: data => data,
              filters: [1]
            },
            computed: {
              dataReady() {
                return true;
              }
            }
          });

          const spy = chai.spy.on(wrapper.vm, 'setActiveFilter');
          const overvueChartFilter = wrapper.find(OvervueChartFilter);
          const payloadFunc = () => true;

          overvueChartFilter.vm.$emit('filter:activated', payloadFunc);
          expect(spy).to.have.been.called.with(payloadFunc);
        });
      });

      describe('when !!props.filters.length is false', () => {
        it('is not rendered', () => {
          const wrapper = shallowMount(OvervueChartWrapper, {
            localVue,
            store,
            propsData: {
              getData: () => Promise.resolve({ datasets: mockDatasets(), labels: mockLabels() }),
              organizeData: data => data
            },
            computed: {
              dataReady() {
                return true;
              }
            }
          });

          expect(wrapper.contains(OvervueChartFilter)).to.be.false;
        });
      });

      describe('when !!dataReady is false', () => {
        it('it is not rendered', () => {
          const wrapper = shallowMount(OvervueChartWrapper, {
            localVue,
            store,
            propsData: {
              getData: () => Promise.resolve({ datasets: mockDatasets(), labels: mockLabels() }),
              organizeData: data => data,
              filters: [1]
            },
            computed: {
              dataReady() {
                return false;
              }
            }
          });

          expect(wrapper.contains(OvervueChartFilter)).to.be.false;
        });
      });
    });

    describe('div.chart', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = mountChartWrapper();
      });

      describe('when !!this.dataFetchedError is false', () => {
        beforeEach(() => {
          wrapper.setData({
            dataFetchedError: null
          });
        });

        it('is rendered', () => {
          expect(wrapper.contains('div.chart')).to.be.true;
        });

        it('contains OvervueChart', () => {
          expect(wrapper.find('div.chart').contains(OvervueChart)).to.be.true;
        });
      });

      describe('when !!this.dataFetchedErrror is true', () => {
        it('is not rendered', () => {
          wrapper.setData({
            dataFetchedError: true
          });

          expect(wrapper.contains('div.chart')).to.be.false;
        });
      });
    });
  });
});