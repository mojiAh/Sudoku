import { useEffect, useMemo, useReducer, useRef } from "react";
import { SudokuBoard } from "./ui/SudokuBoard";
import { parsePuzzle } from "./engine/parse";
import { PUZZLES } from "./engine/puzzles";
import { gameReducer, initialGameState } from "./state/gameReducer";

function App() {
  const initialBoard = useMemo(() => parsePuzzle(PUZZLES[0]), []);
  const [state, dispatch] = useReducer(
    gameReducer,
    initialGameState(initialBoard),
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (state.selectedIndex !== null) {
      inputRef.current?.focus();
    }
  }, [state.selectedIndex]);

  const handleKey = (key: string) => {
    const idx = state.selectedIndex;
    if (idx === null) return;

    if (key === "Backspace" || key === "Delete") {
      dispatch({ type: "SET_CELL_VALUE", index: idx, value: null });
      return;
    }

    if (/^[1-9]$/.test(key)) {
      dispatch({ type: "SET_CELL_VALUE", index: idx, value: Number(key) });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <input
        ref={inputRef}
        inputMode="numeric"
        pattern="[1-9]*"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className="absolute opacity-0 pointer-events-none h-0 w-0"
        onKeyDown={(e) => handleKey(e.key)}
        onChange={(e) => {
          const v = e.target.value;
          const last = v.slice(-1);
          if (last) handleKey(last);
          e.target.value = "";
        }}
      />
      <div className="flex flex-col items-center gap-4">
        <SudokuBoard
          board={state.board}
          selectedIndex={state.selectedIndex}
          onSelect={(index) => {
            dispatch({ type: "SELECT_CELL", index });
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
        />
        <div className="text-sm text-gray-600">
          Click a cell, then type 1–9. Backspace/Delete clears.
        </div>
      </div>
    </div>
  );
}

export default App;
