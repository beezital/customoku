'use client';
import { useState } from 'react';

// type for the history of the board state
// includes the array of squares and the next player for each move
type HistoryEntry = {
  squares: Array<string | null>;
  nextPlayer: string;
};


// Mark: display the given value or nothing (null) in a square area.
// Holds the hints the user gives to the parent Cell
function Mark({ value }: { value?: number | undefined }) {
  return (
    <div style={{ display: "flex", width: "1.3em", aspectRatio: "1", alignItems: "center", justifyContent: "center" }}><span>{value}</span></div>
  )
}

// Cell: constituant of a Grid of 3x3 Cells
// Displays the given value as set by the original Sudoku puzzle or as set by the user
function Cell({ value }: { value?: number | undefined }) {
  return (
    <div style={{ display: "inline-block", position: "relative", width: "3.9em", aspectRatio: "1", border: "1px solid gray" }} >
      <div style={{ position: "absolute" }}>
        <div style={{ display: "flex" }}>
          <Mark value={1} />
          <Mark value={2} />
          <Mark value={3} />
        </div>
        <div style={{ display: "flex" }}>
          <Mark value={4} />
          <Mark value={5} />
          <Mark value={6} />
        </div>
        <div style={{ display: "flex" }}>
          <Mark value={7} />
          <Mark value={8} />
          <Mark value={9} />
        </div>
      </div>
      <div style={{ width: "3.9em", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}>
        <span style={{ fontSize: "3em", fontWeight: "normal", color: "#00FA" }}>{value}</span>
      </div>
    </div>
  )
}

function Grid() {
  return (
    <>
      <div style={{ display: "inline-block", border: "2px solid black"}}>
        <div>
          <Cell value={1} />
          <Cell value={2} />
          <Cell value={3} />
        </div>
        <div>
          <Cell value={4} />
          <Cell value={5} />
          <Cell value={6} />
        </div>
        <div>
          <Cell value={7} />
          <Cell value={8} />
          <Cell value={9} />
        </div>
      </div>
    </>
  );
}

// Board: grid of 3x3 Grid components
function Board() {
  return (
    <div>
      <div>
        <Grid />
        <Grid />
        <Grid />
      </div>
      <div>
        <Grid />
        <Grid />
        <Grid />
      </div>
      <div>
        <Grid />
        <Grid />
        <Grid />
      </div>
    </div>
  );
}

function Square({ value, onSquareClick }: { value: string | null, onSquareClick: () => void }) {

  return (
    <button
      className="square"
      onClick={onSquareClick}>
      {value}
    </button>
  );
}

function XBoard({ squares, onSquareClick }: { squares: Array<string | null>, onSquareClick: (i: number) => void }) {


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
  const [history, setHistory] = useState<HistoryEntry[]>([{ squares: Array(9).fill(null), nextPlayer: 'X' }]);

  const squares = history[history.length - 1].squares;
  const nextPlayer = history[history.length - 1].nextPlayer;

  function onSquareClick(i: number) {
    if (squares[i] || winner) {
      return; // Ignore if the square is already filled
    }

    const newSquares = squares.slice();
    newSquares[i] = nextPlayer;
    const newNextPlayer = nextPlayer === 'X' ? 'O' : 'X';
    const newHistoryEntry: HistoryEntry = { squares: newSquares, nextPlayer: newNextPlayer };

    const newHistory = [...history, newHistoryEntry];
    console.log(newHistory);
    setHistory(newHistory);

    checkAndUpdateWinner(newHistory);
  }

  function checkAndUpdateWinner(history: HistoryEntry[]) {
    const squares = history[history.length - 1].squares;
    const newWinner = calculateWinner(squares);
    setWinner(newWinner);
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
    checkAndUpdateWinner(newHistory);
  }

  return (
    <>
      <Board />
    </>
  );
}