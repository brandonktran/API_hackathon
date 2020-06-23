let barChart;
let bar2Chart;
let bar3Chart;
let radarChart;
let line1Chart = new Chart(line1CTX, line1data);
let player1ID = 115;
let player2ID = 237;
let currentPlayer = 0;
const statArray = {
  'GP': 'games_played', 'MIN': 'min', 'PTS': 'pts', 'FGM': 'fgm',
  'FGA': 'fga',
  'FG%': 'fg_pct',
  '3PM': 'fg3m',
  '3PA': 'fg3a',
  '3P%': 'fg3_pct',
  'FTM': 'ftm',
  'FTA': 'fta',
  'FT%': 'ft_pct',
  'OREB': 'oreb',
  'DREB': 'dreb',
  'REB': 'reb',
  'AST': 'ast',
  'TOV': 'turnover',
  'STL': 'stl',
  'BLK': 'blk',
  'SEASON': 'season'
}
const lastSeason = 19;
const position1 = document.getElementById('position1');
const team1 = document.getElementById('team1');
const height1 = document.getElementById('height1');
const weight1 = document.getElementById('weight1');
const position2 = document.getElementById('position2');
const team2 = document.getElementById('team2');
const height2 = document.getElementById('height2');
const weight2 = document.getElementById('weight2');
const dropdown = document.getElementById('myUL');
const search = document.getElementById('search');
const changeOne = document.getElementById('changePlayer1');
changeOne.addEventListener('click', changePlayer);
const changeTwo = document.getElementById('changePlayer2');
changeTwo.addEventListener('click', changePlayer);
search.addEventListener('click', findPlayer);
const season = document.getElementById('season');


