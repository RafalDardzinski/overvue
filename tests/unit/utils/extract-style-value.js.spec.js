import extractStyleValue from './extract-style-value';
import { expect } from 'chai';

describe('extract-style-value.js', () => {
  
  it('returns value of a provided style', () => {
    const stylesString = `background-color: red; width: 500px; transition: color .2s;`;
    
    const result = extractStyleValue('width', stylesString);

    expect(result).to.equal('500px');
  });

  describe('when stylesString does not contain the requested style', () => {
    it('returns undefined', () => {
      const stylesString = ``;
      
      const result = extractStyleValue('width', stylesString);

      expect(result).to.be.undefined;
    });
  })
});