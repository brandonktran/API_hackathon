let response;
let response2;
let player1ID;
let player1GameStats = [];
const dropdown = document.getElementById('myUL');
const search = document.getElementById('search');
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
    const barChart = new Chart(barCTX, barData);
    const bar2Chart = new Chart(bar2CTX, bar2Data);
    const bar3Chart = new Chart(bar3CTX, bar3Data);
    const radarChart = new Chart(radarCTX, radarData);
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
    'player_ids': [192],
    'per_page': 10
  },
  success: function (data) {
    total_pages = data.meta.total_pages;
    console.log(total_pages)
    getPlayerGameStats(total_pages, 192);
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
          console.log(event.currentTarget)
          getPlayerStats(event.currentTarget);
        })
        item.append(button);
        dropdown.append(item);
      }
      player1ID = response.data[0].id;
      console.log(data);
    },
    error: function (error) {
      console.log(error);
    }
  });
  document.getElementById('searchInput').value = '';
}


function getPlayerStats(player) {
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
      document.getElementById('img1').src = `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`;
      document.getElementById('player1Name').textContent = player.textContent;
      barData.data.datasets[0].data = [response2.data[0].fgm, response2.data[0].fg3m, response2.data[0].ftm];
      bar2Data.data.datasets[0].data = [response2.data[0].fga, response2.data[0].fg3a, response2.data[0].fta];
      bar3Data.data.datasets[0].data = [response2.data[0].fg_pct * 100, response2.data[0].fg3_pct * 100, response2.data[0].ft_pct * 100];
      radarData.data.datasets[0].data = [response2.data[0].pts, response2.data[0].reb, response2.data[0].blk, response2.data[0].stl, response2.data[0].ast];
      barData.data.datasets[0].label = player.textContent;
      bar2Data.data.datasets[0].label = player.textContent;
      bar3Data.data.datasets[0].label = player.textContent;
      radarData.data.datasets[0].label = player.textContent;
      const barChart = new Chart(barCTX, barData);
      const bar2Chart = new Chart(bar2CTX, bar2Data);
      const bar3Chart = new Chart(bar3CTX, bar3Data);
      const radarChart = new Chart(radarCTX, radarData);
    },
    error: function (error) {
      console.log(error);
    }
  });
}


function getPlayerGameStats(lastPage, id) {
  $.ajax({
    url: "https://www.balldontlie.io/api/v1/stats",
    type: 'GET',
    data: {
      'player_ids': [192],
      'per_page': 10,
      'page': lastPage - 1
    },
    success: function (data) {
      for (let i = 0; i < data.data.length; i++) {
        player1GameStats.push(data.data[i]);
      }
      console.log(data);
      $.ajax({
        url: "https://www.balldontlie.io/api/v1/stats",
        type: 'GET',
        data: {
          'player_ids': [192],
          'per_page': 10,
          'page': lastPage
        },
        success: function (data) {
          for (let i = 0; i < data.data.length; i++) {
            player1GameStats.push(data.data[i]);
          }
          while (player1GameStats.length > 10) {
            player1GameStats.shift();
          }
          console.log(player1GameStats);
          for (let i = 0; i < player1GameStats.length; i++) {
            line1data.data.datasets[0].data[i] = player1GameStats[i].pts;
          }
          const line1Chart = new Chart(line1CTX, line1data);
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
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
