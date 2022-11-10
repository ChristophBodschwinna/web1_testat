import {HANDS, isConnected, getRankings, evaluateHand} from './game-service.js';
// TODO: Create DOM references
const gameSection = document.querySelector('#game');
const rankingSection = document.querySelector('#ranking');
const rankingList = document.querySelector('#rankliste');
const goToRanking = document.querySelector('#goToRanking');
const startGame = document.querySelector('#startGame');
const usernameInput = document.querySelector('#usernameInput');
const missingUsername = document.querySelector('#missingUsername');
const buttonStone = document.querySelector('#stone');
const buttonScissors = document.querySelector('#scissors');
const buttonPaper = document.querySelector('#paper');
const historyTable = document.querySelector('#history');
const enemyHand = document.querySelector('#enemy');
const playOption = document.querySelector('#playOption');

// TODO: How to keep track of App state?
// TODO: Create View functions
gameSection.classList.add('hidden');
getRankings((rankings) => rankings.forEach((rankingEntry) => rankingList.innerHTML += `<li> <p> ${rankingEntry.rank} Rang mit ${rankingEntry.wins} Siegen: </p> ${rankingEntry.players}</li>`));

// TODO: Register Event Handlers
// TODO: Replace the following demo code. It should not be included in the final solution


function printResult(playerHand, systemHand, gameEval) {
    enemyHand.innerHTML = systemHand;
    const row = historyTable.insertRow(1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.innerHTML = gameEval;
    cell2.innerHTML = playerHand;
    cell3.innerHTML = systemHand;
}

function playGame(playerHand) {
    console.log('play');
    evaluateHand(usernameInput.value, playerHand, ({
        systemHand,
        gameEval,
    }) => printResult(playerHand, systemHand, gameEval));
}
function playStone() {
    playGame('Stein');
}
function playPaper() {
    playGame('Papier');
}
function playScissors() {
    playGame('Schere');
}
function showList() {
    gameSection.classList.add('hidden');
    rankingSection.classList.remove('hidden');
}
function showGame() {
    gameSection.classList.remove('hidden');
    rankingSection.classList.add('hidden');
}
function checkUsername() {
    if (usernameInput.validity.valid) {
        missingUsername.innerHTML = '';
        showGame();
    } else {
        missingUsername.innerHTML = 'Missing Username';
    }
}

    buttonPaper.addEventListener('click', playPaper);
    buttonScissors.addEventListener('click', playScissors);
    buttonStone.addEventListener('click', playStone);
    goToRanking.addEventListener('click', showList);
    startGame.addEventListener('click', checkUsername);

