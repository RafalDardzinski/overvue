import colors from '@/config/colors.scss';

const config = {
  // general settings applicable to all charts
  options: {
    default: {
      title: {
        display: false
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
  datasets: {
    backgroundColors: [
      colors.mono1,
      colors.mono2,
      colors.mono3,
      colors.mono4,
      colors.mono5
    ]
  }

};

export default config;