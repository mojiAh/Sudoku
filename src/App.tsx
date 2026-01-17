import { useEffect, useMemo, useReducer } from "react";
import { SudokuBoard } from "./ui/SudokuBoard";
import { parsePuzzle } from "./engine/parse";
import { PUZZLES } from "./engine/puzzles";
import { gameReducer, initialGameState } from "./state/gameReducer";

function App() {
  const initialBoard = useMemo(() => parsePuzzle(PUZZLES[0]), []);
  const [state, dispatch] = useReducer(
    gameReducer,
    initialGameState(initialBoard)
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const idx = state.selectedIndex;
      if (idx === null) return;

      // clear
      if (e.key === "Backspace" || e.key === "Delete") {
        dispatch({ type: "SET_CELL_VALUE", index: idx, value: null });
        return;
      }

      // set 1..9
      if (/^[1-9]$/.test(e.key)) {
        dispatch({ type: "SET_CELL_VALUE", index: idx, value: Number(e.key) });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state.selectedIndex]);
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      onMouseDown={(e) => {
        if ((e.target as HTMLElement).closest("[data-sudoku-board]")) return;
        dispatch({ type: "SELECT_CELL", index: null });
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <SudokuBoard
          board={state.board}
          selectedIndex={state.selectedIndex}
          onSelect={(index) => dispatch({ type: "SELECT_CELL", index })}
        />
        <div className="text-sm text-gray-600">
          Click a cell, then type 1–9. Backspace/Delete clears.
        </div>
      </div>
    </div>
  );
}

export default App;
