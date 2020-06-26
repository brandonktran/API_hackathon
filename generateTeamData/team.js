let barChart;
let bar2Chart;
let bar3Chart;
let radarChart;
// let line1Chart = new Chart(line1CTX, line1data);
let player1ID = 115;
let player2ID = 237;
let currentPlayer = 0;
const statArray = {
    'MIN': 'min', 'PPG': 'ppg', 'OPPG': 'oppg',
    'FG%': 'fgp',
    'FT%': 'ftp',
    'ORPG': 'orpg',
    'DREBPG': 'drpg',
    'RPG': 'trpg',
    'APG': 'apg',
    'TOVPG': 'tpg',
    'STLPG': 'spg',
    'BLKPG': 'bpg'
    // 'SEASON':
}
const teams = [{ teamID: "1610612737", abbreviation: "ATL", name: "Atlanta Hawks" },
{ teamID: "1610612738", abbreviation: "BOS", name: "Boston Celtics" },
{ teamID: "1610612739", abbreviation: "CLE", name: "Cleveland Cavaliers" },
{ teamID: "1610612740", abbreviation: "NOP", name: "New Orleans Pelicans" },
{ teamID: "1610612741", abbreviation: "CHI", name: "Chicago Bulls" },
{ teamID: "1610612742", abbreviation: "DAL", name: "Dallas Mavericks" },
{ teamID: "1610612743", abbreviation: "DEN", name: "Denver Nuggets" },
{ teamID: "1610612744", abbreviation: "GSW", name: "Golden State Warriors" },
{ teamID: "1610612745", abbreviation: "HOU", name: "Houston Rockets" },
{ teamID: "1610612746", abbreviation: "LAC", name: "LA Clippers" },
{ teamID: "1610612747", abbreviation: "LAL", name: "Los Angeles Lakers" },
{ teamID: "1610612748", abbreviation: "MIA", name: "Miami Heat" },
{ teamID: "1610612749", abbreviation: "MIL", name: "Milwaukee Bucks" },
{ teamID: "1610612750", abbreviation: "MIN", name: "Minnesota Timberwolves" },
{ teamID: "1610612751", abbreviation: "BKN", name: "Brooklyn Nets" },
{ teamID: "1610612752", abbreviation: "NYK", name: "New York Knicks" },
{ teamID: "1610612753", abbreviation: "ORL", name: "Orlando Magic" },
{ teamID: "1610612754", abbreviation: "IND", name: "Indiana Pacers" },
{ teamID: "1610612755", abbreviation: "PHI", name: "Philadelphia 76ers" },
{ teamID: "1610612756", abbreviation: "PHX", name: "Phoenix Suns" },
{ teamID: "1610612757", abbreviation: "POR", name: "Portland Trail Blazers" },
{ teamID: "1610612758", abbreviation: "SAC", name: "Sacramento Kings" },
{ teamID: "1610612759", abbreviation: "SAS", name: "San Antonio Spurs" },
{ teamID: "1610612760", abbreviation: "OKC", name: "Oklahoma City Thunder" },
{ teamID: "1610612761", abbreviation: "TOR", name: "Toronto Raptors" },
{ teamID: "1610612762", abbreviation: "UTA", name: "Utah Jazz" },
{ teamID: "1610612763", abbreviation: "MEM", name: "Memphis Grizzlies" },
{ teamID: "1610612764", abbreviation: "WAS", name: "Washington Wizards" },
{ teamID: "1610612765", abbreviation: "DET", name: "Detroit Pistons" },
{ teamID: "1610612766", abbreviation: "CHA", name: "Charlotte Hornets" }]
const lastSeason = 19;
const position1 = document.getElementById('position1');
const position2 = document.getElementById('position2');
// const dropdown = document.getElementById('myUL');
// const search = document.getElementById('search');
const changeOne = document.getElementById('changePlayer1');
changeOne.addEventListener('click', changePlayer);
const changeTwo = document.getElementById('changePlayer2');
changeTwo.addEventListener('click', changePlayer);
// const season = document.getElementById('season');
// const searchInput = document.getElementById('searchInput');
// searchInput.addEventListener('click', searchForPlayer);
// searchInput.addEventListener('keyup', filterFunction)
const body = document.querySelector('body');

$.ajax({
    url: 'https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2019/team_stats_rankings.json',
    type: 'GET',
    beforeSend: function () {
        body.style.cursor = 'wait';
    },
    success: function (data) {
        let team = data.league.standard.regularSeason.teams
        for (let i = 0; i < team.length; i++) {
            if (team[i].abbreviation === 'LAC') {
                team = team[i];
            }
        }
        console.log(team);
        barData.data.datasets[0].data = [team.fgp.avg * 100, team.ftp.avg * 100];
        bar2Data.data.datasets[0].data = [team.ppg.avg, team.oppg.avg];
        bar3Data.data.datasets[0].data = [team.eff.avg];
        radarData.data.datasets[0].data = [team.ppg.avg, team.trpg.avg, team.bpg.avg, team.spg.avg, team.apg.avg];
        createTable(team, 0, 'Los Angeles Clippers');
    },
    error: function (error) {
        console.log(error);
    },
    complete: function () {
        body.style.cursor = 'default';
    }
});

