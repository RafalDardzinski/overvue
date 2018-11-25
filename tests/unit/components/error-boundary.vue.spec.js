import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import OvervueErrorBoundary from '@/components/error-boundary.vue';


const mountErrorBoundary = () => shallowMount(OvervueErrorBoundary, {
  slots: {
    default: '<div class="slot-content">Slot content</div>'
  }
});

describe('OvervueErrorBoundary (@/components/error-boundary.vue)', () => {
  // interceptError() is the only method called in errorCaptured() hook
  describe('when interceptError() method is not called', () => {
    let wrapper;
    beforeEach(() => wrapper = mountErrorBoundary());
    it(`renders content passed to default slot`, () => {
      expect(wrapper.contains('div.slot-content')).to.be.true;
    });

    it('does not render div.error-message', () => {
      expect(wrapper.contains('div.error-message')).to.be.false;
    });
  });

  describe('when interceptError() method is called', () => {
    let wrapper;
    const error = new Error('Test error');
    beforeEach(() => {
      wrapper = mountErrorBoundary();
      wrapper.vm.interceptError(error); // simulate error
    });

    it('renders div.error-message with error message in textContent', () => {
      expect(wrapper.contains('div.error-message')).to.be.true;
      expect(wrapper.find('div.error-message').text()).to.contain(error.message);
    });

    it('does not render content in default slot', () => {
      expect(wrapper.contains('div.slot-content')).to.be.false;
    });
  });
});