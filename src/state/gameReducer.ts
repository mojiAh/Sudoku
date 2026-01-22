import { parsePuzzle } from "../engine/parse";
import type { GameState } from "../engine/types";

export type Action =
  | { type: "RESET" }
  | { type: "RESET_TIMER" }
  | { type: "LOAD_PUZZLE"; puzzle: string }
  | { type: "SELECT_CELL"; index: number | null }
  | { type: "SET_CELL_VALUE"; index: number; value: number | null }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "TICK" }
  | { type: "TOGGLE_PAUSE" }
  | { type: "TOGGLE_NOTE_MODE" }
  | { type: "TOGGLE_NOTE"; index: number; value: number };

export const initialGameState = (puzzle: string): GameState => {
  const board = parsePuzzle(puzzle);
  return {
    past: [],
    board,
    future: [],
    initialBoard: board,
    selectedIndex: null,
    elapsedTime: 0,
    isPaused: false,
    isNoteMode: false,
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
        elapsedTime: 0,
        isPaused: false,
        isNoteMode: false,
      };
    }
    case "RESET": {
      return {
        ...state,
        board: state.initialBoard,
        past: [],
        future: [],
        selectedIndex: null,
        elapsedTime: 0,
        isPaused: false,
        isNoteMode: false,
      };
    }
    case "RESET_TIMER": {
      return {
        ...state,
        elapsedTime: 0,
        isPaused: false,
      };
    }
    case "SELECT_CELL": {
      return { ...state, selectedIndex: action.index };
    }
    case "SET_CELL_VALUE": {
      const { value, index } = action;

      const cell = state.board[index];
      if (!cell || cell.given !== null || cell.value === value) return state;

      const nextBoard = [...state.board];
      nextBoard[index] = { ...cell, value, notes: [] };

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
    case "TICK": {
      return {
        ...state,
        elapsedTime: state.elapsedTime + 1,
      };
    }
    case "TOGGLE_NOTE_MODE": {
      return {
        ...state,
        isNoteMode: !state.isNoteMode,
      };
    }
    case "TOGGLE_PAUSE": {
      return {
        ...state,
        isPaused: !state.isPaused,
        selectedIndex: null,
      };
    }
    case "TOGGLE_NOTE": {
      const { value, index } = action;

      const cell = state.board[index];
      if (!cell || cell.given || cell.value !== null) return state;

      const notes = cell.notes.includes(value)
        ? cell.notes.filter((n) => n !== value)
        : [...cell.notes, value].sort();

      const nextBoard = [...state.board];
      nextBoard[index] = { ...cell, notes };

      return {
        ...state,
        past: [...state.past, state.board],
        board: nextBoard,
        future: [],
      };
    }
    default: {
      throw new Error("Unhandled action in reducer");
    }
  }
}
