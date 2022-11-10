/*
 * You are allowed to change the code here.
 * However, you are not allowed to change the signature of the exported functions and objects.
 */

const DELAY_MS = 1000;
const playerStats = {
  Markus: {
    user: 'Markus',
    win: 3,
    lost: 6,
  },
  Michael: {
    user: 'Michael',
    win: 4,
    lost: 5,
  },
  Lisa: {
    user: 'Lisa',
    win: 4,
    lost: 5,
  },
};

// TODO: Update this function to do the right thing
function getRankingsFromPlayerStats() {
  const playerSorted = Object.values(playerStats).sort((a, b) => b.win - a.win);
  const returnArray = [];
  for (let i = 0; i < playerSorted.length; i++) {
    if (playerSorted[i] !== undefined) {
      const playerArray = [];
      playerArray.push(playerSorted[i].user);
      for (let j = i + 1; j < playerSorted.length; j++) {
        if (playerSorted[j].win < playerSorted[i].win) {
          break;
        }
        if (playerSorted[j] !== undefined && playerSorted[i].win === playerSorted[j].win) {
          playerArray.push(playerSorted[j].user);
          playerSorted.splice(j, 1);
        }
      }
      returnArray.push({
        rank: i + 1,
        wins: playerSorted[i].win,
        players: playerArray,
      });
    }
  }
  // magic happens
  return returnArray;
 /* return [
    {
      rank: 1,
      wins: 4,
      players: ['Michael', 'Lisa'],
    },
    {
      rank: 2,
      wins: 3,
      players: ['Markus'],
    },
  ];*/
}

export const HANDS = ['Schere', 'Stein', 'Papier'];

let isConnectedState = false;

export function setConnected(newIsConnected) {
  isConnectedState = Boolean(newIsConnected);
}

export function isConnected() {
  return isConnectedState;
}

export function getRankings(rankingsCallbackHandlerFn) {
  const rankingsArray = getRankingsFromPlayerStats();
  setTimeout(() => rankingsCallbackHandlerFn(rankingsArray), DELAY_MS);
}

const evalLookup = {
  Schere: {
    Schere: 0,
    Stein: -1,
    Papier: 1,
  },
  Stein: {
    Schere: 1,
    Stein: 0,
    Papier: -1,
  },
  Papier: {
    Schere: -1,
    Stein: 1,
    Papier: 0,
  },
};

function getGameEval(playerHand, systemHand) {
  return evalLookup[playerHand][systemHand];
}

export function evaluateHand(playerName, playerHand, gameRecordHandlerCallbackFn) {
  // TODO: Replace calculation of didWin and update rankings while doing so.
  // optional: in local-mode (isConnected == false) store rankings in the browser localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
  const systemHand = HANDS[Math.floor(Math.random() * 3)];
  const gameEval = getGameEval(playerHand, systemHand); // eval and hand do not match yet -> TODO
  console.log(getGameEval(playerHand, systemHand));
  setTimeout(() => gameRecordHandlerCallbackFn({
    playerHand,
    systemHand,
    gameEval,
  }), 0);
}
