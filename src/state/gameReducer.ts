import type { Board, GameState } from "../engine/types";

export type Action =
  | { type: "LOAD_PUZZLE"; board: Board }
  | { type: "SELECT_CELL"; index: number | null }
  | { type: "SET_CELL_VALUE"; index: number; value: number | null };

export const initialGameState = (board: Board): GameState => ({
  board,
  selectedIndex: null,
});

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "LOAD_PUZZLE": {
      return { board: action.board, selectedIndex: null };
    }
    case "SELECT_CELL": {
      return { ...state, selectedIndex: action.index };
    }
    case "SET_CELL_VALUE": {
      const { value, index } = action;

      const cell = state.board[index];
      if (!cell) return state;

      if (cell.given !== null) return state;

      const nextBoard = [...state.board];
      nextBoard[index] = { ...cell, value };

      return { ...state, board: nextBoard };
    }

    default: {
      throw new Error("Unhandled action in reducer");
    }
  }
}
