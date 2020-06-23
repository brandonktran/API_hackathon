let barChart;
let bar2Chart;
let bar3Chart;
let radarChart;
let line1Chart = new Chart(line1CTX, line1data);
let response;
let response2;
let player1ID = 115;
let player2ID = 237;
let currentPlayer = 0;
const dropdown = document.getElementById('myUL');
const search = document.getElementById('search');
const changeOne = document.getElementById('changePlayer1');
changeOne.addEventListener('click', changePlayer);
const changeTwo = document.getElementById('changePlayer2');
changeTwo.addEventListener('click', changePlayer);
search.addEventListener('click', findPlayer)


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
    bar3Data.data.datasets[0].data = [response2.data[0].fg_pct * 100, response2.data[0].fg3_pct * 100, response2.data[0].ft_pct * 100];
    bar3Data.data.datasets[1].data = [response2.data[1].fg_pct * 100, response2.data[1].fg3_pct * 100, response2.data[1].ft_pct * 100];
    radarData.data.datasets[0].data = [response2.data[0].pts, response2.data[0].reb, response2.data[0].blk, response2.data[0].stl, response2.data[0].ast];
    radarData.data.datasets[1].data = [response2.data[1].pts, response2.data[1].reb, response2.data[1].blk, response2.data[1].stl, response2.data[1].ast];
    barChart = new Chart(barCTX, barData);
    bar2Chart = new Chart(bar2CTX, bar2Data);
    bar3Chart = new Chart(bar3CTX, bar3Data);
    radarChart = new Chart(radarCTX, radarData);
    // const line1Chart = new Chart(line1CTX, line1data);
    // const line2Chart = new Chart(line2CTX, line2data);
  },
  error: function (error) {
    console.log(error);
  }
});

$.ajax({
  url: "https://www.balldontlie.io/api/v1/stats",
  type: 'GET',
  data: {
    'player_ids': [player1ID],
    'per_page': 10
  },
  success: function (data) {
    const total_pages = data.meta.total_pages;
    getPlayerGameStats(total_pages, player1ID, 0, 'pts');
  },
  error: function (error) {
    console.log(error);
  }
});

$.ajax({
  url: "https://www.balldontlie.io/api/v1/stats",
  type: 'GET',
  data: {
    'player_ids': [player2ID],
    'per_page': 10
  },
  success: function (data) {
    const total_pages = data.meta.total_pages;
    getPlayerGameStats(total_pages, player2ID, 1, 'pts');
  },
  error: function (error) {
    console.log(error);
  }
});




function findPlayer() {
  dropdown.innerHTML = '';
  $.ajax({
    url: 'https://www.balldontlie.io/api/v1/players',
    type: 'GET',
    data: {
      'search': document.getElementById('searchInput').value,
      'per_page': 100
    },
    success: function (data) {
      response = data;
      for (let i = 0; i < data.data.length; i++) {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.id = data.data[i].id;
        button.textContent = data.data[i].first_name + ' ' + data.data[i].last_name;
        button.addEventListener('click', function (event) {
          if (currentPlayer === 0) {
            player1ID = event.currentTarget.id;
          } else if (currentPlayer === 1) {
            player2ID = event.currentTarget.id;
          }
          getPlayerStats(event.currentTarget, currentPlayer);
          const id = event.currentTarget.id;
          updateLineChart()
          // $.ajax({
          //   url: "https://www.balldontlie.io/api/v1/stats",
          //   type: 'GET',
          //   data: {
          //     'player_ids': [id],
          //     'per_page': 10
          //   },
          //   success: function (data) {
          //     const total_pages = data.meta.total_pages;
          //     console.log(total_pages, id)
          //     getPlayerGameStats(total_pages, id, 0);
          //   },
          //   error: function (error) {
          //     console.log(error);
          //   }
          // });
        })
        item.append(button);
        dropdown.append(item);
      }
      console.log(data);
    },
    error: function (error) {
      console.log(error);
    }
  });
  document.getElementById('searchInput').value = '';
}


