const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['FGM', 'FG3M', 'FTM'],
    datasets: [
      {
        label: "Red",
        fillColor: "red",
        data: [3, 7, 4],
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)'
      },
      {
        label: "Blue",
        fillColor: "blue",
        data: [4, 3, 5],
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)'
      },
      {
        label: "Green",
        fillColor: "green",
        data: [7, 2, 6],
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)'
      }
      // backgroundColor: [
      //   'rgba(255, 99, 132, 0.2)',
      //   'rgba(54, 162, 235, 0.2)',
      //   'rgba(255, 206, 86, 0.2)',
      //   'rgba(75, 192, 192, 0.2)',
      //   'rgba(153, 102, 255, 0.2)',
      //   'rgba(255, 159, 64, 0.2)'
      // ],
      // borderColor: [
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(255, 159, 64, 1)'
      // ],
      // borderWidth: 1
    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 30,
          min: 0,
          stepSize: 1
        }
      }]
    }
  }
});


// rgb(62, 149, 205)
// rgb(142, 94, 162)
// rgb(60, 186, 159)
// rgb(232, 195, 185)
// rgb(196, 88, 80)


teams = {
  atl: 'hawks',
  bkn: 'nets',
  bos: 'celtics',
  cha: 'hornets',
  chi: 'bulls',
  cle: 'cavaliers',
  dal: 'mavericks',
  den: 'nuggets',
  det: 'pistons',
  gsw: 'warriors',
  hou: 'rockets',
  ind: 'pacers',
  lac: 'clippers',
  lal: 'lakers',
  mem: 'grizzlies',
  mia: 'heat',
  mil: 'bucks',
  min: 'timberwolves',
  nop: 'pelicans',
  nyk: 'knicks',
  okc: 'thunder',
  orl: 'magic',
  phi: '76ers',
  phx: 'suns',
  por: 'blazers',
  sac: 'kings',
  sas: 'spurs',
  tor: 'raptors',
  uta: 'jazz',
  was: 'wizards'
}


"http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/#{abbreviation}.png"
