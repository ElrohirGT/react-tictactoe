import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Board } from "./board";
import { Clock } from "./clock";
import { MovesList } from "./moveslist";

function Game(props) {
  const WIN_PATTERNS = [
    //horizontales
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //verticales
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonales
    [0, 4, 8],
    [2, 4, 6],
  ];
  const TURN_ORDER = { X: "O", O: "X" };
  const [boardHistory, setBoardHistory] = useState([
    {
      player: "X",
      squares: Array(9).fill(null),
      status: "Player turn: X",
      gameEnded: false,
    },
  ]);
  const [currentBoard, setCurrentBoard] = useState(boardHistory[0]);

  function jumpTo(boardIndex) {
    setCurrentBoard(boardHistory[boardIndex]);
  }

  function playerWon(squares, player) {
    for (let i = 0; i < WIN_PATTERNS.length; i++) {
      const [a, b, c] = WIN_PATTERNS[i];
      if (
        squares[a] &&
        squares[a] === player &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return true;
      }
    }
    return false;
  }
  function emptySquaresRemaining(squares) {
    for (let i = 0; i < squares.length; i++)
      if (squares[i] === null) return true;
    return false;
  }

  function squareClick(squareIndex) {
    if (currentBoard.gameEnded) return;

    //Deep copy, this way the values between states are not shared.
    const newCurrentBoard = JSON.parse(JSON.stringify(currentBoard));
    if (newCurrentBoard.squares[squareIndex] !== null) return;

    newCurrentBoard.squares[squareIndex] = currentBoard.player;
    if (playerWon(newCurrentBoard.squares, newCurrentBoard.player)) {
      newCurrentBoard.status = `Winner: ${currentBoard.player}`;
      newCurrentBoard.gameEnded = true;
    } else if (!emptySquaresRemaining(newCurrentBoard.squares)) {
      newCurrentBoard.status = "DRAW";
      newCurrentBoard.gameEnded = true;
    } else {
      let nextTurnPlayer = TURN_ORDER[currentBoard.player];
      newCurrentBoard.status = `Player turn: ${nextTurnPlayer}`;
      newCurrentBoard.player = nextTurnPlayer;
    }
    const indexOfState = boardHistory.indexOf(currentBoard);
    //Slices so that when we go back in time,
    //the history array is chopped off and replaced with a new branch in time.
    const history = boardHistory
      .slice(0, indexOfState + 1)
      .concat([newCurrentBoard]);
    setBoardHistory(history);
    setCurrentBoard(newCurrentBoard);
  }

  return (
    <div>
      <Clock />
      <div className="game">
        <div className="game-board">
          <Board
            player={currentBoard.player}
            squares={currentBoard.squares}
            status={currentBoard.status}
            onSquareClick={squareClick}
          />
        </div>
        <div className="game-info">
          <div>{currentBoard.status}</div>
          <MovesList moves={boardHistory} onButtonClick={jumpTo} />
        </div>
      </div>
    </div>
  );
}

// ========================================
ReactDOM.createRoot(document.getElementById("root")).render(<Game />);
// ReactDOM.render(<Game />, document.getElementById("root"));