function getPlayerStats(player, playerNum) {
  document.getElementById("myUL").innerHTML = '';
  document.getElementById("myUL").className = "noshow";
  $.ajax({
    url: 'https://www.balldontlie.io/api/v1/season_averages',
    type: 'GET',
    data: {
      'player_ids': [player.id],
    },
    success: function (data) {
      console.log(data);
      response2 = data;
      console.log(player)
      const [firstName, lastName] = player.textContent.split(' ');
      barData.data.datasets[playerNum].label = player.textContent;
      bar2Data.data.datasets[playerNum].label = player.textContent;
      bar3Data.data.datasets[playerNum].label = player.textContent;
      radarData.data.datasets[playerNum].label = player.textContent;
      line1data.data.datasets[playerNum].label = player.textContent;
      barChart.update();
      bar2Chart.update();
      bar3Chart.update();
      radarChart.update();
      document.getElementById('img' + (currentPlayer + 1)).src = `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`;
      document.getElementById(`player${currentPlayer + 1}Name`).textContent = player.textContent;
      if (data.data.length === 0) {
        console.log('no regular season average data');
        barData.data.datasets[playerNum].data = [];
        bar2Data.data.datasets[playerNum].data = [];
        bar3Data.data.datasets[playerNum].data = [];
        radarData.data.datasets[playerNum].data = [];
        barChart.update();
        bar2Chart.update();
        bar3Chart.update();
        radarChart.update();
      }
      barData.data.datasets[playerNum].data = [response2.data[0].fgm, response2.data[0].fg3m, response2.data[0].ftm];
      bar2Data.data.datasets[playerNum].data = [response2.data[0].fga, response2.data[0].fg3a, response2.data[0].fta];
      bar3Data.data.datasets[playerNum].data = [response2.data[0].fg_pct * 100, response2.data[0].fg3_pct * 100, response2.data[0].ft_pct * 100];
      radarData.data.datasets[playerNum].data = [response2.data[0].pts, response2.data[0].reb, response2.data[0].blk, response2.data[0].stl, response2.data[0].ast];
      barChart.update();
      bar2Chart.update();
      bar3Chart.update();
      radarChart.update();
    },
    error: function (error) {
      console.log(error);
    }
  });
}


function getPlayerGameStats(lastPage, id, playerNum, stat) {
  const playerGameStats = [];
  $.ajax({
    url: "https://www.balldontlie.io/api/v1/stats",
    type: 'GET',
    data: {
      'player_ids': [id],
      'per_page': 10,
      'page': lastPage - 1
    },
    success: function (data) {
      for (let i = 0; i < data.data.length; i++) {
        playerGameStats.push(data.data[i]);
      }
      $.ajax({
        url: "https://www.balldontlie.io/api/v1/stats",
        type: 'GET',
        data: {
          'player_ids': [id],
          'per_page': 10,
          'page': lastPage
        },
        success: function (data) {
          for (let i = 0; i < data.data.length; i++) {
            playerGameStats.push(data.data[i]);
          }
          while (playerGameStats.length > 10) {
            playerGameStats.shift();
          }
          console.log(playerGameStats);
          for (let i = 0; i < playerGameStats.length; i++) {
            line1data.data.datasets[playerNum].data[i] = playerGameStats[i][stat];
          }
          line1Chart.update();
          // line1Chart = new Chart(line1CTX, line1data);
        },
        error: function (error) {
          console.log(error);
        }
      });
    },
    error: function (error) {
      console.log(error);
    }
  });
}


function myFunction() {
  document.getElementById("myUL").className = "show";
}


function updateLineChart() {
  const stat = document.getElementById('stats').value;
  console.log('hi')
  $.ajax({
    url: "https://www.balldontlie.io/api/v1/stats",
    type: 'GET',
    data: {
      'player_ids': [player1ID],
      'per_page': 10
    },
    success: function (data) {
      const total_pages = data.meta.total_pages;
      getPlayerGameStats(total_pages, player1ID, 0, stat);
    },
    error: function (error) {
      console.log(error);
    }
  });

  $.ajax({
    url: "https://www.balldontlie.io/api/v1/stats",
    type: 'GET',
    data: {
      'player_ids': [player2ID],
      'per_page': 10
    },
    success: function (data) {
      const total_pages = data.meta.total_pages;
      getPlayerGameStats(total_pages, player2ID, 1, stat);
    },
    error: function (error) {
      console.log(error);
    }
  });
}


function changePlayer(event) {
  if (event.currentTarget.id === 'changePlayer2') {
    currentPlayer = 1;
  } else if (event.currentTarget.id === 'changePlayer1') {
    currentPlayer = 0;
  }
  console.log(currentPlayer);
}


$.ajax({
  url: 'https://www.balldontlie.io/api/v1/season_averages',
  type: 'GET',
  data: {
    'player_ids': [14],
  },
  success: function (data) {
    console.log(data.data.length);
  },
  error: function (error) {
    console.log(error);
  }
});

$.ajax({
  url: "https://www.balldontlie.io/api/v1/stats",
  type: 'GET',
  data: {
    'player_ids': [14],
    'per_page': 10
  },
  success: function (data) {
    console.log(data)
  },
  error: function (error) {
    console.log(error);
  }
});
