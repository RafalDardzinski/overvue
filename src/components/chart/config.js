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
      colors.chartMono1,
      colors.chartMono2,
      colors.chartMono3,
      colors.chartMono4,
      colors.chartMono5
    ]
  }

};

export default config;