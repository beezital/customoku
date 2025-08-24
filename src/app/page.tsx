'use client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useState } from 'react';

// type for the history of the board state
// includes the array of squares and the next player for each move
type HistoryEntry = {
  squares: Array<string | null>;
  nextPlayer: string;
};

// Define the Mode type as  an enum
enum Mode {
  Init = 'init',
  Solve = 'solve',
  Mark = 'mark',
}

// Define Cell model
type CellModel = {
  cellId: number;
  value?: number | undefined;
  isLocked: boolean;
  marks: Array<boolean>; // Array of 9 booleans indicating possible marks (1-9)
};

// Define Grid model
type GridModel = {
  gridId: number;
  cells: Array<CellModel>;
};

// Define Board model
type BoardModel = {
  grids: Array<GridModel>;
};


// Mark: display the given value or nothing (null) in a square area.
// Holds the hints the user gives to the parent Cell
function Mark({ value }: { value?: number | undefined }) {
  return (
    <div style={{ display: "flex", width: "1.3em", aspectRatio: "1", alignItems: "center", justifyContent: "center" }}><span>{value}</span></div>
  )
}

function MarkGrid({ cellModel }: { cellModel: CellModel }) {
  return <div style={{ position: "absolute", color: "#000A" }}>
    <div style={{ display: "flex" }}>
      <Mark value={cellModel.marks[0] ? 1 : undefined} />
      <Mark value={cellModel.marks[1] ? 2 : undefined} />
      <Mark value={cellModel.marks[2] ? 3 : undefined} />
    </div>
    <div style={{ display: "flex" }}>
      <Mark value={cellModel.marks[3] ? 4 : undefined} />
      <Mark value={cellModel.marks[4] ? 5 : undefined} />
      <Mark value={cellModel.marks[5] ? 6 : undefined} />
    </div>
    <div style={{ display: "flex" }}>
      <Mark value={cellModel.marks[6] ? 7 : undefined} />
      <Mark value={cellModel.marks[7] ? 8 : undefined} />
      <Mark value={cellModel.marks[8] ? 9 : undefined} />
    </div>
  </div>;
}

