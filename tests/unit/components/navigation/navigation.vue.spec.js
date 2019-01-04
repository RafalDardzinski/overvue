import OvervueNavigation from '@/components/navigation/navigation.vue';
import chai from 'chai';
import spies from 'chai-spies';
import { expect } from 'chai';
import { shallowMount, WrapperArray, RouterLinkStub } from '@vue/test-utils';

WrapperArray.prototype.forEach = function (func) {
  for (let index = 0; index < this.length; index++) {
    const wrapper = this.at(index);
    func(wrapper, index, this);
  }
};

const mockRouteRecords = () => [
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

    describe('ul.navigation-list > li', () => {
      it('is rendered for each record in filteredRoutes', () => {
        const lis = wrapper.findAll('li');
        const filteredRoutes = wrapper.vm.filteredRoutes;
        expect(lis.length).to.equal(filteredRoutes.length);
      });

      it('contains router-link with a button-link class', () => {
        const lis = wrapper.findAll('li');
        lis.forEach(li => {
          const link = li.find(RouterLinkStub);
          expect(link).to.exist;
          expect(link.classes()).to.include('button-link');
        });
      });

      it('contains router-link with text content that equals routeRecord.meta.navigationName and to attribute that equals routeRecord.path', () => {
        const lis = wrapper.findAll('li');
        lis.forEach((li, index) => {
          const link = li.find(RouterLinkStub);
          const routeRecord = wrapper.vm.filteredRoutes[index];
          expect(link.text()).to.equal(routeRecord.meta.navigationName);
          expect(link.props().to).to.equal(routeRecord.path);
        });
      });
    });
  });
});