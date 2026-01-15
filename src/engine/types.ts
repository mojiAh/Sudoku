type Cell = {
  given: number | null;
  value: number | null;
};

type Board = Cell[];

type GameState = {
  board: Board;
  selectedIndex: number | null;
};