$.ajax({
  url: 'https://www.balldontlie.io/api/v1/season_averages',
  type: 'GET',
  data: {
    'player_ids': [115, 237],
  },
  success: function (data) {
    console.log(data);
    barData.data.datasets[0].data = [data.data[0].fgm, data.data[0].fg3m, data.data[0].ftm];
    barData.data.datasets[1].data = [data.data[1].fgm, data.data[1].fg3m, data.data[1].ftm];
    bar2Data.data.datasets[0].data = [data.data[0].fga, data.data[0].fg3a, data.data[0].fta];
    bar2Data.data.datasets[1].data = [data.data[1].fga, data.data[1].fg3a, data.data[1].fta];
    bar3Data.data.datasets[0].data = [data.data[0].fg_pct * 100, data.data[0].fg3_pct * 100, data.data[0].ft_pct * 100];
    bar3Data.data.datasets[1].data = [data.data[1].fg_pct * 100, data.data[1].fg3_pct * 100, data.data[1].ft_pct * 100];
    radarData.data.datasets[0].data = [data.data[0].pts, data.data[0].reb, data.data[0].blk, data.data[0].stl, data.data[0].ast];
    radarData.data.datasets[1].data = [data.data[1].pts, data.data[1].reb, data.data[1].blk, data.data[1].stl, data.data[1].ast];
    createTable(data, 0, 0, 'Stephen Curry');
    createTable(data, 1, 1, 'Lebron James');
    barChart = new Chart(barCTX, barData);
    bar2Chart = new Chart(bar2CTX, bar2Data);
    bar3Chart = new Chart(bar3CTX, bar3Data);
    radarChart = new Chart(radarCTX, radarData);
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
      for (let i = 0; i < data.data.length; i++) {
        const item = document.createElement('li');
        const button = document.createElement('button');
        const playerProf = data.data[i];
        button.id = data.data[i].id;
        button.textContent = data.data[i].first_name + ' ' + data.data[i].last_name;
        button.addEventListener('click', function (event) {
          if (currentPlayer === 0) {
            // data.data.height_feet height_inches position team.full_name weight_pounds
            player1ID = event.currentTarget.id;
            weight1.textContent = playerProf.weight_pounds;
            height1.textContent = playerProf.height_feet + 'feet' + ' ' + playerProf.height_inches + ' inches';
            team1.textContent = playerProf.team.full_name;
            position1.textContent = playerProf.position;
          } else if (currentPlayer === 1) {
            player2ID = event.currentTarget.id;
            weight2.textContent = playerProf.weight_pounds;
            height2.textContent = playerProf.height_feet + 'feet' + ' ' + playerProf.height_inches + ' inches';
            team2.textContent = playerProf.team.full_name;
            position2.textContent = playerProf.position;
          }
          getPlayerStats(event.currentTarget, currentPlayer);
          const id = event.currentTarget.id;
          updateLineChart()
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
      'season': season.value
    },
    success: function (data) {
      console.log(data.data[0].season);
      console.log(player)
      const [firstName, lastName] = player.textContent.split(' ');
      barData.data.datasets[playerNum].label = data.data[0].season + ' ' + player.textContent;
      bar2Data.data.datasets[playerNum].label = data.data[0].season + ' ' + player.textContent;
      bar3Data.data.datasets[playerNum].label = data.data[0].season + ' ' + player.textContent;
      radarData.data.datasets[playerNum].label = data.data[0].season + ' ' + player.textContent;
      line1data.data.datasets[playerNum].label = player.textContent;
      barChart.update();
      bar2Chart.update();
      bar3Chart.update();
      radarChart.update();
      createTable(data, currentPlayer, 0, player.textContent);
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
      barData.data.datasets[playerNum].data = [data.data[0].fgm, data.data[0].fg3m, data.data[0].ftm];
      bar2Data.data.datasets[playerNum].data = [data.data[0].fga, data.data[0].fg3a, data.data[0].fta];
      bar3Data.data.datasets[playerNum].data = [data.data[0].fg_pct * 100, data.data[0].fg3_pct * 100, data.data[0].ft_pct * 100];
      radarData.data.datasets[playerNum].data = [data.data[0].pts, data.data[0].reb, data.data[0].blk, data.data[0].stl, data.data[0].ast];
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


function searchForPlayer() {
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


function createTable(data, currentPlayer, index, name) {
  let row;
  if (currentPlayer === 0) {
    row = document.getElementById('firstRow');
    row.innerHTML = '';
  } else if (currentPlayer === 1) {
    row = document.getElementById('secondRow');
    row.innerHTML = '';
  }
  const first = document.createElement('td');
  first.textContent = name;
  row.append(first);
  for (let prop in statArray) {
    const elem = document.createElement('td');
    elem.textContent = data.data[index][statArray[prop]];
    row.append(elem);
  }
}


function createSeasonDropdown() {
  const dropdown = document.getElementById('season');
  for (let i = lastSeason; i > 0; i--) {
    const elem = document.createElement('option');
    if (i.length < 2) {
      elem.value = '20' + '0' + i;
    } else {
      elem.value = elem.value = '20' + i;
    }
    elem.textContent = `'${i}` + `-'${i + 1}`;
    dropdown.append(elem);
  }
}

createSeasonDropdown()


// $.ajax({
//   url: 'https://www.balldontlie.io/api/v1/season_averages',
//   type: 'GET',
//   data: {
//     'player_ids': [115],
//     'season': 2014
//   },
//   success: function (data) {
//     console.log(data);
//   },
//   error: function (error) {
//     console.log(error);
//   }
// });

// $.ajax({
//   url: "https://www.balldontlie.io/api/v1/stats",
//   type: 'GET',
//   data: {
//     'player_ids': [14],
//     'per_page': 10
//   },
//   success: function (data) {
//     console.log(data)
//   },
//   error: function (error) {
//     console.log(error);
//   }
// });


$.ajax({
  url: 'https://www.balldontlie.io/api/v1/players',
  type: 'GET',
  data: {
    'search': 'lebron james',
    'per_page': 100
  },
  success: function (data) {
    console.log(data);
  },
  error: function (error) {
    console.log(error);
  }
});

// data.data.height_feet height_inches position team.full_name weight_pounds
