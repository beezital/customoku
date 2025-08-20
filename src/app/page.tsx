'use client';
import { useState } from 'react';


function Square({ value, onSquareClick } : { value: string | null, onSquareClick: () => void }) {

  return (
    <button
      className="square"
      onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {

  const [nextPlayer, setNextPlayer] = useState<string>('X');
  const [squares, setSquares] = useState(Array(9).fill(null));

  function onSquareClick(i: number) {
    if (squares[i]) {
      return; // Ignore if the square is already filled
    }
    const newSquares = squares.slice();
    newSquares[i] = nextPlayer;
    setSquares(newSquares);
    setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
  }

  return (
    <>
      <p>Next player: {nextPlayer}</p>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={onSquareClick.bind(null, 0)} />
        <Square value={squares[1]} onSquareClick={onSquareClick.bind(null, 1)} />
        <Square value={squares[2]} onSquareClick={onSquareClick.bind(null, 2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
      </div>
    </>
  );
}
