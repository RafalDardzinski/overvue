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
      legend: {
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
    },
    line: {
      title: {
        display: false
      },
      legend: {
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
        // displayColors: false,
        mode: 'index',
        intersect: false,
      }
    }
  },
  datasets: {
    default: {
      backgroundColors: [
        colors.chartMono1,
        colors.chartMono2,
        colors.chartMono3,
        colors.chartMono4,
        colors.chartMono5
      ],
      borderColors: [
        colors.chartMono1,
        colors.chartMono2,
        colors.chartMono3,
        colors.chartMono4,
        colors.chartMono5
      ],
      borderWidth: 1
    },
    line: {
      backgroundColors: [
        colors.primary,
        colors.info,
        colors.success,
        colors.lightAccent,
        colors.warning
      ],
      borderColors: [
        colors.primary,
        colors.info,
        colors.success,
        colors.lightAccent,
        colors.warning
      ],
      borderWidth: 3
    }
  }
};

export default config;