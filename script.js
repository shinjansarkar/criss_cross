const cells = document.querySelectorAll('.cell');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const gameContainer = document.querySelector('.game');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.id.split('-')[1]);

    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.animation = 'scale 0.3s';

    if (checkWin()) {
        endGame(false);
    } else if (isBoardFull()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function startGame() {
    gameActive = true;
    gameContainer.style.display = 'block';
    startBtn.style.display = 'none';
    restartBtn.style.display = 'block';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.animation = 'none';
    });
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        alert("It's a draw!");
    } else {
        alert(`${currentPlayer} wins!`);
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(condition => {
        if (board[condition[0]] !== '' &&
            board[condition[0]] === board[condition[1]] &&
            board[condition[1]] === board[condition[2]]) {
            return true;
        }
        return false;
    });
}

function isBoardFull() {
    return board.every(cell => cell !== '');
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
