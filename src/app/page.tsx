'use client';

import Image from 'next/image';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useEffect, useRef, useState } from 'react';

import { BoardModel, CellModel, GridModel, Mode } from '@/models/models';
import { useBoardModelHelper } from '@/hooks/useBoardModelHelper';
import NameField from '@/components/NameField/NameField';
import LoadBoard from '@/components/LoadBoard/LoadBoard';

// Mark: display the given value or nothing (null) in a square area.
// Holds the hints the user gives to the parent Cell
function Mark({ value }: { value?: number | undefined }) {

  // ref to container in order to compute font-size
  const containerRef = useRef<HTMLDivElement>(null);
  // state for font-size
  const [fontSize, setFontSize] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    function updateFontSize() {
      const newFontSize = container.clientWidth * 0.8;
      setFontSize(newFontSize);
    }

    updateFontSize();

    const resizeObserver = new ResizeObserver(updateFontSize);
    resizeObserver.observe(container);

  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", aspectRatio: "1 / 1", display: "flex", alignItems: "center", justifyContent: "center", color: "#000A" }}>
      <span style={{ fontSize: `${fontSize}px` }}>{value ? value : <>&nbsp;</>}</span>
    </div>
  )
}

function MarkGrid({ cellModel }: { cellModel: CellModel }) {
  return (
    <div style={{ width: "100%", position: "absolute", color: "#000A", height: "100%", display: "flex", flexDirection: "column", alignItems: "normal", justifyContent: "center" }}>
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
    </div>
  );
}

// Cell: constituant of a Grid of 3x3 Cells
// Displays the given value as set by the original Sudoku puzzle or as set by the user
function Cell({ cellModel, gridId, cellId, onToggle }: { cellModel: CellModel, gridId: number, cellId: number, onToggle: (gridId: number, cellId: number) => void }) {

  // ref to container in order to compute font-size
  const containerRef = useRef<HTMLDivElement>(null);
  // state for font-size
  const [fontSize, setFontSize] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    function updateFontSize() {
      const newFontSize = container.clientWidth * 0.9;
      setFontSize(newFontSize);
    }

    updateFontSize();

    const resizeObserver = new ResizeObserver(updateFontSize);
    resizeObserver.observe(container);

  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "33.33%", aspectRatio: "1 / 1", flexGrow: 1, position: "relative", display: "inline-block", border: "1px solid gray", margin: "-1px" }}
      onClick={() => onToggle(gridId, cellId)}
    >
      <div style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", width: "100%" }}>
        <span style={{ fontSize: `${fontSize}px`, fontWeight: "normal", color: (cellModel.isLocked ? "#000" : "#00F8") }}>{cellModel.value ? cellModel.value : <>&nbsp;</>}</span>
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
      <div style={{ width: "33.33%", aspectRatio: "1 / 1", display: "inline-block", border: "2px solid black" }}>
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
    <div style={{ width: "100%", minWidth: "300px", maxWidth: "min(90vw, 90vh)", border: "2px solid black" }}>
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


export default function Game() {

  // mode state
  const [mode, setMode] = useState<Mode>(Mode.Init);
  // digit state
  const [digit, setDigit] = useState<number | undefined>(undefined);

  const [boardModel, setBoardModel] = useState<BoardModel | null>(null);
  const { loadBoardModel, saveBoardModel } = useBoardModelHelper();


  useEffect(() => {
    // initialise the board model
    const initialBoardModel = loadBoardModel();
    setBoardModel(initialBoardModel);

    // add listener to keyboard events
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= "1" && event.key <= "9") {
        setDigit(Number(event.key));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [loadBoardModel]);


  function onToggleCell(): (gridId: number, cellId: number) => void {
    return (gridId, cellId) => {
      if (digit === undefined || boardModel === null) {
        return;
      }
      const newBoardModel = { ...boardModel };
      const cell = newBoardModel.grids[gridId].cells[cellId];
      switch (mode) {
        case Mode.Init:
          cell.value = cell.value === undefined ? digit : undefined;
          if (mode === Mode.Init) {
            cell.isLocked = cell.value !== undefined;
          }
          break;
        case Mode.Solve:
          if (cell.isLocked) {
            break;
          }
          cell.value = cell.value === undefined ? digit : undefined;
          break;
        case Mode.Mark:
          if (cell.isLocked) {
            break;
          }
          cell.marks[digit - 1] = !cell.marks[digit - 1];
          break;
      }
      setBoardModel(newBoardModel);
      // save the current board to local storage
      saveBoardModel(newBoardModel);
    };
  }

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", alignItems: "center", justifyContent: "space-around", gap: "1rem", marginTop: "1rem" }}>
        {boardModel ? (
          <>
            <Board boardModel={boardModel} onToggle={onToggleCell()} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", flexBasis: "0", flexGrow: 1 }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", flexWrap: "wrap" }}>
                <NameField boardModel={boardModel} setBoardModel={setBoardModel} />
                <LoadBoard currentBoardId={boardModel.boardId} />
              </div>
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
          </>
        ) : (
          // Optionally show a loading spinner or nothing
          <div>Loading...</div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "3px", marginTop: "2rem", color: "#0008" }}>
        <small>Développé par</small>
        <Image
          style={{ position: "relative", top: "3px" }}
          src="https://www.beezital.fr/wp-content/uploads/2020/04/BEEZITAL-bee-small-fade.svg"
          width={20}
          height={20}
          alt="Beezital logo"
        />
        <small><a href="https://www.beezital.fr" target="_blank">beezital.fr</a></small>
      </div>
    </>
  );
}