$.ajax({
    url: 'https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2019/team_stats_rankings.json',
    type: 'GET',
    beforeSend: function () {
        body.style.cursor = 'wait';
    },
    success: function (data) {
        let team = data.league.standard.regularSeason.teams
        for (let i = 0; i < team.length; i++) {
            if (team[i].abbreviation === 'LAL') {
                team = team[i];
            }
        }
        console.log(team);
        barData.data.datasets[1].data = [team.fgp.avg * 100, team.ftp.avg * 100];
        bar2Data.data.datasets[1].data = [team.ppg.avg, team.oppg.avg];
        bar3Data.data.datasets[1].data = [team.eff.avg];
        radarData.data.datasets[1].data = [team.ppg.avg, team.trpg.avg, team.bpg.avg, team.spg.avg, team.apg.avg];
        barChart = new Chart(barCTX, barData);
        bar2Chart = new Chart(bar2CTX, bar2Data);
        bar3Chart = new Chart(bar3CTX, bar3Data);
        radarChart = new Chart(radarCTX, radarData);
        createTable(team, 1, 'Los Angeles Lakers');
    },
    error: function (error) {
        console.log(error);
    },
    complete: function () {
        body.style.cursor = 'default';
    }
});

function searchForPlayer() {
    document.getElementById("myUL").className = "show";
}


function getPlayerStats(player, playerNum) {
    document.getElementById("myUL").className = "noshow";
    const dropdown = document.querySelector('.dropdown')
    dropdown.classList.add('noshow');
    const playerbutton = document.getElementById(`changePlayer${currentPlayer + 1}`);
    playerbutton.style.display = '';
    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/${season.value}/team_stats_rankings.json`,
        type: 'GET',
        beforeSend: function () {
            body.style.cursor = 'wait';
        },
        success: function (data) {
            let team = data.league.standard.regularSeason.teams
            for (let i = 0; i < team.length; i++) {
                if (team[i].abbreviation === player) {
                    team = team[i];
                }
            }
            console.log(team);
            barData.data.datasets[playerNum].data = [team.fgp.avg * 100, team.ftp.avg * 100];
            bar2Data.data.datasets[playerNum].data = [team.ppg.avg, team.oppg.avg];
            bar3Data.data.datasets[playerNum].data = [team.eff.avg];
            radarData.data.datasets[playerNum].data = [team.ppg.avg, team.trpg.avg, team.bpg.avg, team.spg.avg, team.apg.avg];
            createTable(team, playerNum, team.name + ' ' + team.nickname);
            barChart.update();
            bar2Chart.update();
            bar3Chart.update();
            radarChart.update();


            barData.data.datasets[playerNum].label = season.value + ' ' + team.name + ' ' + team.nickname;
            bar2Data.data.datasets[playerNum].label = season.value + ' ' + team.name + ' ' + team.nickname;
            bar3Data.data.datasets[playerNum].label = season.value + ' ' + team.name + ' ' + team.nickname;
            radarData.data.datasets[playerNum].label = season.value + ' ' + team.name + ' ' + team.nickname;
            // line1data.data.datasets[playerNum].label = team.name + ' ' + team.nickname;
            barChart.update();
            bar2Chart.update();
            bar3Chart.update();
            radarChart.update();
            document.getElementById('img' + (currentPlayer + 1)).src = `http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${team.abbreviation.toLowerCase()}.png`;
            document.getElementById(`player${currentPlayer + 1}Name`).textContent = team.name + ' ' + team.nickname;
            flip();
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

    console.log(currentPlayer);
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    dropdown.classList.remove('noshow');
    const myDropdown = document.createElement('div');
    myDropdown.className = 'dropdown-content';
    myDropdown.id = 'myDropdown';
    dropdown.append(myDropdown);
    const searchInput = document.createElement('input');
    searchInput.id = 'searchInput';
    searchInput.type = 'text';
    searchInput.placeholder = 'Search for a team..'
    searchInput.addEventListener('click', searchForPlayer);
    searchInput.addEventListener('keyup', filterFunction)
    myDropdown.append(searchInput);
    // const search = document.createElement('button');
    // search.id = 'search';
    // search.className = 'btn black';
    // search.textContent = 'Search';
    // myDropdown.append(search);
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
    createSeasonDropdown()
    createTeamDropDown();
    searchMenu.classList.remove('noshow');

}


function createTable(data, currentPlayer, name) {
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
        elem.textContent = data[statArray[prop]].avg;
        row.append(elem);
    }
}


function createSeasonDropdown() {
    const dropdown = document.getElementById('season');
    for (let i = lastSeason; i > 17; i--) {
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


function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("li");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function createTeamDropDown() {
    const dropdown = document.getElementById('myUL');
    for (let i = 0; i < teams.length; i++) {
        const item = document.createElement('li');
        item.textContent = teams[i].name;
        item.addEventListener('click', function () {
            getPlayerStats(teams[i].abbreviation, currentPlayer)
        });
        item.id = teams[i].abbreviation;
        dropdown.append(item);
    }
}

function flip() {
    if (currentPlayer === 0) {
        $('.card1').toggleClass('flipped');
    } else if (currentPlayer === 1) {
        $('.card2').toggleClass('flipped');
    }

}
