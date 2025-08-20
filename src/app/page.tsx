'use client';
import { useState } from 'react';


function Square({ value, onSquareClick }: { value: string | null, onSquareClick: () => void }) {

  return (
    <button
      className="square"
      onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, onSquareClick }: { squares: Array<string | null>, onSquareClick: (i: number) => void }) {


  return (
    <>
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


export default function Game() {

  const [winner, setWinner] = useState<string | null>(null);
  const [nextPlayer, setNextPlayer] = useState<string>('X');
  const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);

  const squares = history[history.length - 1];

  function onSquareClick(i: number) {
    if (squares[i] || winner) {
      return; // Ignore if the square is already filled
    }
    const newSquares = squares.slice();
    newSquares[i] = nextPlayer;

    const newHistory = [...history, newSquares];
    console.log(newHistory);
    setHistory(newHistory);
    togglePlayer();

    const newWinner = calculateWinner(newSquares);
    setWinner(newWinner);
  }

  function togglePlayer() {
    setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
  }

  function calculateWinner(squares: Array<string | null>) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function player(nextPlayer: string, winner: string | null) {
    if (winner) {
      return <h1>Winner: {winner}</h1>;
    }
    return <p>Next player: {nextPlayer}</p>;
  }

  function cancelLastMove() {
    if (history.length <= 1) {
      return; // No moves to cancel
    }
    const newHistory = history.slice(0, history.length - 1);

    setHistory(newHistory);
    togglePlayer();
  }

  return (
    <>
      {player(nextPlayer, winner)}
      <Board squares={squares} onSquareClick={onSquareClick} />
      <p>
        <button onClick={cancelLastMove} disabled={ history.length <= 1}>Cancel Last Move</button>
      </p>
    </>
  );
}