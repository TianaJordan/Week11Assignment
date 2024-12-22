/*
Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
    -Create a Tic-Tac-Toe game grid using your HTML element of choice.
    -When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
    -A heading should say whether it is X's or O's turn and change with each move made.
    -A button should be available to clear the grid and restart the game.
    -When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.
*/

let player1 = 'X';
let player2 = 'O';

let cell1 = $('#cell1');
let cell2 = $('#cell2');
let cell3 = $('#cell3');
let cell4 = $('#cell4');
let cell5 = $('#cell5');
let cell6 = $('#cell6');
let cell7 = $('#cell7');
let cell8 = $('#cell8');
let cell9 = $('#cell9');
console.log($('#cell1'));

$('#alertPlayer1').hide();
$('#alertPlayer2').hide();
$('#alertWinner').hide();
$('#alertDraw').hide();

let turn = 0;
let winner = false;
let currentPlayer = '';

const winCombos = [
    [cell1, cell2, cell3], [cell4, cell5, cell6], [cell7, cell8, cell9],
    [cell1, cell4, cell7], [cell2, cell5, cell8], [cell3, cell6, cell9],
    [cell1, cell5, cell9], [cell3, cell5, cell7]
];

// game finsihes, prevents clicking on cells, and hides any turn alerts
const endGame = () => {
    $('.cell').css('pointer-events', 'none');
    $('#alertPlayer1').hide();
    $('#alertPlayer2').hide();
};

const checkWin = (currentPlayer, a, b, c) => {
    if(a.text() === currentPlayer && b.text() === currentPlayer && c.text() === currentPlayer) {
        winner = true;

// the win combo cells are highlighted 
        a.addClass('bg-primary text-dark');
        b.addClass('bg-primary text-dark');
        c.addClass('bg-primary text-dark');

        if(currentPlayer === 'X') {
            currentPlayer = 'Player 1';
        } else {
            currentPlayer = 'Player 2';
        }

        $('#alertWinner').text(`GAME OVER -- ${currentPlayer} WINS`)
        $('#alertWinner').show();

       endGame(); 
    }
};

// spread operator expands each array into checkWin function argument to check for win combos
const checkCombos = () => {
    checkWin(currentPlayer, ...winCombos[1]);
    checkWin(currentPlayer, ...winCombos[2]);
    checkWin(currentPlayer, ...winCombos[3]);
    checkWin(currentPlayer, ...winCombos[4]);
    checkWin(currentPlayer, ...winCombos[5]);
    checkWin(currentPlayer, ...winCombos[6]);
    checkWin(currentPlayer, ...winCombos[7]);
    // checkWin(currentPlayer, ...winCombos[8]); 
    
// if no win combos are found at the end of last turn, declare a draw and show alert
    if(turn === 9 && winner === false) {
        endGame();
        $('#alertDraw').show();
    }
};

// starting the game -- start button activates alert for player 1's turn
document.getElementById('startBtn').addEventListener('click', (event) => {
    event.preventDefault();
    $('#alertPlayer1').show();
});

const startGame = () => {
    turn++;
    currentPlayer = player1;

    $('.cell').on('click', function() {
    $(this).text(currentPlayer);

    $('#alertPlayer1').hide();

// check for a winner at 5 turns
        if(turn > 4) {
            checkCombos();
        }

// if no winner is found, game continues, adds a turn, and swicthes player alerts
        if(winner === false) {
            if(currentPlayer === player1) {
                currentPlayer = player2;
                turn++;
                $('#alertPlayer2').show();
            } else {
                currentPlayer = player1;
                turn++;
                $('#alertPlayer2').hide();
                $('#alertPlayer1').show();
            }
        }
   })
};

startGame();

// reset game and clear the grid
document.getElementById('resetBtn').addEventListener('click', () => document.location.reload(true));