export type Cell = {
  given: number | null;
  value: number | null;
  notes?: Set<number>;
  isConflicted?: boolean;
};

export type Board = Cell[];

export type GameState = {
  board: Board;
  initialBoard: Board;
  selectedIndex: number | null;
};
