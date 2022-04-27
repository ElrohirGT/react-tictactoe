export function Square(props) {
  return (
    <button className="square" onClick={props.onClick.bind(this, props.index)}>
      {props.value}
    </button>
  );
}
