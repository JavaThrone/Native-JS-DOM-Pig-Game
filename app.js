/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- A player looses his ENTIRE score when he rolls two 6 in a row for any of th dice. After that, it's the next player's turn.
- Players can set the winning score, so that they can change the predefined score of 100.
- There are two dices. The player looses his current score when one of them is a 1.
*/

document.addEventListener('DOMContentLoaded', function (event) {
    startPigGame();
});

var gamePlaying, scores, roundScore, activePlayer, firstDice, secondDice, numberSixInRowForFirstDice, numberSixInRowForSecondDice, scoreToWin;

function startPigGame() {
    initGame();
    document.getElementById('score').addEventListener("focusout", onFocusOutScour);
    document.getElementById('start-new-game').addEventListener("click", onClickedStartNewGame);
    document.getElementById('roll-dice').addEventListener("click", onClickedRoleDice);
    document.getElementById('hold').addEventListener("click", onClickedHold);
}

function onFocusOutScour() {
    var newScoreToWin = document.getElementById('score').value;
    if (!isNaN(newScoreToWin) && newScoreToWin > 0) {
        scoreToWin = newScoreToWin;
        document.getElementById('text-score').innerHTML = 'Input require scour to win,<br/> current scour is ' + newScoreToWin;
    }
}

function onClickedStartNewGame() {
    if (!gamePlaying) {
        initGame();
    }
}

function initGame() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    firstDice = 0;
    secondDice = 0;
    numberSixInRowForFirstDice = 0;
    numberSixInRowForSecondDice = 0;
    scoreToWin = 100;
    document.getElementById('player-' + 0 + '-panel').classList.remove('active');
    document.getElementById('player-' + 1 + '-panel').classList.remove('active');
    document.getElementById('name-' + 0).classList.remove('winner');
    document.getElementById('name-' + 1).classList.remove('winner');
    document.getElementById('player-' + activePlayer + '-panel').classList.add('active');
    document.getElementById('score-' + 0).textContent = scores[0];
    document.getElementById('score-' + 1).textContent = scores[1];
    document.getElementById('name-' + 0).textContent = 'PLAYER 1';
    document.getElementById('name-' + 1).textContent = 'PLAYER 2';
    document.getElementById('current-' + 0).textContent = roundScore;
    document.getElementById('current-' + 1).textContent = roundScore;
    document.getElementById('img-first-dice').style.display = 'none';
    document.getElementById('img-second-dice').style.display = 'none';
}

function onClickedRoleDice() {
    // var currentScoreElement = document.getElementById('current-' + activePlayer).textContent;
    if (gamePlaying) {
        firstDice = Math.floor(Math.random() * 6) + 1;
        secondDice = Math.floor(Math.random() * 6) + 1;
        numberSixInRowForFirstDice = firstDice === 6 ? ++numberSixInRow : 0;
        numberSixInRowForSecondDice = secondDice === 6 ? ++numberSixInRow : 0;
        if (numberSixInRowForFirstDice >= 2 || numberSixInRowForSecondDice >= 2) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            changePlayer();
        } else {
            if (firstDice !== 1 && secondDice !== 1) {
                roundScore = roundScore + firstDice + secondDice;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
            } else {
                changePlayer();
            }
        }
        document.getElementById('img-first-dice').src = 'dice-' + firstDice + '.png';
        document.getElementById('img-second-dice').src = 'dice-' + secondDice + '.png';

        if (document.getElementById('img-first-dice').style.display === 'none') {
            document.getElementById('img-first-dice').style.display = 'block';
            document.getElementById('img-second-dice').style.display = 'block';
        }
    }
}

function onClickedHold() {
    if (gamePlaying) {
        scores[activePlayer] = scores[activePlayer] + roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= scoreToWin) {
            gamePlaying = false;
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
            document.getElementById('name-' + activePlayer).classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
            document.getElementById('player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            changePlayer();
        }
    }
}

function changePlayer() {
    numberSixInRow = 0;
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    // player-0-panel active
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    document.getElementById('player-0-panel').classList.toggle('active');
    document.getElementById('player-1-panel').classList.toggle('active');
}

