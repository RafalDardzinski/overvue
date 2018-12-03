import colors from '@/config/colors.scss';
import font from '@/config/font.scss';
import Chart from 'chart.js';

Chart.defaults.global.defaultFontColor = colors.darkShades;
Chart.defaults.global.defaultFontFamily = font.fontFamily;
Chart.defaults.global.defaultFontSize = 16;
Chart.defaults.global.tooltips.backgroundColor = colors.darkShades;

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
        intersect: false,
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