// Define the Mode type as  an enum
export enum Mode {
  Init = 'init',
  Solve = 'solve',
  Mark = 'mark',
}

// Define Cell model
export type CellModel = {
  cellId: number;
  value?: number | undefined;
  isLocked: boolean;
  marks: Array<boolean>; // Array of 9 booleans indicating possible marks (1-9)
};

// Define Grid model
export type GridModel = {
  gridId: number;
  cells: Array<CellModel>;
};

// Define Board model
export type BoardModel = {
  grids: Array<GridModel>;
  name: string;
  boardId: string;
};
