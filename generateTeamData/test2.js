// function findPlayer() {
//     dropdown.innerHTML = '';
//     $.ajax({
//         url: 'https://www.balldontlie.io/api/v1/players',
//         type: 'GET',
//         data: {
//             'search': document.getElementById('searchInput').value,
//             'per_page': 100
//         },
//         success: function (data) {
//             for (let i = 0; i < data.data.length; i++) {
//                 const item = document.createElement('li');
//                 const button = document.createElement('button');
//                 const playerProf = data.data[i];
//                 button.id = data.data[i].id;
//                 button.textContent = data.data[i].first_name + ' ' + data.data[i].last_name;
//                 button.addEventListener('click', function (event) {
//                     if (currentPlayer === 0) {
//                         // data.data.height_feet height_inches position team.full_name weight_pounds
//                         player1ID = event.currentTarget.id;
//                         weight1.textContent = playerProf.weight_pounds;
//                         height1.textContent = playerProf.height_feet + 'feet' + ' ' + playerProf.height_inches + ' inches';
//                         team1.textContent = playerProf.team.full_name;
//                         position1.textContent = playerProf.position;
//                     } else if (currentPlayer === 1) {
//                         player2ID = event.currentTarget.id;
//                         weight2.textContent = playerProf.weight_pounds;
//                         height2.textContent = playerProf.height_feet + 'feet' + ' ' + playerProf.height_inches + ' inches';
//                         team2.textContent = playerProf.team.full_name;
//                         position2.textContent = playerProf.position;
//                     }
//                     getPlayerStats(event.currentTarget, currentPlayer);
//                     const id = event.currentTarget.id;
//                     updateLineChart()
//                 })
//                 item.append(button);
//                 dropdown.append(item);
//             }
//             console.log(data);
//         },
//         error: function (error) {
//             console.log(error);
//         }
//     });
//     document.getElementById('searchInput').value = '';
// }

// function getPlayerGameStats(lastPage, id, playerNum, stat) {
//     const playerGameStats = [];
//     $.ajax({
//         url: "https://www.balldontlie.io/api/v1/stats",
//         type: 'GET',
//         data: {
//             'player_ids': [id],
//             'per_page': 10,
//             'page': lastPage - 1
//         },
//         success: function (data) {
//             for (let i = 0; i < data.data.length; i++) {
//                 playerGameStats.push(data.data[i]);
//             }
//             $.ajax({
//                 url: "https://www.balldontlie.io/api/v1/stats",
//                 type: 'GET',
//                 data: {
//                     'player_ids': [id],
//                     'per_page': 10,
//                     'page': lastPage
//                 },
//                 success: function (data) {
//                     for (let i = 0; i < data.data.length; i++) {
//                         playerGameStats.push(data.data[i]);
//                     }
//                     while (playerGameStats.length > 10) {
//                         playerGameStats.shift();
//                     }
//                     console.log(playerGameStats);
//                     for (let i = 0; i < playerGameStats.length; i++) {
//                         line1data.data.datasets[playerNum].data[i] = playerGameStats[i][stat];
//                     }
//                     line1Chart.update();
//                     // line1Chart = new Chart(line1CTX, line1data);
//                 },
//                 error: function (error) {
//                     console.log(error);
//                 }
//             });
//         },
//         error: function (error) {
//             console.log(error);
//         }
//     });
// }



// function updateLineChart() {
//     const stat = document.getElementById('stats').value;
//     console.log('hi')
//     $.ajax({
//         url: "https://www.balldontlie.io/api/v1/stats",
//         type: 'GET',
//         data: {
//             'player_ids': [player1ID],
//             'per_page': 10
//         },
//         success: function (data) {
//             const total_pages = data.meta.total_pages;
//             getPlayerGameStats(total_pages, player1ID, 0, stat);
//         },
//         error: function (error) {
//             console.log(error);
//         }
//     });

//     $.ajax({
//         url: "https://www.balldontlie.io/api/v1/stats",
//         type: 'GET',
//         data: {
//             'player_ids': [player2ID],
//             'per_page': 10
//         },
//         success: function (data) {
//             const total_pages = data.meta.total_pages;
//             getPlayerGameStats(total_pages, player2ID, 1, stat);
//         },
//         error: function (error) {
//             console.log(error);
//         }
//     });
// }