// Cell: constituant of a Grid of 3x3 Cells
// Displays the given value as set by the original Sudoku puzzle or as set by the user
function Cell({ cellModel, gridId, cellId, onToggle }: { cellModel: CellModel, gridId: number, cellId: number, onToggle: (gridId: number, cellId: number) => void }) {

  return (
    <div
      style={{ position: "relative", display: "inline-block", width: "3.9em", aspectRatio: "1", border: "1px solid gray" }}
      onClick={() => onToggle(gridId, cellId)}
    >
      <div style={{ position: "absolute", width: "3.9em", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}>
        <span style={{ fontSize: "3em", fontWeight: "normal", color: (cellModel.isLocked ? "#000" : "#00F8") }}>{cellModel.value}</span>
      </div>
      {
        !cellModel.isLocked && (
          <MarkGrid cellModel={cellModel} />
        )
      }
    </div>
  )
}

function Grid({ gridModel, gridId, onToggle }: { gridModel: GridModel, gridId: number, onToggle: (gridId: number, cellId: number) => void }) {
  return (
    <>
      <div style={{ display: "inline-block", border: "2px solid black" }}>
        <div style={{ display: "flex" }}>
          <Cell cellModel={gridModel.cells[0]} gridId={gridId} cellId={0} onToggle={onToggle} />
          <Cell cellModel={gridModel.cells[1]} gridId={gridId} cellId={1} onToggle={onToggle} />
          <Cell cellModel={gridModel.cells[2]} gridId={gridId} cellId={2} onToggle={onToggle} />
        </div>
        <div style={{ display: "flex" }}>
          <Cell cellModel={gridModel.cells[3]} gridId={gridId} cellId={3} onToggle={onToggle} />
          <Cell cellModel={gridModel.cells[4]} gridId={gridId} cellId={4} onToggle={onToggle} />
          <Cell cellModel={gridModel.cells[5]} gridId={gridId} cellId={5} onToggle={onToggle} />
        </div>
        <div style={{ display: "flex" }}>
          <Cell cellModel={gridModel.cells[6]} gridId={gridId} cellId={6} onToggle={onToggle} />
          <Cell cellModel={gridModel.cells[7]} gridId={gridId} cellId={7} onToggle={onToggle} />
          <Cell cellModel={gridModel.cells[8]} gridId={gridId} cellId={8} onToggle={onToggle} />
        </div>
      </div>
    </>
  );
}

// Board: grid of 3x3 Grid components
function Board({ boardModel, onToggle }: { boardModel: BoardModel, onToggle: (gridId: number, cellId: number) => void }) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Grid gridModel={boardModel.grids[0]} gridId={0} onToggle={onToggle} />
        <Grid gridModel={boardModel.grids[1]} gridId={1} onToggle={onToggle} />
        <Grid gridModel={boardModel.grids[2]} gridId={2} onToggle={onToggle} />
      </div>
      <div style={{ display: "flex" }}>
        <Grid gridModel={boardModel.grids[3]} gridId={3} onToggle={onToggle} />
        <Grid gridModel={boardModel.grids[4]} gridId={4} onToggle={onToggle} />
        <Grid gridModel={boardModel.grids[5]} gridId={5} onToggle={onToggle} />
      </div>
      <div style={{ display: "flex" }}>
        <Grid gridModel={boardModel.grids[6]} gridId={6} onToggle={onToggle} />
        <Grid gridModel={boardModel.grids[7]} gridId={7} onToggle={onToggle} />
        <Grid gridModel={boardModel.grids[8]} gridId={8} onToggle={onToggle} />
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

  // mode state
  const [mode, setMode] = useState<Mode>(Mode.Init);
  // digit state
  const [digit, setDigit] = useState<number | undefined>(undefined);

  // initialise the board model
  const [boardModel, setBoardModel] = useState<BoardModel>({
    grids: Array.from({ length: 9 }, (_, gridId) => ({
      gridId,
      cells: Array.from({ length: 9 }, (_, cellId) => ({
        cellId,
        value: undefined,
        isLocked: false,
        marks: Array(9).fill(false)
      }))
    }))
  });

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

  function onToggleCell(): (gridId: number, cellId: number) => void {
    return (gridId, cellId) => {
      if (digit === undefined) {
        return;
      }
      const newBoardModel = { ...boardModel };
      const cell = newBoardModel.grids[gridId].cells[cellId];
      switch (mode) {
        case Mode.Init:
        case Mode.Solve:
          cell.value = cell.value === undefined ? digit : undefined;
          if (mode === Mode.Init) {
            cell.isLocked = cell.value !== undefined;
          }
          break;
        case Mode.Mark:
          cell.marks[digit-1] = !cell.marks[digit-1];
          break;
      }
      setBoardModel(newBoardModel);
    };
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", alignItems: "center", gap: "1em", padding: "1em" }}>
      <Board boardModel={boardModel} onToggle={onToggleCell()} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1em" }}>
        <ToggleButtonGroup
          color="primary"
          value={mode}
          exclusive
          aria-label="Mode"
          onChange={(event, newMode) => {
            setMode(newMode);
          }}
        >
          <ToggleButton value={Mode.Init}>Init</ToggleButton>
          <ToggleButton value={Mode.Solve}>Solve</ToggleButton>
          <ToggleButton value={Mode.Mark}>Mark</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          color="primary"
          value={digit}
          exclusive
          aria-label="Digit"
          onChange={(event, newDigit) => {
            setDigit(newDigit);
          }}
        >
          <ToggleButton value={1}>1</ToggleButton>
          <ToggleButton value={2}>2</ToggleButton>
          <ToggleButton value={3}>3</ToggleButton>
          <ToggleButton value={4}>4</ToggleButton>
          <ToggleButton value={5}>5</ToggleButton>
          <ToggleButton value={6}>6</ToggleButton>
          <ToggleButton value={7}>7</ToggleButton>
          <ToggleButton value={8}>8</ToggleButton>
          <ToggleButton value={9}>9</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
