import chai from 'chai';
import spies from 'chai-spies';
import { expect } from 'chai';
import { shallowMount, WrapperArray } from '@vue/test-utils';
import OvervueChartFilter from '@/components/chart/chart-filter.vue';
import utils from './utils';

chai.use(spies);

WrapperArray.prototype.forEach = function (func) {
  for (let index = 0; index < this.length; index++) {
    const wrapper = this.at(index);
    func(wrapper, index, this);
  }
};


const mountChartFilter = () => shallowMount(OvervueChartFilter, {
  propsData: {
    filters: [
      { name: 'filter1', function: () => true },
      { name: 'filter2', function: () => true },
      { name: 'filter3', function: () => true, default: true },
    ]
  }
});

describe('OvervueChartFilter (@/components/chart/chart/chart-filter.vue)', () => {
  describe('properties', () => {
    describe('filters', () => {
      const wrapper = mountChartFilter();
      const { validator } = wrapper.vm.$options.props.filters;
      it(`validator returns false if some elements do not have "function" property`, () => {
        const props = [
          { name: 'filter1', function: () => true, default: true },
          { name: 'filter2' }
        ];
        expect(validator(props)).to.be.false;
      });

      it(`validator returns false if some elements "function" property is not of function type`, () => {
        const props = [
          { name: 'filter1', function: () => true, default: true },
          { name: 'filter2', function: true }
        ];
        expect(validator(props)).to.be.false;
      });

      it('validator returns false if some elements do not have "name" property', () => {
        const props = [
          { name: 'filter1', function: () => true, default: true },
          { function: () => true }
        ];
        expect(validator(props)).to.be.false
      });
    });
  });

  describe('computed', () => {
    describe('defaultFilter', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = mountChartFilter();
      });

      it('returns element from this.filters that contains truthy "default" property', () => {
        const localThis = {
          filters: [
            { name: 'filter1', function: () => true },
            { name: 'filter2', function: () => true },
            { name: 'filter3', function: () => true, default: true }
          ]
        };
        expect(OvervueChartFilter.computed.defaultFilter.call(localThis)).to.equal(localThis.filters[2]);
      });

      describe('when more than one element contains truthy "default" property', () => {
        it('returns first element it finds', () => {
          const localThis = {
            filters: [
              { name: 'filter1', function: () => true },
              { name: 'filter2', function: () => true, default: true },
              { name: 'filter3', function: () => true, default: true }
            ]
          };
          expect(OvervueChartFilter.computed.defaultFilter.call(localThis)).to.equal(localThis.filters[1]);
        });
      });

      describe('when there is no element with truthy "default" property', () => {
        it('returns an object with function: this.defaultFilterfunc', () => {
          const localThis = {
            filters: [
              { name: 'filter1', function: () => true },
              { name: 'filter2', function: () => true },
              { name: 'filter3', function: () => true }
            ],
            defaultFilterFunc: () => 'default filter function'
          };
          expect(OvervueChartFilter.computed.defaultFilter.call(localThis))
            .to.be.an('object')
            .that.has.property('function')
            .which.equals(localThis.defaultFilterFunc);
        });
      });
    });
  });

  describe('methods', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountChartFilter();
    });

    describe('emitActiveFilter(filterFunc)', () => {
      it('emits filter:activated event', () => {
        wrapper.vm.emitActiveFilter();
        expect(wrapper.emitted('filter:activated')).to.exist;
      });

      it('filterFunc is filter:activated event payload', () => {
        const filterFunc = () => true;
        wrapper.vm.emitActiveFilter(filterFunc);
        expect(wrapper.emitted('filter:activated')[1][0]).to.equal(filterFunc);
      });
    });

    describe('defaultFilterFunc(data)', () => {
      it('returns unmodified data', () => {
        const someData = 'some data';
        expect(wrapper.vm.defaultFilterFunc(someData)).equals(someData);
      });
    });
  });

  describe('render logic', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountChartFilter();
    });

    describe('input[type="radio"]', () => {
      it('is rendered for each element in this.filters', () => {
        const inputs = wrapper.findAll('input[type="radio"]:not(#no-filter)');
        expect(inputs.length).to.equal(wrapper.vm.filters.length);
      });

      it(`has id attribute that equals "chart-filter-" + rendering index`, () => {
        const inputs = wrapper.findAll('input[type="radio"]:not(#no-filter)');

        inputs.forEach((element, index) => {
          expect(element.attributes().id).to.equal(`chart-filter-${index}`);
        });
      });

      describe('when filter object contains truthy "default" prop', () => {
        it('renders with checked attribute', () => {
          const defaultFilter = wrapper.vm.filters.find(el => el.default);
          const defaultFilterIndex = wrapper.vm.filters.indexOf(defaultFilter);
          const defaultFilterInput = wrapper.findAll(`input[type="radio"]:not(#no-filter)`).at(defaultFilterIndex)
          expect(defaultFilterInput.is(':checked')).to.equal(true);
        });
      });

      describe('when filter object does not contain truthy "default" prop', () => {
        beforeEach(() => {
          wrapper.setProps({
            filters: [
              { name: 'filter1', function: () => true },
              { name: 'filter2', function: () => true },
              { name: 'filter3', function: () => true }
            ]
          });
        });
        it('does not render with checked attribute', () => {
          const filterInputs = wrapper.findAll(`input[type="radio"]:not(#no-filter)`);
          expect(filterInputs.is(':not(:checked)')).to.be.true;
        });

        it('renders input[type="radio"]#no-filter as checked', () => {
          expect(wrapper.find('input[type="radio"]#no-filter').is(':checked')).to.be.true;
        });
      });

      describe('on @change', () => {
        it('calls emitActiveFilter() with filter.function attribute', () => {
          const { filters } = wrapper.vm;
          const filterInputs = wrapper.findAll(`input[type="radio"]:not(#no-filter)`);
          const spy = chai.spy.on(wrapper.vm, 'emitActiveFilter');
          
          filterInputs.forEach((input, i) => {
            input.trigger('change');
            expect(spy).to.have.been.nth(i + 1).called.with.exactly(filters[i].function);
          });
        });
      });
    });

    describe('label', () => {
      let labels;
      beforeEach(() => {
        labels = wrapper.findAll('label:not([for="no-filter"])');
      });

      it('is rendered for each element in this.filters', () => {
        expect(labels.length).to.equal(wrapper.vm.filters.length);
      });

      it('has for attribute that equals `chart-filter-` + its rendering index', () => {
        labels.forEach((label, index) => {
          expect(label.attributes().for).to.equal(`chart-filter-${index}`);
        });
      });

      it('has text content that equals filter.name', () => {
        const { filters } = wrapper.vm;
        labels.forEach((label, index) => {
          expect(label.text()).to.equal(filters[index].name);
        });
      });
    });

    describe('input#no-filter', () => {
      it('is always rendered', () => {
        expect(wrapper.contains('input[type="radio"]#no-filter')).to.be.true;
      });

      it('has checked attribute when defaultFilter.name is falsy', () => {
        // stub defaultFilter computed property
        const wrapper = shallowMount(OvervueChartFilter, {
          computed: {
            defaultFilter: () => false
          }
        });
        const noFilterInput = wrapper.find('input[type="radio"]#no-filter');
        expect(noFilterInput.is(':checked')).to.be.true;
      });

      describe('on @change', () => {
        it('calls emitActiveFilter() with this.defaultFilterFunc attribute', () => {
          const noFilterInput = wrapper.find('input[type="radio"]#no-filter');
          const spy = chai.spy.on(wrapper.vm, 'emitActiveFilter');
          noFilterInput.trigger('change');
          expect(spy).to.have.been.called.once.with.exactly(wrapper.vm.defaultFilterFunc);
        });
      });
    });

    describe('label[for="no-filter"]', () => {
      it('is always rendered', () => {
        expect(wrapper.contains('label[for="no-filter"]')).to.be.true;
      });
      
      it('has text content that equals unfilteredInputName property', () => {
        const unfilteredInputName = 'SomeText';
        wrapper.setProps({
          unfilteredInputName
        });
        expect(wrapper.find(`label[for="no-filter"]`).text()).to.equal(unfilteredInputName);
      });
    });
  });
});