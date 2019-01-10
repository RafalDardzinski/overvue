import OvervueNavigation from '@/components/navigation/navigation.vue';
import OvervueLogo from '@/components/logo.vue';
import { expect } from 'chai';
import { shallowMount, WrapperArray, RouterLinkStub } from '@vue/test-utils';
import extractStyleValue from '../../utils/extract-style-value';

WrapperArray.prototype.forEach = function (func) {
  for (let index = 0; index < this.length; index++) {
    const wrapper = this.at(index);
    func(wrapper, index, this);
  }
};

const mockRouteRecords = () => [
  { name: 'home', path: '/', meta: { navigationName: 'Home' } },
  { name: 'route1', path: '/route1' },
  { name: 'route2', path: '/route2', meta: { navigationName: 'Route 2' } },
  { name: 'route3', path: '/route3', meta: { navigationName: 'Route 3' } },
  { name: 'route4', path: '/route4', meta: { navigationName: 'Route 4' } },
];
const mountOvervueNavigation = (mountFunc = shallowMount) => mountFunc(OvervueNavigation, {
  propsData: {
    routes: mockRouteRecords()
  },
  stubs: {
    RouterLink: RouterLinkStub
  }
});

describe('OvervueNavigation (@/components/navigation/navigation.vue)', () => {
  describe('computed', () => {
    describe('navigationListWidth', () => {
      it(`returns this.sidebarWidth + 17 + 'px'`, () => {
        const { navigationListWidth } = OvervueNavigation.computed;
        const sidebarWidth = 300;
        const localThis = { sidebarWidth };

        const result = navigationListWidth.call(localThis);

        expect(result).to.equal('317px');
      });
  
      describe('when !!this.sidebarWidth is false', () => {
        it('returns undefined', () => {
          const { navigationListWidth } = OvervueNavigation.computed;
          const localThis = {};

          const result = navigationListWidth.call(localThis);

          expect(result).to.be.undefined;
        });
      });
    });
  });
  
  describe('methods', () => {
    describe('filterRoutes(routesArray)', () => {
      const { filterRoutes } = OvervueNavigation.methods;
      
      it('returns an array', () => {
        expect(filterRoutes([])).to.be.an('array');
      });

      it('returns array of only route records containing meta.navigationName property', () => {
        const routeRecords = mockRouteRecords();
        filterRoutes(routeRecords).forEach(route => {
          expect(route).to.have.nested.property('meta.navigationName');
        });
      });
    });
  });

  describe('render logic', () => {

    let wrapper;
    beforeEach(() => {
      wrapper = mountOvervueNavigation();
    });

    it('is rendered as ul', () => {
      expect(wrapper.is('ul')).to.be.true;
    });

    it('has navigation-list class', () => {
      expect(wrapper.classes()).to.include('navigation-list');
    });

    it('has style.width that equals this.navigationListWidth', () => {
      const wrapper2 = mountOvervueNavigation(); // wrapper without props
      wrapper.setProps({ sidebarWidth: 500 });

      const wrapperWidth = extractStyleValue('width', wrapper.attributes().style);
      const wrapper2Width = extractStyleValue('width', wrapper2.attributes().style);

      expect(wrapperWidth).to.equal(wrapper.vm.navigationListWidth);
      expect(wrapper2Width).to.equal(wrapper2.vm.navigationListWidth);
    });

    describe('ul.navigation-list > li', () => {
      it('is rendered for each record in filteredRoutes', () => {
        const lis = wrapper.findAll('li');
        const filteredRoutes = wrapper.vm.filteredRoutes;
        expect(lis.length).to.equal(filteredRoutes.length);
      });

      describe(`when routeRecord.path does not equal '/'`, () => {
        it('contains router-link with text content that equals routeRecord.meta.navigationName and to attribute that equals routeRecord.path', () => {
          const lis = wrapper.findAll('li');
          lis.forEach((li, index) => {
            const routeRecord = wrapper.vm.filteredRoutes[index];
            if (routeRecord.path === '/') return; // do not check '/' router
            const link = li.find(RouterLinkStub);

            expect(link.text()).to.equal(routeRecord.meta.navigationName);
            expect(link.props().to).to.equal(routeRecord.path);
          });
        });
      });

      describe(`when routeRecord.path equals '/'`, () => {
        it('contains routerLink with class="home"', () => {
          const lis = wrapper.findAll('li');
          lis.forEach((li, index) => {
            const routeRecord = wrapper.vm.filteredRoutes[index];
            if (routeRecord.path !== '/') return; // check only '/' routes
            const link = li.find(RouterLinkStub);

            const linkClasses = link.classes();

            expect(linkClasses).to.include('home');
          });
        });

        it('contains routerLink that contains OvervueLogo', () => {
          const lis = wrapper.findAll('li');
          lis.forEach((li, index) => {
            const routeRecord = wrapper.vm.filteredRoutes[index];
            if (routeRecord.path !== '/') return; // check only '/' routes
            const link = li.find(RouterLinkStub);

            expect(link.contains(OvervueLogo)).to.be.true;
          });
        });
      });
    });
  });
});