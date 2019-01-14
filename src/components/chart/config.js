import colors from '@/config/colors.scss';
import font from '@/config/font.scss';
import Chart from 'chart.js';

Chart.defaults.global.defaultFontColor = colors.darkShades;
Chart.defaults.global.defaultFontFamily = font.fontFamily;
Chart.defaults.global.defaultFontSize = parseInt(font.fontSize) - 4;
Chart.defaults.global.tooltips.backgroundColor = colors.chartTooltip;

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
    },
    doughnut: {
      title: {
        display: false
      },
      legend: {
        display: true
      },
    },
    pie: {
      title: {
        display: false
      },
      legend: {
        display: true
      },
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
        colors.chartPrimary,
        colors.chartInfo,
        colors.chartSuccess,
        colors.chartLightAccent,
        colors.chartWarning,
        colors.chartDanger,
      ],
      borderColors: [
        colors.chartPrimary,
        colors.chartInfo,
        colors.chartSuccess,
        colors.chartLightAccent,
        colors.chartWarning,
        colors.chartDanger,
      ],
      borderWidth: 3
    },
    doughnut: {
      backgroundColors: [
        colors.chartPrimary,
        colors.chartInfo,
        colors.chartSuccess,
        colors.chartLightAccent,
        colors.chartWarning,
        colors.chartDanger,
        colors.darkAccent,
        colors.chartMono1,
        colors.chartMono2,
        colors.chartMono3,
        colors.chartMono4,
        colors.chartMono5,
      ],
      borderColors: colors.lightShades,
      borderWidth: 1
    },
    pie: {
      backgroundColors: [
        colors.chartPrimary,
        colors.chartInfo,
        colors.chartSuccess,
        colors.chartLightAccent,
        colors.chartWarning,
        colors.chartDanger,
        colors.darkAccent,
        colors.chartMono1,
        colors.chartMono2,
        colors.chartMono3,
        colors.chartMono4,
        colors.chartMono5,
      ],
      borderColors: colors.lightShades,
      borderWidth: 1
    }
  }
};

export default config;