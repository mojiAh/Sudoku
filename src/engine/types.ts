export type Cell = {
  given: number | null;
  value: number | null;
  notes: number[];
  isConflicted?: boolean;
};

export type Board = Cell[];

export type GameState = {
  past: Board[];
  board: Board;
  future: Board[];
  initialBoard: Board;
  selectedIndex: number | null;
  elapsedTime: number;
  isPaused: boolean;
  isNoteMode: boolean;
};
