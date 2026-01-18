import { parsePuzzle } from "../engine/parse";
import type { GameState } from "../engine/types";

export type Action =
  | { type: "RESET" }
  | { type: "LOAD_PUZZLE"; puzzle: string }
  | { type: "SELECT_CELL"; index: number | null }
  | { type: "SET_CELL_VALUE"; index: number; value: number | null };

export const initialGameState = (puzzle: string): GameState => {
  const board = parsePuzzle(puzzle);
  return {
    board,
    initialBoard: board,
    selectedIndex: null,
  };
};

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "LOAD_PUZZLE": {
      const board = parsePuzzle(action.puzzle);
      return { board, initialBoard: board, selectedIndex: null };
    }
    case "RESET": {
      return {
        ...state,
        board: state.initialBoard,
        selectedIndex: null,
      };
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
