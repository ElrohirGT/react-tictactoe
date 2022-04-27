export function MovesList(props){ 
    const listItems = props.moves.map(
        (_, moveIndex) => {
            const description = moveIndex ? `Go to move: ${moveIndex}` : "Go to start";
            return (
                <li key={moveIndex}>
                    <button onClick={props.onButtonClick.bind(this, moveIndex)}>{description}</button>
                </li>
            );
        }
    );
    return (
        <ol>
            {listItems}
        </ol>
    );
}