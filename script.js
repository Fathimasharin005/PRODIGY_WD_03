let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");

// Create Board
function createBoard() {
  boardDiv.innerHTML = "";

  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.innerText = cell;

    div.addEventListener("click", () => handleMove(index));

    boardDiv.appendChild(div);
  });
}

// Handle move
function handleMove(index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
  }

  createBoard();
}

// Check winner
function checkWinner() {
  const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.innerText = `🎉 Player ${board[a]} Wins!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusText.innerText = "😐 It's a Draw!";
    gameActive = false;
  }
}

// Reset game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = "Player X's Turn";
  createBoard();
}

// Start game
createBoard();