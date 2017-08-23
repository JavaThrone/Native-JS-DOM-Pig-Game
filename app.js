/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

document.addEventListener('DOMContentLoaded', function (event) {
    startPigGame();
});

var scores, roundScore, activePlayer, dice;

function startPigGame() {
    onClickedStartNewGame();
    document.getElementById('start-new-game').addEventListener("click", onClickedStartNewGame);
    document.getElementById('roll-dice').addEventListener("click", onClickedRoleDice);
    document.getElementById('hold').addEventListener("click", onClickedHold);
}

function onClickedStartNewGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    dice = 0;
    document.getElementById('player-' + 0 + '-panel').classList.remove('active');
    document.getElementById('player-' + 1 + '-panel').classList.remove('active');
    document.getElementById('name-' + 0).classList.remove('winner');
    document.getElementById('name-' + 1).classList.remove('winner');
    document.getElementById('player-' + activePlayer + '-panel').classList.add('active');
    document.getElementById('score-' + 0).innerHTML = scores[0];
    document.getElementById('score-' + 1).innerHTML = scores[1];
    document.getElementById('name-' + 0).innerHTML = 'PLAYER 1';
    document.getElementById('name-' + 1).innerHTML = 'PLAYER 2';
    document.getElementById('current-' + 0).innerHTML = roundScore;
    document.getElementById('current-' + 1).innerHTML = roundScore;
    document.getElementById('img-dice').style.display = 'none';

}

function onClickedRoleDice() {
    // var currentScoreElement = document.getElementById('current-' + activePlayer).innerHTML;
    dice = Math.floor(Math.random() * 6) + 1;
    if (dice !== 1) {
        roundScore = roundScore + dice;
        document.getElementById('current-' + activePlayer).innerHTML = roundScore;
    } else {
        changePlayer();
    }
    document.getElementById('img-dice').src = 'dice-' + dice + '.png';

    if (document.getElementById('img-dice').style.display === 'none') {
        document.getElementById('img-dice').style.display = 'block';
    }
}

function onClickedHold() {
    scores[activePlayer] = scores[activePlayer] + roundScore;
    document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
        document.getElementById('name-' + activePlayer).innerHTML = 'Winner';
        document.getElementById('name-' + activePlayer).classList.add('winner');
    } else {
        changePlayer();
    }


}

function changePlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).innerHTML = roundScore;
    // player-0-panel active
    document.getElementById('player-' + activePlayer + '-panel').classList.remove('active');
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    document.getElementById('player-' + activePlayer + '-panel').classList.add('active');
}

