import colors from '@/config/colors.scss';

const config = {
  // general settings applicable to all charts
  dflt: {
    options: {
      title: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }]
      },
      tooltips: {
        mode: 'index',
        intersect: false
      }
    }   
  },
  datasetBackgroundColors: [
    colors.mono1,
    colors.mono2,
    colors.mono3,
    colors.mono4,
    colors.mono5
  ]
};

export default config;

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