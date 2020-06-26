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
const changeOne = document.getElementById('changePlayer1');
changeOne.addEventListener('click', changePlayer);
const changeTwo = document.getElementById('changePlayer2');
changeTwo.addEventListener('click', changePlayer);
const lineStat = document.getElementById('stats');
lineStat.addEventListener('change', updateLineChart);
const body = document.querySelector('body');


$.ajax({
  url: 'https://www.balldontlie.io/api/v1/season_averages',
  type: 'GET',
  data: {
    'player_ids': [115, 237],
  },
  beforeSend: function () {
    body.style.cursor = 'wait';
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
  },
  complete: function () {
    body.style.cursor = 'default';
  }
});

$.ajax({
  url: "https://www.balldontlie.io/api/v1/stats",
  type: 'GET',
  data: {
    'player_ids': [player1ID],
    'per_page': 10
  },
  beforeSend: function () {
    body.style.cursor = 'wait';
  },
  success: function (data) {
    const total_pages = data.meta.total_pages;
    getPlayerGameStats(total_pages, player1ID, 0, 'pts');
  },
  error: function (error) {
    console.log(error);
  },
  complete: function () {
    body.style.cursor = 'default';
  }
});

$.ajax({
  url: "https://www.balldontlie.io/api/v1/stats",
  type: 'GET',
  data: {
    'player_ids': [player2ID],
    'per_page': 10
  },
  beforeSend: function () {
    body.style.cursor = 'wait';
  },
  success: function (data) {
    const total_pages = data.meta.total_pages;
    getPlayerGameStats(total_pages, player2ID, 1, 'pts');
  },
  error: function (error) {
    console.log(error);
  },
  complete: function () {
    body.style.cursor = 'default';
  }
});




function findPlayer() {
  const dropdown = document.getElementById('myUL');
  dropdown.innerHTML = '';
  $.ajax({
    url: 'https://www.balldontlie.io/api/v1/players',
    type: 'GET',
    data: {
      'search': document.getElementById('searchInput').value,
      'per_page': 100
    },
    beforeSend: function () {
      body.style.cursor = 'wait';
    },
    success: function (data) {
      console.log(data)
      for (let i = 0; i < data.data.length; i++) {
        const button = document.createElement('li');
        const playerProf = data.data[i];
        button.id = data.data[i].id;
        button.textContent = data.data[i].first_name + ' ' + data.data[i].last_name;
        button.addEventListener('click', function (event) {
          if (currentPlayer === 0) {
            // data.data.height_feet height_inches position team.full_name weight_pounds
            player1ID = event.currentTarget.id;
            weight1.textContent = playerProf.weight_pounds || 'No data found';
            if (playerProf.height_feet === null) {
              height1.textContent = 'No data found';
            } else {
              height1.textContent = `${playerProf.height_feet} feet ${playerProf.height_inches} inches`
            }
            team1.textContent = playerProf.team.full_name || 'No data found';
            position1.textContent = playerProf.position || 'No data found';
          } else if (currentPlayer === 1) {
            player2ID = event.currentTarget.id;
            weight2.textContent = playerProf.weight_pounds || 'No data found';
            if (playerProf.height_feet === null) {
              height2.textContent = ' ';
            } else {
              height2.textContent = `${playerProf.height_feet} feet ${playerProf.height_inches} inches`
            }
            team2.textContent = playerProf.team.full_name || 'No data found';
            position2.textContent = playerProf.position || 'No data found';
          }
          console.log(playerProf.team.abbreviation)
          getPlayerStats(event.currentTarget, currentPlayer, playerProf.team.abbreviation);
          const id = event.currentTarget.id;
          updateLineChart()
        })
        dropdown.append(button);
        dropdown.className = "show";
      }
    },
    error: function (error) {
      console.log(error);
    },
    complete: function () {
      body.style.cursor = 'default';
    }
  });
  document.getElementById('searchInput').value = '';
}


