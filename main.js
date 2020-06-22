let response;
let response2;
let player1ID;
// $.ajax({
//   url: 'https://www.balldontlie.io/api/v1/players',
//     type: 'GET',
//     data: {
//       'search': 'stephen curry',
//       'per_page': 100
//     },
//     success: function (data) {
//       response = data;
//       player1ID = response.data[0].id;
//       console.log(data);
//     },
//     error: function (error) {
//       console.log(error);
//     }
//   });


$.ajax({
  url: 'https://www.balldontlie.io/api/v1/season_averages',
  type: 'GET',
  data: {
    'player_ids': [115, 237],
  },
  success: function (data) {
    console.log(data);
    response2 = data;
    barData.data.datasets[0].data = [response2.data[0].fgm, response2.data[0].fg3m, response2.data[0].ftm];
    barData.data.datasets[1].data = [response2.data[1].fgm, response2.data[1].fg3m, response2.data[1].ftm];
    bar2Data.data.datasets[0].data = [response2.data[0].fga, response2.data[0].fg3a, response2.data[0].fta];
    bar2Data.data.datasets[1].data = [response2.data[1].fga, response2.data[1].fg3a, response2.data[1].fta];
    bar3Data.data.datasets[0].data = [response2.data[0].fg_pct*100, response2.data[0].fg3_pct*100, response2.data[0].ft_pct*100];
    bar3Data.data.datasets[1].data = [response2.data[1].fg_pct*100, response2.data[1].fg3_pct*100, response2.data[1].ft_pct*100];
    radarData.data.datasets[0].data = [response2.data[0].pts, response2.data[0].reb, response2.data[0].blk, response2.data[0].stl, response2.data[0].ast];
    radarData.data.datasets[1].data = [response2.data[1].pts, response2.data[1].reb, response2.data[1].blk, response2.data[1].stl, response2.data[1].ast];
    const barChart = new Chart(barCTX, barData);
    const bar2Chart = new Chart(bar2CTX, bar2Data);
    const bar3Chart = new Chart(bar3CTX, bar3Data);
    const radarChart = new Chart(radarCTX, radarData);
  },
  error: function (error) {
    console.log(error);
  }
});
