export type Cell = {
  given: number | null;
  value: number | null;
};

export type Board = Cell[];

export type GameState = {
  board: Board;
  selectedIndex: number | null;
};
