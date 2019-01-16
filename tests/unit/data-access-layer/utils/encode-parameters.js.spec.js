import { expect } from 'chai';

import encodeParameters from '@/data-access-layer/utils/encode-parameters';

describe('encodeParameters(parameters) (@/data-access-layer/utils/encode-parameters.js)', () => {
  let params;
  beforeEach(() => {
    params = { start_date: '2018-04-11', name: 'John Galt', path: '/etc/overvue/config.json' };
  });
  
  it('returns a string', () => {
    expect(encodeParameters(params)).to.be.a('string');
  });

  it('returns a string containing all URI encoded param keys', () => {
    const keys = Object.keys(params);
    
    const result = encodeParameters(params);

    keys.forEach(key => {
      expect(result).to.include(encodeURIComponent(key));
    });
  });

  it('returns a string containing all URI encoded param values', () => {
    const values = Object.values(params);
    
    const result = encodeParameters(params);

    values.forEach(value => {
      expect(result).to.include(encodeURIComponent(value));
    });
  });

  it('returns a string containing URI encoded key-value pairs concatenated with "="', () => {
    const keys = Object.keys(params);

    const result = encodeParameters(params);

    keys.forEach(key => {
      const expectedKeyValuePair = `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
      expect(result).to.include(expectedKeyValuePair);
    });
  });

  it('returns a string containing URI encoded key-value pairs separated from others by "&"', () => {
    const keys = Object.keys(params);
    const result = encodeParameters(params);

    keys.forEach(key => {
      const encodedKey = encodeURIComponent(key);
      const extractedValue = result.split(`${encodedKey}=`)[1].split('&')[0];
      expect(extractedValue).to.equal(encodeURIComponent(params[key]));
    });
  });

  describe(`when typeof parameters !== 'object'`, () => {
    it('throws an error "Provided parameter is not an object."', () => {
      const expectedErrorMessage = 'Provided parameter is not an object.';
      expect(() => encodeParameters('lorem')).to.throw(expectedErrorMessage);
    });
  });

  describe(`when parameters is undefined`, () => {
    it('returns an empty string', () => {
      expect(encodeParameters()).to.be.a('string').with.lengthOf(0);
    });
  });

  describe('when parameters argument is an empty object', () => {
    it('returns an empty string', () => {
      expect(encodeParameters({})).to.be.a('string').with.lengthOf(0);
    });
  });
});