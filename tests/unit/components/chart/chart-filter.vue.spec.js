import chai from 'chai';
import spies from 'chai-spies';
import { expect } from 'chai';
import { shallowMount, WrapperArray, createLocalVue, mount } from '@vue/test-utils';
import OvervueChartFilter from '@/components/chart/chart-filter.vue';
import FontAwesomeIcon from '@/config/font-awesome';

chai.use(spies);

WrapperArray.prototype.forEach = function (func) {
  for (let index = 0; index < this.length; index++) {
    const wrapper = this.at(index);
    func(wrapper, index, this);
  }
};


const mountChartFilter = (func = shallowMount) => func(OvervueChartFilter, {
  propsData: {
    filters: [
      { name: 'filter1', function: () => true },
      { name: 'filter2', function: () => true },
      { name: 'filter3', function: () => true, default: true },
    ],
    compact: false
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
        expect(validator(props)).to.equal(false);
      });

      it(`validator returns false if some elements "function" property is not of function type`, () => {
        const props = [
          { name: 'filter1', function: () => true, default: true },
          { name: 'filter2', function: true }
        ];
        expect(validator(props)).to.equal(false);
      });

      it('validator returns false if some elements do not have "name" property', () => {
        const props = [
          { name: 'filter1', function: () => true, default: true },
          { function: () => true }
        ];
        expect(validator(props)).to.equal(false);
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

    describe('handleFilterChange(name, func)', () => {
      it('sets this.activeFilter to value of the "name" argument', () => {
        const name = 'some name';
        expect(wrapper.vm.activeFilter).to.not.equal(name, `activeFilterName is already set to the testing value: ${name}`);
        wrapper.vm.handleFilterChange.call(wrapper.vm, name);
        expect(wrapper.vm.activeFilter).to.equal(name);
      });

      it('calls this.emitActiveFilter() with func parameter as argument', () => {
        const emitActiveFilterStub = chai.spy(() => true);
        const func = () => true;
        wrapper.setMethods({
          handleFilterChange: emitActiveFilterStub
        });

        wrapper.vm.handleFilterChange.call(wrapper.vm, 'somename', func);
        expect(emitActiveFilterStub).to.have.been.called.with(func);
      });

      it('sets this.contextMenuVisible to false', () => {
        wrapper.setData({
          contextMenuVisible: true
        });

        wrapper.vm.handleFilterChange.call(wrapper.vm);
        expect(wrapper.vm.contextMenuVisible).to.equal(false);
      });
    });
  });

  describe('render logic', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountChartFilter();
    });

    describe('button.button-link.context-menu-toggler', () => {
      const btnSelector = 'button.button-link.context-menu-toggler';
      let button;
      beforeEach(() => {
        button = wrapper.find(btnSelector);
      });

      it('is rendered', () => {
        expect(button.exists()).to.equal(true);
      });

      it('contains FontAwesomeIcon component with icon="filter"', () => {
        const localVue = createLocalVue();
        localVue.component('font-awesome-icon', FontAwesomeIcon);
        wrapper = shallowMount(OvervueChartFilter, {
          localVue,
          propsData: {
            filters: [
              { name: 'filter1', function: () => true },
              { name: 'filter2', function: () => true },
              { name: 'filter3', function: () => true, default: true },
            ],
            compact: false
          }
        });
        button = wrapper.find(btnSelector);
        expect(button.contains(FontAwesomeIcon)).to.equal(true);

      });
      
      describe('when !!this.contextMenuVisible is true', () => {
        it('has .active class', () => {
          wrapper.setData({
            contextMenuVisible: true
          });
          button = wrapper.find(btnSelector);
          expect(button.classes()).to.include('active');
        });
      });

      describe('when !!this.contextMenuVisible is false', () => {
        it('does not have .active class', () => {
          wrapper.setData({
            contextMenuVisible: false
          });
          button = wrapper.find(btnSelector);
          expect(button.classes()).to.not.include('active');
        });
      });
      
      describe('when !!this.compact is true', () => {
        it('is visible', () => {
          wrapper.setProps({
            compact: true
          });
          button = wrapper.find(btnSelector);
          expect(button.isVisible()).to.equal(true);
        });
      });

      describe('when !!this.compact is false', () => {
        it('is not visible', () => {
          wrapper.setProps({
            compact: false
          });
          button = wrapper.find(btnSelector);
          expect(button.isVisible()).to.equal(false);
        });
      });

      describe('on @click', () => {
        it('sets this.contextMenuVisible to !this.contextMenuVisible', () => {
          const contextMenuVisibleOriginalVal = wrapper.vm.contextMenuVisible;
          button.trigger('click');
          expect(wrapper.vm.contextMenuVisible).to.equal(!contextMenuVisibleOriginalVal);
        });
      });
    });

    describe('form.filters', () => {
      describe('when !!this.compact is false', () => {
        beforeEach(() => wrapper.setProps({ compact: false }));

        it('is visible', () => {
          expect(wrapper.find('form.filters').isVisible()).to.equal(true);
        });

        it('does not have .context-menu class', () => {
          expect(wrapper.find('form.filters').classes()).to.not.include('context-menu');
        });
      });

      describe('when !!this.compact is true', () => {
        beforeEach(() => wrapper.setProps({ compact: true }));
        
        describe('when !!this.contextMenuVisible is true', () => {
          beforeEach(() => wrapper.setData({ contextMenuVisible: true }));

          it('is visible', () => {
            expect(wrapper.find('form.filters').isVisible()).to.equal(true);
          });

          it('has .context-menu class', () => {
            expect(wrapper.find('form.filters').classes()).to.include('context-menu');
          });
        });

        describe('when !!this.contextMenuVisible is false', () => {
          beforeEach(() => wrapper.setData({ contextMenuVisible: false }));

          it('does not have .context-menu class', () => {
            expect(wrapper.find('form.filters').classes()).to.not.include('context-menu');
          });

          it('is not visible', () => {
            expect(wrapper.find('form.filters').isVisible()).to.equal(false);
          });
        });
      });
    });

    describe('input[type="radio"]', () => {
      it('is rendered for each element in this.filters', () => {
        const uid = wrapper.vm._uid;
        const inputs = wrapper.findAll(`input[type="radio"]:not(#no-filter_${uid})`);
        expect(inputs.length).to.equal(wrapper.vm.filters.length);
      });

      it(`has id attribute that equals "chart-filter-" + uid + _(rendering index)`, () => {
        const uid = wrapper.vm._uid;
        const inputs = wrapper.findAll(`input[type="radio"]:not(#no-filter_${uid})`);

        inputs.forEach((element, index) => {
          expect(element.attributes().id).to.equal(`chart-filter-${uid}_${index}`);
        });
      });

      describe('when this.activeFilter equals filter.name', () => {
        it('is has checked attribute', () => {
          const testIndex = 2;
          const filters = [
            { name: 'filter1', function: () => true },
            { name: 'filter2', function: () => true },
            { name: 'filter3', function: () => true }
          ];

          wrapper.setProps({
            filters
          });
          wrapper.setData({
            activeFilter: filters[testIndex].name
          });

          const input = wrapper.findAll('input[type="radio"]:not(#no-filter)').at(testIndex);
          expect(input.is(':checked')).to.equal(true);
        });
      });

      describe('when this.activeFilter equals "no-filter"', () => {
        beforeEach(() => {
          wrapper.setProps({
            filters: [
              { name: 'filter1', function: () => true },
              { name: 'filter2', function: () => true },
              { name: 'filter3', function: () => true }
            ]
          });
          wrapper.setData({
            activeFilter: 'no-filter'
          });
        });
        it('does not have checked attribute', () => {
          const uid = wrapper.vm._uid;
          const filterInputs = wrapper.findAll(`input[type="radio"]:not(#no-filter_${uid})`);
          expect(filterInputs.is(':not(:checked)')).to.equal(true);
        });

        it('renders input[type="radio"]#no-filter_uid as checked', () => {
          const uid = wrapper.vm._uid;
          expect(wrapper.find(`input[type="radio"]#no-filter_${uid}`).is(':checked')).to.equal(true);
        });
      });

      describe('on @change', () => {
        it('calls handleFilterChange() with filter.name and filter.function arguments', () => {
          const { filters, _uid } = wrapper.vm;
          const filterInputs = wrapper.findAll(`input[type="radio"]:not(#no-filter_${_uid})`);
          const spy = chai.spy.on(wrapper.vm, 'handleFilterChange');
          
          filterInputs.forEach((input, i) => {
            input.trigger('change');
            expect(spy).to.have.been.nth(i + 1).called.with.exactly(filters[i].name, filters[i].function);
          });
        });

        describe('when called on input#no-filter', () => {
          it('calls handleFilterChange with "no-filter" and defaultFilterFunc', () => {
            const { defaultFilterFunc, _uid } = wrapper.vm;
            const spy = chai.spy.on(wrapper.vm, 'handleFilterChange');
            const noFilterInput = wrapper.find(`input#no-filter_${_uid}`);
            
            noFilterInput.trigger('change');
            expect(spy).to.have.been.called.with.exactly('no-filter', defaultFilterFunc);
          });
        });
      });
    });

    describe('label', () => {
      let labels, uid;
      beforeEach(() => {
        uid = wrapper.vm._uid;
        labels = wrapper.findAll(`label:not([for="no-filter_${uid}"])`);
      });

      it('is rendered for each element in this.filters', () => {
        expect(labels.length).to.equal(wrapper.vm.filters.length);
      });

      it('has for attribute that equals `chart-filter-` + uid + _(its rendering index)', () => {
        labels.forEach((label, index) => {
          expect(label.attributes().for).to.equal(`chart-filter-${uid}_${index}`);
        });
      });

      it('has text content that equals filter.name', () => {
        const { filters } = wrapper.vm;
        labels.forEach((label, index) => {
          expect(label.text()).to.equal(filters[index].name);
        });
      });

      it('has class="button-primary filter-button"', () => {
        labels.forEach(label => {
          expect(label.classes()).to.have.members(['button-primary', 'filter-button']);
        });
      });
    });

    describe('input#no-filter_uid', () => {
      describe('when component is mounted is mounted', () => {
        it('is rendered', () => {
          const wrapper = shallowMount(OvervueChartFilter);
          const uid = wrapper.vm._uid;
          expect(wrapper.contains(`input[type="radio"]#no-filter_${uid}`)).to.equal(true);
        });
      });

      describe('when data.activeFilter === "no-filter"', () => {
        it('it has checked attribute', () => {
          wrapper.setData({
            activeFilter: 'no-filter'
          });
          const uid = wrapper.vm._uid;
          const noFilterInput = wrapper.find(`input#no-filter_${uid}`);
          expect(noFilterInput.element.checked).to.be.true;
        });
      });

      describe('on @change', () => {
        it('calls emitActiveFilter() with this.defaultFilterFunc attribute', () => {
          const uid = wrapper.vm._uid;
          const noFilterInput = wrapper.find(`input[type="radio"]#no-filter_${uid}`);
          const spy = chai.spy.on(wrapper.vm, 'emitActiveFilter');
          noFilterInput.trigger('change');
          expect(spy).to.have.been.called.once.with.exactly(wrapper.vm.defaultFilterFunc);
        });
      });
    });

    describe('label[for="no-filter_uid"]', () => {
      it('is always rendered', () => {
        const uid = wrapper.vm._uid;
        expect(wrapper.contains(`label[for="no-filter_${uid}"]`)).to.equal(true);
      });
      
      it('has text content that equals unfilteredInputName property', () => {
        const uid = wrapper.vm._uid;
        const unfilteredInputName = 'SomeText';
        wrapper.setProps({
          unfilteredInputName
        });
        expect(wrapper.find(`label[for="no-filter_${uid}"]`).text()).to.equal(unfilteredInputName);
      });
    });
  });
});