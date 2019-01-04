import OvervueNavigationWrapper from '@/components/navigation-wrapper.vue';
import OvervueNavigation from '@/components/navigation/navigation.vue';
import chai from 'chai';
import spies from 'chai-spies';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

const mountNavigationWrapper = (mountingFunc = shallowMount) => mountingFunc(OvervueNavigationWrapper);

describe('OvervueNavigationWrapper (@/components/navigation-wrapper.vue)', () => {
  describe('render logic', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountNavigationWrapper();
    });
    
    it('is rendered as nav tag', () => {
      expect(wrapper.is('nav')).to.be.true;
    });

    it('contains OvervueNavigation component', () => {
      expect(wrapper.contains(OvervueNavigation)).to.be.true;
    });
  });
});