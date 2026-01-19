import { useEffect, useMemo, useReducer, useState } from "react";
import { SudokuBoard } from "./ui/SudokuBoard";
import { PUZZLES, type Difficulty, type Puzzle } from "./engine/puzzles";
import { gameReducer, initialGameState } from "./state/gameReducer";
import { GameControls } from "./ui/GameControls";
import { NumberPad } from "./ui/NumberPad";

const getRandomPuzzle = (difficulty: Difficulty): Puzzle => {
  const filtered = PUZZLES.filter((p) => p.difficulty === difficulty);
  return filtered[Math.floor(Math.random() * filtered.length)];
};

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const initialPuzzle = useMemo(
    () => getRandomPuzzle(difficulty),
    [difficulty],
  );
  const [state, dispatch] = useReducer(
    gameReducer,
    initialGameState(initialPuzzle.puzzle),
  );
  const selected = state.selectedIndex;

  const clearCell = () => {
    if (selected === null) return;
    dispatch({ type: "SET_CELL_VALUE", index: selected, value: null });
  };

  const setNumber = (num: number) => {
    if (selected === null) return;
    dispatch({ type: "SET_CELL_VALUE", index: selected, value: Number(num) });
  };

  const startNewGame = () => {
    const puzzle = getRandomPuzzle(difficulty);
    dispatch({ type: "LOAD_PUZZLE", puzzle: puzzle.puzzle });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const idx = state.selectedIndex;
      if (idx === null) return;

      if (e.key === "Backspace" || e.key === "Delete") {
        dispatch({ type: "SET_CELL_VALUE", index: idx, value: null });
        return;
      }

      if (/^[1-9]$/.test(e.key)) {
        dispatch({ type: "SET_CELL_VALUE", index: idx, value: Number(e.key) });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state.selectedIndex, dispatch]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-6"
      onMouseDown={(e) => {
        if ((e.target as HTMLElement).closest("[data-sudoku-board]")) return;
        dispatch({ type: "SELECT_CELL", index: null });
      }}
    >
      <div data-sudoku-board className="flex flex-col items-center gap-4">
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
          }}
        />
        <NumberPad
          onClear={clearCell}
          onNumber={setNumber}
          disabled={
            state.selectedIndex === null ||
            state.board[state.selectedIndex].given !== null
          }
        />
        <div className="text-sm text-gray-600">
          Click a cell, then type 1–9. Backspace/Delete clears.
        </div>
      </div>
    </div>
  );
}

export default App;
