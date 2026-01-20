import { parsePuzzle } from "../engine/parse";
import type { GameState } from "../engine/types";

export type Action =
  | { type: "RESET" }
  | { type: "LOAD_PUZZLE"; puzzle: string }
  | { type: "SELECT_CELL"; index: number | null }
  | { type: "SET_CELL_VALUE"; index: number; value: number | null }
  | { type: "UNDO" }
  | { type: "REDO" };

export const initialGameState = (puzzle: string): GameState => {
  const board = parsePuzzle(puzzle);
  return {
    past: [],
    board,
    future: [],
    initialBoard: board,
    selectedIndex: null,
  };
};

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "LOAD_PUZZLE": {
      const board = parsePuzzle(action.puzzle);
      return {
        past: [],
        board,
        future: [],
        initialBoard: board,
        selectedIndex: null,
      };
    }
    case "RESET": {
      return {
        ...state,
        board: state.initialBoard,
        past: [],
        future: [],
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
      if (cell.value === value) return state;

      const nextBoard = [...state.board];
      nextBoard[index] = { ...cell, value };

      return {
        ...state,
        past: [...state.past, state.board],
        board: nextBoard,
        future: [],
      };
    }
    case "UNDO": {
      if (state.past.length === 0) return state;

      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);

      return {
        ...state,
        past: newPast,
        board: previous,
        future: [state.board, ...state.future],
        selectedIndex: null,
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state;

      const [next, ...rest] = state.future;

      return {
        ...state,
        past: [...state.past, state.board],
        board: next,
        future: rest,
        selectedIndex: null,
      };
    }

    default: {
      throw new Error("Unhandled action in reducer");
    }
  }
}
