const replay = async () => {
  const response = await fetch('/replay')
  console.log("response", response)
  if (response.redirected) {
    globalThis.location.href = '/waitingPage.html';
  }
}

const exit = async () => {
  const response = await fetch('/exit')
  console.log("response for exit", response)
  if (response.redirected) {
    globalThis.location.href = "/index.html"
  }
}

const displayGameStatus = (status) => {
  const parent = document.getElementById("status");
  const p = document.getElementById("content");
  p.textContent = status.isWon ? `The winner is ${status.winner}` : 'The game is draw';
  document.getElementById("board").classList.add("no-click");
  const replayButton = document.getElementById("replay")
  const exitButton = document.getElementById("exit")
  replayButton.addEventListener('click', () => replay())
  exitButton.addEventListener('click', () => exit())
  parent.style.display = "block";
};

const checkWinner = async () => {
  const res = await fetch(`/checkWinner`);
  const status = await res.json();
  console.log("*".repeat(5), "the response is", status.isGameOver, status.isWon)
  if (status.isGameOver) {
    displayGameStatus(status);
  }
};

const markBox = async (div) => {
  const row = div.parentElement.id;
  const col = div.id;
  const response = await fetch(`/markBox/${row}/${col}`, { method: "POST" });
  const values = await response.json();
  if (!(values.isValid)) {
    alert(values.error);
  }

  const { board, currentPlayer } = await getBoard();
  displayBoard(board, currentPlayer);
};

const updateBoard = () => {
  const container = document.querySelectorAll(".inner");

  container.forEach((div) => {
    div.addEventListener('click', () => markBox(div));
  });
};

const displayBoard = (board, currentPlayer) => {
  const p = document.getElementById('player');
  p.textContent = `Current Player: ${currentPlayer}`;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const outerDivs = document.querySelector(`.out${i}`);
      const innerDiv = outerDivs.querySelector(`.i${j}`);
      innerDiv.textContent = board[i][j];
    }
  }
};

const getBoard = async () => {
  const res = await fetch('/getBoard');

  return await res.json();
};

const main = async () => {
  setInterval(async () => {
    const { board, currentPlayer } = await getBoard();
    displayBoard(board, currentPlayer);
    checkWinner();
  }, 100);
  updateBoard();
};

globalThis.onload = main;