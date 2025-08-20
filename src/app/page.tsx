'use client';

function Square({ value = "" }: { value?: string }) {

  function handleClick() {
    console.log('click');
  }

  return (
    <button
      className="square"
      onClick={handleClick}>
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
