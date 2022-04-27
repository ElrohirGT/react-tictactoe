import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick(props.index)}>
      {props.value}
    </button>
  );
}

function Board(props) {
  let renderSquare = (i) => (
    <Square value={props.squares[i]} index={i} onClick={props.squareClick} />
  );
  return (
    <div>
      <div className="status">{props.status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

class Game extends React.Component {
  playerWon(squares, player) {
    const lines = [
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
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
  emptySquaresRemaining(squares) {
    for (let i = 0; i < squares.length; i++)
      if (squares[i] === null) return true;
    return false;
  }
  changeTurn(currentPlayer) {
    const changeTurnDict = { O: "X", X: "O" };
    return changeTurnDict[currentPlayer];
  }
  squareClick(i) {
    if (this.state.current.gameEnded) return;

    //Deep copy, this way the values between states are not shared.
    const newCurrentState = JSON.parse(JSON.stringify(this.state.current));
    if (newCurrentState.squares[i] !== null) return;

    newCurrentState.squares[i] = this.state.current.player;
    if (this.playerWon(newCurrentState.squares, newCurrentState.player)) {
      newCurrentState.status = `Winner: ${this.state.current.player}`;
      newCurrentState.gameEnded = true;
    } else if (!this.emptySquaresRemaining(newCurrentState.squares)) {
      newCurrentState.status = "DRAW";
      newCurrentState.gameEnded = true;
    } else {
      let nextTurnPlayer = this.changeTurn(this.state.current.player);
      newCurrentState.status = `Player turn: ${nextTurnPlayer}`;
      newCurrentState.player = nextTurnPlayer;
    }
    const indexOfState = this.state.history.indexOf(this.state.current);
    //Slices so that when we go back in time,
    //the history array is chopped off and replaced with a new branch in time.
    const history = this.state.history
      .slice(0, indexOfState + 1)
      .concat([newCurrentState]);
    this.setState({
      current: newCurrentState,
      history,
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      history: [
        {
          player: "X",
          squares: Array(9).fill(null),
          status: "Player turn: X",
          gameEnded: false,
        },
      ],
    };
    this.state.current = this.state.history[0];
  }
  jumpTo(move) {
    console.log("The move is", move);
    console.log(this.state.history);
    this.setState({ current: this.state.history[move] });
  }
  render() {
    const moves = this.state.history.map((_, move) => {
      const description = move ? `Go to move ${move}` : `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board
            player={this.state.current.player}
            squares={this.state.current.squares}
            status={this.state.current.status}
            changeTurn={() => this.changeTurn()}
            squareClick={(i) => this.squareClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{this.state.current.status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
ReactDOM.createRoot(document.getElementById("root")).render(<Game/>);
// ReactDOM.render(<Game />, document.getElementById("root"));
