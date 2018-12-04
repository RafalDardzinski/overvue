import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import OvervueChartWrapper from '@/components/chart-wrapper.vue';
import { mockDatasets, mockLabels } from './chart/utils';

const mountChartWrapper = () => shallowMount(OvervueChartWrapper, {
  props: {
    title: 'Test Chart',
    type: 'bar',
    getData: () => Promise.resolve({ mockDatasets, mockLabels }),
    organizeData: data => data
  }
});

describe('OvervueChartWrapper (@/components/chart-wrapper.vue)', () => {
  describe('render logic', () => {
    it('renders title text in header>h3', () => {
    
    });
  
    it('renders overvue-chart component in div.chart', () => {
      
    });

    describe('when title is not provided', () => {
      it('header>h3 is not rendered', () => {
        
      });
    });
  });

  describe('methods', () => {
    describe('init()', () => {
      it('runs props.getData()', () => {
        
      });
    });
  });
});