const currSeason = 2019
const colorGrid = 'white';
Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontSize = 18;
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
                backgroundColor: 'rgb(62, 149, 205, 0.8)',
                borderColor: 'rgb(62, 149, 205, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(62, 149, 205)'
            },
            {
                label: currSeason + ' ' + "Los Angeles Lakers",
                fillColor: "blue",
                data: [],
                backgroundColor: 'rgb(142, 94, 162, 0.8)',
                borderColor: 'rgb(142, 94, 162, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(142, 94, 162)'
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
        labels: ['PPG', 'OPPG'],
        datasets: [
            {
                label: currSeason + ' ' + "Los Angeles Clippers",
                fillColor: "red",
                data: [],
                backgroundColor: 'rgb(60, 186, 159, 0.8)',
                borderColor: 'rgb(60, 186, 159, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(60, 186, 159, 1)'
            },
            {
                label: currSeason + ' ' + "Los Angeles Lakers",
                fillColor: "blue",
                data: [],
                backgroundColor: 'rgb(232, 195, 185, 0.8)',
                borderColor: 'rgb(232, 195, 185, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rrgb(232, 195, 185, 1)'
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
        labels: ['EFF'],
        datasets: [
            {
                label: currSeason + ' ' + "Los Angeles Clippers",
                fillColor: "red",
                data: [],
                backgroundColor: 'rgb(196, 88, 80, 0.8)',
                borderColor: 'rgb(196, 88, 80, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(196, 88, 80, 1)'
            },
            {
                label: currSeason + ' ' + "Los Angeles Lakers",
                fillColor: "blue",
                data: [],
                backgroundColor: 'rgb(232, 195, 185, 0.8)',
                borderColor: 'rgb(232, 195, 185, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rrgb(232, 195, 185, 1)'
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
            label: currSeason + ' ' + "Los Angeles Clippers",
            backgroundColor: "rgb(222, 66, 91, 0.8)",
            data: [],
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgb(222, 66, 91)",
            lineTension: 0.8
        }
            ,
        {
            label: currSeason + ' ' + "Los Angeles Lakers",
            backgroundColor: "rgb(72, 143, 49, 0.8)",
            data: [],
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgb(72, 143, 49)"
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
                fontSize: 15
            },
            angleLines: {
                color: colorGrid
            },
            ticks: {
                callback: function () { return "" },
                backdropColor: 'rgb(46, 46, 46)',
                beginAtZero: true,
                // max: 30,
                // min: 0,
                // stepSize: 1
            }
        }
    }
}

// const line1CTX = document.getElementById('line1').getContext('2d');
// const line1data = {
//     type: 'line',
//     data: {
//         labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//         datasets: [{
//             data: [],
//             label: "Los Angeles Clippers",
//             borderColor: "#3e95cd",
//             fill: false
//         }, {
//             data: [],
//             label: "Los Angeles Lakers",
//             borderColor: "#8e5ea2",
//             fill: false
//         }
//         ]
//     },
//     options: {
//         animation: {
//             duration: 1500,
//             easing: 'linear'
//         },
//         title: {
//             display: true,
//             text: 'Last 5 Games'
//         }
//     }
// }
