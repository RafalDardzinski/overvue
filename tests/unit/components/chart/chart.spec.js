import chai from 'chai';
import chaiSubset from 'chai-subset';
import { expect } from 'chai';
import Chart from '@/components/chart/chart';
import ChartJS from 'chart.js';
import config from '@/components/chart/config';

chai.use(chaiSubset);

const mockChartCreateParams = (type = 'bar', data = {}, options = {title: {display: true, text: 'sample title'}}) => {
  const canvasRef = document.createElement('canvas');
  canvasRef.getContext = () => {return {};};
  return {
    canvasRef, 
    type, 
    data, 
    options
  };
};

const createValidChartInstance = () => {
  const {canvasRef, type, data, options} = mockChartCreateParams();
  return new Chart(canvasRef, type, data, options);
};

const mockDatasets = [
  {label: 'dataset1', data: [1, 2, 3]},
  {label: 'dataset2', data: [4, 5, 6]}
];

const mockLabels = ['Label1', 'Label2'];

console.error = () => ''; // disable chart.js error logging due to lack of jsom canvas support

describe('Chart (@/components/chart/chart.js)', () => {
  describe('Chart#ref', () => {
    let chart;
    beforeEach(() => chart = createValidChartInstance());

    it('contains instance of Chart.js object', () => {
      expect(chart.ref).to.be.an.instanceof(ChartJS);
    });
    
    it('contains type property that equals type argument provided to the constructor', () => {
      const {canvasRef, data, options} = mockChartCreateParams();
      const chart = new Chart(canvasRef, 'line', data, options);
      expect(chart.ref.config.type).to.equal('line');
    });

    it('contains subset of options provided as argument for constructor in the options property', () => {
      const {options} = mockChartCreateParams();
      expect(chart.ref.options).to.containSubset(options);
    });

    it('cannot be modified', () => {
      expect(() => chart.ref = 'I am modified').to.throw();
    });


    describe('when options argument was not provided to the constructor', () => {
      it('Chart#ref.options contains default options set defined in config.js', () => {
        const {canvasRef, type, data, options} = mockChartCreateParams();
        const chart = new Chart(canvasRef, type, data);
        expect(chart.ref.options).to.containSubset(config.options[type] || config.options.default);
      });
    });
  });

  describe('Chart#setDatasets()', () => {
    let chart;
    beforeEach(() => chart = createValidChartInstance());
    
    it('returns chart instance', () => {
      expect(chart.setDatasets()).to.be.an.instanceOf(Chart);
    });

    it('modifies chart.ref.data.datasets', () => {
      chart.setDatasets(mockDatasets);
      expect(chart.ref.data.datasets).to.equal(mockDatasets);
    });
  });

  describe('Chart#setLabels()', () => {
    let chart;
    beforeEach(() => chart = createValidChartInstance());

    it('returns chart instance', () => {
      expect(chart.setLabels(mockLabels)).to.be.an.instanceOf(Chart);
    });

    it('modifies chart.ref.data.labels', () => {
      chart.setLabels(mockLabels);
      expect(chart.ref.data.labels).to.equal(mockLabels);
    });
  });

  // static methods
  describe('Chart.validateArguments()', () => {
    describe('when not passed valid canvas element as canvasRef parameter', () => {
      it('throws an error: "{{canvasRef}} is not a valid canvas reference object."', () => {
        const invalidElementRef = document.createElement('div');
        const {type, data, options} = mockChartCreateParams();
        expect(Chart.validateConstructorArguments.bind(this, invalidElementRef, type, data, options))
          .to.throw(`${invalidElementRef} is not a valid canvas reference object.`);
      });
    });

    describe('when passed incorrect type', () => {
      it('throws an error: {{type}} is not a valid chart type.', () => {
        const {canvasRef, data, options} = mockChartCreateParams();
        const invalidType = 'polar';
        expect(Chart.validateConstructorArguments.bind(this, canvasRef, invalidType, data, options))
          .to.throw(`${invalidType} is not a valid chart type.`);
      });
    });

    describe('when data is not an object', () => {
      it('throws an error: data argument is not an object.', () => {
        const {canvasRef, type, options} = mockChartCreateParams();
        expect(Chart.validateConstructorArguments.bind(this, canvasRef, type, '', options))
          .to.throw(`data argument is not an object.`);
      });
    });

    describe('when options is not an object', () => {
      it('throws an error: options argument is not an object.', () => {
        const {canvasRef, type, data} = mockChartCreateParams();
        expect(Chart.validateConstructorArguments.bind(this, canvasRef, type, data, ''))
          .to.throw(`options argument is not an object.`);
      });
    });
  });

  describe('Chart.createDataset()', () => {
    it('returns an object with data property on the root level', () => {
      const {data} = mockDatasets[0];
      expect(Chart.createDataset.bind(this, data, {})())
        .to.be.an('Object')
        .that.have.property('data')
        .that.equals(data);
    });

    describe('when datasetConfig contains data property', () => {
      it('overrides datasetConfig.data with data argument', () => {
        const {data} = mockDatasets[0];
        const datasetConfig = {data: 'incorrect data property'};
        expect(Chart.createDataset.bind(this, data, datasetConfig)())
          .to.include({data});
      });
    });
  });
});