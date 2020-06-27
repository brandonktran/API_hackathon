const currSeason = 2019;
const colorGrid = 'grey';
Chart.defaults.global.defaultFontColor = 'grey';
Chart.defaults.global.defaultFontSize = 16;
Chart.defaults.global.defaultFontFamily = 'Roboto';
const radarSize = document.getElementById('radar');
radarSize.width = radarSize.parentNode.clientWidth;
radarSize.height = radarSize.parentNode.clientHeight;
const bar1Size = document.getElementById('bar1');
bar1Size.width = bar1Size.parentNode.clientWidth;
bar1Size.height = bar1Size.parentNode.clientHeight;
const bar2Size = document.getElementById('bar2');
bar2Size.width = bar2Size.parentNode.clientWidth;
bar2Size.height = bar2Size.parentNode.clientHeight;
const bar3Size = document.getElementById('bar3');
bar3Size.width = bar3Size.parentNode.clientWidth;
bar3Size.height = bar3Size.parentNode.clientHeight;
const line1Size = document.getElementById('line1');
line1Size.width = line1Size.parentNode.clientWidth;
line1Size.height = line1Size.parentNode.clientHeight;
// Chart.defaults.global.gridLines = 'white';
const barCTX = document.getElementById('bar1').getContext('2d');
const barData = {
  type: 'bar',
  data: {
    labels: ['FGM', 'FG3M', 'FTM'],
    datasets: [
      {
        label: currSeason + ' ' + "Stephen Curry",
        fillColor: "red",
        data: [],
        backgroundColor: 'rgb(0, 63, 92)',
        borderColor: 'rgb(0, 63, 92)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(0, 63, 92)'
      },
      {
        label: currSeason + ' ' + "Lebron James",
        fillColor: "blue",
        data: [],
        backgroundColor: 'rgb(255, 166, 0)',
        borderColor: 'rgb(255, 166, 0)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(255, 166, 0)'
      }
    ]
  },
  options: {
    responsive: true,
    // maintainAspectRatio: true,
    animation: {
      duration: 1500,
      easing: 'easeInQuad'
    },
    legend: {
      display: true,
      // labels: {
      //   fontColor: 'grey'
      // }
    },
    title: {
      fontSize: 24,
      display: true,
      text: 'Field Goals Made Per Game'
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: colorGrid,
        }
      }],
      yAxes: [{
        gridLines: {
          color: colorGrid,
        },
        ticks: {
          fontColor: 'grey',
          fontSize: 14,
          beginAtZero: true,
        }
      }]
    }
  }
}
const bar2CTX = document.getElementById('bar2').getContext('2d');
const bar2Data = {
  type: 'bar',
  data: {
    labels: ['FGA', 'FG3A', 'FTA'],
    datasets: [
      {
        label: currSeason + ' ' + "Stephen Curry",
        fillColor: "red",
        data: [],
        backgroundColor: '#2C2C54',
        borderColor: '#2C2C54',
        borderWidth: 1,
        hoverBackgroundColor: '#2C2C54'
      },
      {
        label: currSeason + ' ' + "Lebron James",
        fillColor: "blue",
        data: [],
        backgroundColor: '#A40E4C',
        borderColor: '#A40E4C',
        borderWidth: 1,
        hoverBackgroundColor: '#A40E4C'
      }
    ]
  },
  options: {
    animation: {
      duration: 1500,
      easing: 'easeInQuad'
    },
    legend: { display: true },
    title: {
      fontSize: 24,
      display: true,
      text: 'Field Goal Attempts Per Game'
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: colorGrid,
        }
      }],
      yAxes: [{
        gridLines: {
          color: colorGrid,
        },
        ticks: {
          fontColor: 'grey',
          fontSize: 14,
          beginAtZero: true,
        }
      }]
    }
  }
}
const bar3CTX = document.getElementById('bar3').getContext('2d');
const bar3Data = {
  type: 'bar',
  data: {
    labels: ['FG%', 'FG3%', 'FT%'],
    datasets: [
      {
        label: currSeason + ' ' + "Stephen Curry",
        fillColor: "red",
        data: [],
        backgroundColor: '#231F20',
        borderColor: '#231F20',
        borderWidth: 1,
        hoverBackgroundColor: '#231F20'
      },
      {
        label: currSeason + ' ' + "Lebron James",
        fillColor: "blue",
        data: [],
        backgroundColor: '#BB4430',
        borderColor: '#BB4430',
        borderWidth: 1,
        hoverBackgroundColor: '#BB4430'
      }
    ]
  },
  options: {
    animation: {
      duration: 1500,
      easing: 'easeInQuad'
    },
    legend: { display: true },
    title: {
      fontSize: 24,
      display: true,
      text: 'Field Goal Percentage %'
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: colorGrid,
        }
      }],
      yAxes: [{
        gridLines: {
          color: colorGrid,
        },
        ticks: {
          fontColor: 'grey',
          fontSize: 14,
          beginAtZero: true,
        }
      }]
    }
  }
}
const radarCTX = document.getElementById('radar').getContext('2d');
const radarData = {
  type: 'radar',
  data: {
    labels: ["PPG", "RPG", "BPG", "SPG", "APG"],
    datasets: [{
      label: currSeason + ' ' + "Stephen Curry",
      backgroundColor: "rgb(147, 22, 33, 0.8)",
      data: [],
      pointHoverRadius: 10,
      pointHoverBackgroundColor: "rgb(147, 22, 33, 0.8)",
      // lineTension: 0.5
    }
      ,
    {
      label: currSeason + ' ' + "Lebron James",
      backgroundColor: "rgb(4, 76, 138, 0.8)",
      data: [],
      pointHoverRadius: 10,
      pointHoverBackgroundColor: "rgb(40, 70, 75, 0.8)"
    }
    ]
  },
  options: {
    animation: {
      duration: 1500,
      easing: 'easeInQuad'
    },
    scale: {
      gridLines: {
        color: colorGrid
      },
      pointLabels: {
        fontSize: 18,
        FontFamily: 'Roboto'
      },
      angleLines: {
        color: colorGrid
      },
      ticks: {
        callback: function () { return "" },
        backdropColor: 'rgb(46, 46, 46)',
        beginAtZero: true,
      }
    }
  }
}

