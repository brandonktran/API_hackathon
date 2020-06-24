const currSeason = 2019
Chart.defaults.global.defaultFontColor = 'black';
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
        backgroundColor: 'rgb(62, 149, 205, 0.4)',
        borderColor: 'rgb(62, 149, 205, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(62, 149, 205, 0.8)'
      },
      {
        label: currSeason + ' ' + "Lebron James",
        fillColor: "blue",
        data: [],
        backgroundColor: 'rgb(142, 94, 162, 0.4)',
        borderColor: 'rgb(142, 94, 162, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(142, 94, 162, 0.8)'
      }
    ]
  },
  options: {
    animation: {
      duration: 1500,
      easing: 'easeInQuad'
    },
    legend: {
      display: true,
      // labels: {
      //   // This more specific font property overrides the global property
      //   fontColor: 'white'
      // }
    },
    title: {
      display: true,
      text: 'Field Goals Made Per Game'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          // max: 30,
          // min: 0,
          // stepSize: 5
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
        backgroundColor: 'rgb(60, 186, 159, 0.4)',
        borderColor: 'rgb(60, 186, 159, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(60, 186, 159, 0.8)'
      },
      {
        label: currSeason + ' ' + "Lebron James",
        fillColor: "blue",
        data: [],
        backgroundColor: 'rgb(232, 195, 185, 0.6)',
        borderColor: 'rgb(232, 195, 185, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rrgb(232, 195, 185, 0.8)'
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
      display: true,
      text: 'Field Goal Attempts Per Game'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          // max: 30,
          // min: 0,
          // stepSize: 5
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
        backgroundColor: 'rgb(196, 88, 80, 0.4)',
        borderColor: 'rgb(196, 88, 80, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(196, 88, 80, 0.8)'
      },
      {
        label: currSeason + ' ' + "Lebron James",
        fillColor: "blue",
        data: [],
        backgroundColor: 'rgb(232, 195, 185, 0.6)',
        borderColor: 'rgb(232, 195, 185, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rrgb(232, 195, 185, 0.8)'
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
      display: true,
      text: 'Field Goal Percentage %'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          // max: 30,
          // min: 0,
          // stepSize: 5
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
      backgroundColor: "rgba(200,0,0,0.2)",
      data: [],
      pointHoverRadius: 10,
      pointHoverBackgroundColor: "rgba(200,0,0,0.5)",
      // lineTension: 0.5
    }
      ,
    {
      label: currSeason + ' ' + "Lebron James",
      backgroundColor: "rgba(0,0,200,0.2)",
      data: [],
      pointHoverRadius: 10,
      pointHoverBackgroundColor: "rgba(0,0,200,0.5)"
    }
    ]
  },
  options: {
    animation: {
      duration: 1500,
      easing: 'easeInQuad'
    },
    scales: {
      ticks: {
        beginAtZero: true,
        // max: 30,
        // min: 0,
        // stepSize: 1
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
      borderColor: "#3e95cd",
      fill: false
    }, {
      data: [],
      label: "Lebron James",
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
      display: true,
      text: 'Last 10 Games'
    }
  }
}
