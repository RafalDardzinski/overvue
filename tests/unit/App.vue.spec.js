import chai from 'chai';
import spies from 'chai-spies';
import Vuex from 'vuex';
import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import Layout from '@/config/layout';

chai.use(spies);


const localVue = createLocalVue();
localVue.use(Vuex);

const mountApp = (mountFunc = shallowMount, config = {}) => mountFunc(App, config);

describe('App.vue (@/App.vue)', () => {
  describe('methods', () => {
    describe('getAppOffsetWidth()', () => {
      it('returns this.$refs.app.offsetWidth', () => {
        const localThis = {
          $refs: {
            app: { offsetWidth: 480 }
          }
        };

        expect(App.methods.getAppOffsetWidth.call(localThis))
          .to.equal(localThis.$refs.app.offsetWidth);
      });
    });

    describe('commitAppOffsetWidth(offsetWidth)', () => {
      let mutations, store, spy;

      beforeEach(() => {
        const mockFunc = function () { return true; };
        spy = chai.spy(mockFunc);
        mutations = { setAppOffsetWidth: spy };
        store = new Vuex.Store({
          mutations,
          state: {
            APP_OFFSET_WIDTH: 0
          },
        });
      });

      it('commits offsetWidth to store', () => {
        const wrapper = shallowMount(App, {
          store,
          localVue
        });

        const mockWidth = 460;
        wrapper.vm.commitAppOffsetWidth(mockWidth);
        expect(spy).to.have.been.called.with(mockWidth);
      });
    });

    describe('addWindowResizeListener()', () => {
      it('adds "resize" event listener to window object', () => {
        const spy = chai.spy.on(window, 'addEventListener');
        const localThis = {
          handleResize: () => true
        };
        App.methods.addWindowResizeListener.call(localThis);
        expect(spy).to.have.been.called.with.exactly('resize', localThis.handleResize);
      });

      it('returns window object', () => {
        const localThis = {
          handleResize: () => true
        };
        const result = App.methods.addWindowResizeListener.call(localThis);
        expect(result).to.equal(window);
      });
    });

    describe('handleResize()', () => {
      let localThis;
      describe('when this.resizeTimeout is falsy', () => {
        beforeEach(() => {
          localThis = {
            resizeTimeout: null,
            commitAppOffsetWidth: () => true,
            getAppOffsetWidth: () => 458
          };
        });

        it('returns true', done => {
          App.methods.handleResize.call(localThis)
            .then(result => {
              expect(result).to.be.true;
              done();
            })
            .catch(error => done(error));
        });

        it('calls this.commitAppOffsetWidth() with this.getAppOffsetWidth() as parameter', done => {
          const commitAppOffsetWidthSpy = chai.spy.on(localThis, 'commitAppOffsetWidth');

          App.methods.handleResize.call(localThis)
            .then(result => {
              console.log(localThis.resizeTimeout);
              expect(commitAppOffsetWidthSpy).to.have.been.called.with(localThis.getAppOffsetWidth());
              done();
            })
            .catch(error => done(error));
        });
      });

      describe('when !!this.resizeTimeout is true', () => {
        beforeEach(() => {
          localThis = {
            resizeTimeout: 45,
            commitAppOffsetWidth: () => true,
            getAppOffsetWidth: () => 458
          };
        });

        it('returns false', done => {
          App.methods.handleResize.call(localThis)
            .then(result => {
              expect(result).to.be.false;
              done();
            })
            .catch(error => done(error));
        });

        it('does not call commitAppOffsetWidth()', done => {
          const commitAppOffsetWidthSpy = chai.spy.on(localThis, 'commitAppOffsetWidth');

          App.methods.handleResize.call(localThis)
            .then(result => {
              expect(commitAppOffsetWidthSpy).to.not.have.been.called();
              done();
            })
            .catch(error => done(error));
        });

        it('does not modify this.resizeTimeout', done => {
          const oldResizeTimeoutVal = localThis.resizeTimeout;
          App.methods.handleResize.call(localThis)
            .then(result => {
              expect(localThis.resizeTimeout).to.equal(oldResizeTimeoutVal);
              done();
            })
            .catch(error => done(error));
        });
      });
    });
  });
  
  describe('render logic', () => {
    let wrapper, store;
    beforeEach(() => {
      store = new Vuex.Store();
      wrapper = mountApp(shallowMount, {
        localVue,
        store
      });
    });

    it('is rendered as div#app', () => {
      expect(wrapper.is('div#app')).to.be.true;
    });

    it('contains layout imported from @/config/layout', () => {
      expect(wrapper.contains(Layout)).to.be.true;
    });
  });
});