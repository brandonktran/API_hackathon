const currSeason = 2019
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
const barCTX = document.getElementById('bar1').getContext('2d');
const barData = {
    type: 'bar',
    data: {
        labels: ['FG%', 'FT%'],
        datasets: [
            {
                label: currSeason + ' ' + "Los Angeles Clippers",
                fillColor: "red",
                data: [],
                backgroundColor: 'rgb(0, 63, 92)',
                borderColor: 'rgb(0, 63, 92)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(0, 63, 92)'
            },
            {
                label: currSeason + ' ' + "Los Angeles Lakers",
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
        animation: {
            duration: 1500,
            easing: 'easeInQuad'
        },
        legend: {
            display: true,
            // labels: {
            //   fontColor: 'white'
            // }
        },
        title: {
            fontSize: 24,
            display: true,
            text: 'Shooting Percentage Averages'
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
        labels: ['PPG', 'OPPG'],
        datasets: [
            {
                label: currSeason + ' ' + "Los Angeles Clippers",
                fillColor: "red",
                data: [],
                backgroundColor: '#2C2C54',
                borderColor: '#2C2C54',
                borderWidth: 1,
                hoverBackgroundColor: '#2C2C54'
            },
            {
                label: currSeason + ' ' + "Los Angeles Lakers",
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
            text: 'Points Per Game'
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
        labels: ['EFF'],
        datasets: [
            {
                label: currSeason + ' ' + "Los Angeles Clippers",
                fillColor: "red",
                data: [],
                backgroundColor: '#231F20',
                borderColor: '#231F20',
                borderWidth: 1,
                hoverBackgroundColor: '#231F20'
            },
            {
                label: currSeason + ' ' + "Los Angeles Lakers",
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
            text: 'Efficiency'
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
            label: currSeason + ' ' + "Los Angeles Clippers",
            backgroundColor: "rgb(4, 76, 138, 0.8)",
            data: [],
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgb(4, 76, 138, 0.8)",
            // lineTension: 0.8
        }
            ,
        {
            label: currSeason + ' ' + "Los Angeles Lakers",
            backgroundColor: "rgb(147, 22, 33, 0.8)",
            data: [],
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgb(147, 22, 33, 0.8)",
            lineTension: 0.8
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
                fontSize: 20
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
