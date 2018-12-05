import { expect } from 'chai';
import utils from './utils/index';
import applyPropValuesToSetItems from '@/components/chart/apply-prop-values-to-set-items';

const { mockDatasets } = utils;

describe(`applyPropValuesToSetItems(set, prop, values) ('@/components/chart/apply-prop-values-to-set-items')`, () => {
  let oldSet, newSet;
  const propName = 'label';
  const propValues = ['a', 'b', 2]; 
  beforeEach(() => {
    oldSet = mockDatasets(); // copy array
    newSet = applyPropValuesToSetItems(oldSet, propName, propValues);
  });

  it('returns an array', () => {
    expect(newSet).to.be.an('array');
  });

  it(`applies values[i] to set[i][prop]`, () => {
    newSet.forEach((element, i) => {
      expect(element).to.have.property(propName).that.equals(propValues[i]);
    });
  });

  it('does not modify original collection passed as set argument', () => {
    expect(newSet).to.not.equal(oldSet);
  });

  describe('when set[i] >= propValues.length', () => {
    it(`resets propValues iterator every time iterator === propValues.length`, () => {
      const longSet = oldSet;
      longSet.push({}, {}, {});
      const shortPropValues = propValues.slice(1);

      let propValuesIterator = 0;
      applyPropValuesToSetItems(longSet, propName, shortPropValues)
        .forEach(element => {
          if (propValuesIterator >= shortPropValues.length)
            propValuesIterator = 0;
          expect(element[propName]).to.equal(shortPropValues[propValuesIterator++]);
        });
    });
  });
});