function getPlayerStats(player, playerNum, team) {
  const season = document.getElementById('season');
  document.getElementById("myUL").innerHTML = '';
  document.getElementById("myUL").className = "noshow";
  $.ajax({
    url: 'https://www.balldontlie.io/api/v1/season_averages',
    type: 'GET',
    data: {
      'player_ids': [player.id],
      'season': season.value
    },
    beforeSend: function () {
      body.style.cursor = 'wait';
    },
    success: function (data) {
      console.log('hi')
      console.log(data);
      // console.log(data.data[0].season);
      console.log(player)
      const [firstName, lastName] = player.textContent.split(' ');
      barData.data.datasets[playerNum].label = season.value + ' ' + player.textContent;
      bar2Data.data.datasets[playerNum].label = season.value + ' ' + player.textContent;
      bar3Data.data.datasets[playerNum].label = season.value + ' ' + player.textContent;
      radarData.data.datasets[playerNum].label = season.value + ' ' + player.textContent;
      line1data.data.datasets[playerNum].label = player.textContent;
      barChart.update();
      bar2Chart.update();
      bar3Chart.update();
      radarChart.update();
      document.getElementById(`firstname${currentPlayer + 1}`).textContent = firstName.toUpperCase();
      document.getElementById(`lastname${currentPlayer + 1}`).textContent = lastName.toUpperCase();
      flip();
      const searchMenu = document.getElementById(`searchMenu${currentPlayer + 1}`);
      searchMenu.innerHTML = '';
      const playerbutton = document.getElementById(`changePlayer${currentPlayer + 1}`);
      playerbutton.style.display = '';
      searchMenu.classList.add('noshow');
      if (data.data.length === 0) {
        console.log('no player data for this season');
        barData.data.datasets[playerNum].data = [];
        bar2Data.data.datasets[playerNum].data = [];
        bar3Data.data.datasets[playerNum].data = [];
        radarData.data.datasets[playerNum].data = [];
        document.getElementById('img' + (currentPlayer + 1)).src = `http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${team.toLowerCase()}.png`;
        barChart.update();
        bar2Chart.update();
        bar3Chart.update();
        radarChart.update();
        createTable(data, currentPlayer, 0, player.textContent);
      } else {
        createTable(data, currentPlayer, 0, player.textContent);
        document.getElementById('img' + (currentPlayer + 1)).src = `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`;
        barData.data.datasets[playerNum].data = [data.data[0].fgm, data.data[0].fg3m, data.data[0].ftm];
        bar2Data.data.datasets[playerNum].data = [data.data[0].fga, data.data[0].fg3a, data.data[0].fta];
        bar3Data.data.datasets[playerNum].data = [data.data[0].fg_pct * 100, data.data[0].fg3_pct * 100, data.data[0].ft_pct * 100];
        radarData.data.datasets[playerNum].data = [data.data[0].pts, data.data[0].reb, data.data[0].blk, data.data[0].stl, data.data[0].ast];
        barChart.update();
        bar2Chart.update();
        bar3Chart.update();
        radarChart.update();
      }
    },
    error: function (error) {
      console.log(error);
    },
    complete: function () {
      body.style.cursor = 'default';
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
    beforeSend: function () {
      body.style.cursor = 'wait';
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
    },
    complete: function () {
      body.style.cursor = 'default';
    }
  });
}


// function searchForPlayer() {
//   document.getElementById("myUL").className = "show";
// }


function updateLineChart() {
  const stat = document.getElementById('stats').value;
  $.ajax({
    url: "https://www.balldontlie.io/api/v1/stats",
    type: 'GET',
    data: {
      'player_ids': [player1ID],
      'per_page': 10
    },
    beforeSend: function () {
      body.style.cursor = 'wait';
    },
    success: function (data) {
      const total_pages = data.meta.total_pages;
      getPlayerGameStats(total_pages, player1ID, 0, stat);
    },
    error: function (error) {
      console.log(error);
    },
    complete: function () {
      body.style.cursor = 'default';
    }
  });

  $.ajax({
    url: "https://www.balldontlie.io/api/v1/stats",
    type: 'GET',
    data: {
      'player_ids': [player2ID],
      'per_page': 10
    },
    beforeSend: function () {
      body.style.cursor = 'wait';
    },
    success: function (data) {
      const total_pages = data.meta.total_pages;
      getPlayerGameStats(total_pages, player2ID, 1, stat);
    },
    error: function (error) {
      console.log(error);
    },
    complete: function () {
      body.style.cursor = 'default';
    }
  });
}


function changePlayer(event) {
  if (event.currentTarget.id === 'changePlayer2') {
    currentPlayer = 1;
    const searchMenu = document.getElementById(`searchMenu1`);
    searchMenu.innerHTML = '';
    const playerbutton = document.getElementById(`changePlayer1`);
    playerbutton.style.display = '';
    searchMenu.classList.add('noshow');
  } else if (event.currentTarget.id === 'changePlayer1') {
    currentPlayer = 0;
    const searchMenu = document.getElementById(`searchMenu2`);
    searchMenu.innerHTML = '';
    const playerbutton = document.getElementById(`changePlayer2`);
    playerbutton.style.display = '';
    searchMenu.classList.add('noshow');
  }
  const searchMenu = document.getElementById(`searchMenu${currentPlayer + 1}`)
  searchMenu.innerHTML = '';
  // const item = document.createElement('li');
  // item.textContent = 'Search for a Player Above'
  // dropdown.append(item);
  // dropdown.className = "show";
  console.log(currentPlayer);
  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown';
  const myDropdown = document.createElement('div');
  myDropdown.className = 'dropdown-content';
  myDropdown.id = 'myDropdown';
  dropdown.append(myDropdown);
  const searchInput = document.createElement('input');
  searchInput.id = 'searchInput';
  searchInput.type = 'text';
  searchInput.placeholder = 'Search for a player..'
  // searchInput.addEventListener('click', searchForPlayer);
  myDropdown.append(searchInput);
  const search = document.createElement('button');
  search.id = 'search';
  search.className = 'btn1 black';
  search.textContent = 'Search';
  search.addEventListener('click', findPlayer);
  myDropdown.append(search);
  const myUL = document.createElement('ul');
  myUL.id = 'myUL'
  myUL.className = 'noshow';
  myDropdown.append(myUL);
  const labelSeason = document.createElement('label');
  labelSeason.id = 'labelSeason';
  labelSeason.textContent = 'Season:'
  dropdown.append(labelSeason);
  const season = document.createElement('select');
  season.id = 'season';
  dropdown.append(season);
  searchMenu.append(dropdown);
  createSeasonDropdown(season)
  const playerbutton = document.getElementById(`changePlayer${currentPlayer + 1}`);
  playerbutton.style.display = 'none';
  searchMenu.classList.remove('noshow');
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
  if (data.data.length !== 0) {
    for (let prop in statArray) {
      const elem = document.createElement('td');
      elem.textContent = data.data[index][statArray[prop]];
      row.append(elem);
    }
  } else {
    const elem = document.createElement('td');
    elem.colSpan = 20;
    elem.textContent = 'No season averages data found for selected season & player';
    elem.style.color = 'red'
    row.append(elem);
  }
}


function createSeasonDropdown(season) {
  for (let i = lastSeason; i > 0; i--) {
    const elem = document.createElement('option');
    if (i.length < 2) {
      elem.value = '20' + '0' + i;
    } else {
      elem.value = elem.value = '20' + i;
    }
    elem.textContent = `'${i}` + `-'${i + 1}`;
    season.append(elem);
  }
}

function flip() {
  if (currentPlayer === 0) {
    $('.card1').toggleClass('flipped');
  } else if (currentPlayer === 1) {
    $('.card2').toggleClass('flipped');
  }

}
