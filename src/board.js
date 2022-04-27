import {Square} from "./square";

export function Board(props) {
  let renderSquare = (i) => (
    <Square value={props.squares[i]} index={i} onClick={props.onSquareClick} />
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
