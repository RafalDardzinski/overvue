import ChartJS from 'chart.js';

class Chart {


  static create(canvasRef, type, data, options) {
    validateArguments(canvasRef, type, data, options);
    const ctx = canvasRef.getContext('2d');
    return new ChartJS(ctx, {
      type,
      data,
      options
    });
  }
  
}

export default Chart;


function validateArguments (canvasRef, type, data, options) {
  if (!(canvasRef instanceof HTMLCanvasElement))
    throw new Error(`${canvasRef} is not a valid canvas reference object.`); 
  if (!['line', 'bar', 'horizontalBar', 'radar', 'pie', 'polarArea', 'bubble', 'scatter'].includes(type))
    throw new Error(`${type} is not a valid chart type.`);
  if (typeof data !== 'object')
    throw new Error('data argument is not an object.');
  if (typeof options !== 'object')
    throw new Error('options argument is not an object.');
}

// this.chartRef = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: this.labels,
//     datasets: datasets
//   },
//   options: {
//     title: {
//       text: this.title,
//       display: true
//     },
//     scales: {
//       yAxes: [{
//         ticks: {
//           min: this.min || 0
//         },
//         stacked: this.stacked
//       }],
//       xAxes: [{
//         ticks: {
//           autoSkip: false
//         }
//       }]
//     },
//     tooltips: {
//       mode: 'index',
//       intersect: false
//     },
//     // hover: {
//     //   mode: 'index',
//     //   intersect: false
//     // }
//   }