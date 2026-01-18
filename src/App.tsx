import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { SudokuBoard } from "./ui/SudokuBoard";
import { PUZZLES, type Difficulty, type Puzzle } from "./engine/puzzles";
import { gameReducer, initialGameState } from "./state/gameReducer";
import { GameControls } from "./ui/GameControls";

const getRandomPuzzle = (difficulty: Difficulty): Puzzle => {
  const filtered = PUZZLES.filter((p) => (p.difficulty = difficulty));
  return filtered[Math.floor(Math.random() * filtered.length)];
};

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const initialPuzzle = useMemo(() => getRandomPuzzle(difficulty), []);

  const [state, dispatch] = useReducer(
    gameReducer,
    initialGameState(initialPuzzle.puzzle),
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

  const startNewGame = () => {
    const puzzle = getRandomPuzzle(difficulty);
    dispatch({ type: "LOAD_PUZZLE", puzzle: puzzle.puzzle });
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
        <GameControls
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          onNewGame={startNewGame}
          onReset={() => dispatch({ type: "RESET" })}
        />
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
