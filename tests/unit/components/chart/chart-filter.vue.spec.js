import chai from 'chai';
import spies from 'chai-spies';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import OvervueChartWrapper from '@/components/chart-wrapper.vue';
import utils from './utils';

chai.use(spies);

const mountChartFilter = () => shallowMount(OvervueChartWrapper, {
  props: {

  }
});

describe('OvervueChartFilter (@/components/chart/chart/chart-filter.vue)', () => {
  describe('properties', () => {
    describe('filters', () => {
      it(`throws an error if at least one item in array doesn't contain both "name" and "function" properties`, () => {
        
      });
    });
  });

  describe('computed', () => {
    describe('defaultFilter', () => {
      it('returns element from this.filters that contains truthy "default" property', () => {
        
      });

      describe('when more than one element contains truthy "default" property', () => {
        it('returns first element it finds', () => {
          
        });
      });

      describe('when there is no element with truthy "default" property', () => {
        it('returns an object with no "name" property', () => {
          
        });

        it('returs an object with function: defaultFilterFunc', () => {
          
        });
      });
    });
  });

  describe('methods', () => {
    describe('emitActiveFilter(filterFunc)', () => {
      it('emits filter:activated event', () => {
        
      });

      it('attaches filterFunc to emmited event', () => {
        
      });
    });

    describe('defaultFilterFun(data)', () => {
      it('returns unmodified data', () => {
        
      });
    });
  });

  describe('render logic', () => {
    describe('input[type="radio"]', () => {
      it('is rendered for each element in this.filters', () => {
        
      });

      it('has id attribute that equals its rendering index', () => {
        
      });

      describe('when filter object contains truthy "default" prop', () => {
        it('renders with checked attribute', () => {
          
        });
      });

      describe('when filter object does not contain truthy "default" prop', () => {
        it('does not render with checked attribute', () => {
          
        });
      });

      describe('on @change', () => {
        it('calls emitActiveFilter() with filter.function attribute', () => {
          
        });
      });
    });

    describe('label', () => {
      it('is rendered for each element in this.filters', () => {
        
      });

      it('has for attribute that equals its rendering index', () => {
        
      });

      it('has text content that equals filter.name', () => {
        
      });
    });

    describe('input#no-filter', () => {
      it('is always rendered', () => {
        
      });

      it('has checked attribute when defaultFilter.name is falsy', () => {
        
      });

      describe('on @change', () => {
        it('calls emitActiveFilter() with this.defaultFilterFunc attribute', () => {
          
        });
      });
    });

    describe('label[for="no-filter"]', () => {
      it('is always rendered', () => {
        
      });
      
      it('has text content that equals nonFilterName property', () => {
        
      });
    });
  });
});