const line1CTX = document.getElementById('line1').getContext('2d');
const line1data = {
  type: 'line',
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [{
      data: [],
      label: "Stephen Curry",
      pointBorderWidth: 2,
      borderColor: "#3e95cd",
      fill: false
    }, {
      data: [],
      label: "Lebron James",
      pointBorderWidth: 2,
      borderColor: "#8e5ea2",
      fill: false
    }
    ]
  },
  options: {
    animation: {
      duration: 1500,
      easing: 'linear'
    },
    title: {
      fontSize: 24,
      display: true,
      text: 'Last 10 Games'
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: colorGrid,
        },
        ticks: {
          fontColor: 'grey',
          fontSize: 14,
          beginAtZero: true,
        }
      }],
      yAxes: [{
        gridLines: {
          color: colorGrid,
        },
        ticks: {
          fontColor: 'grey',
          fontSize: 14,
          beginAtZero: true,
        }
      }]
    }
  }
}


// function resize() {
//   if ()
// }


//tempoerary testing
// const canvasWidth;
// let ctx;
// var temp;
// function init() {
//   const canvas = document.getElementsByClassName('plot');
//   temp = canvas[1]
//   for (let i = 0; i < canvas.length; i++) {

//     console.log(canvas[i].parentElement.style.width)
//     if (canvas[i].getContext) {
//       ctx = canvas[i].getContext("2d");
//       window.addEventListener('resize', function () { resizeCanvas(canvas[i]) }, false);
//       window.addEventListener('orientationchange', function () { resizeCanvas(canvas[i]) }, false);
//       resizeCanvas(canvas[i]);
//     }
//   }
// }

// function resizeCanvas(canvas) {
//   canvas.parentNode.width = '440px';
// }
// init();
