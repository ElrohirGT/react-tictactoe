function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick(props.index)}>
      {props.value}
    </button>
  );
}
