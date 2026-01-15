import { useState } from "react";
import { SudokuBoard } from "./ui/SudokuBoard";
import { parsePuzzle } from "./engine/parse";
import { PUZZLES } from "./engine/puzzles";
import type { Board } from "./engine/types";
import "./App.css";

function App() {
  const [board, setBoard] = useState<Board>(() => parsePuzzle(PUZZLES[0]));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SudokuBoard
        board={board}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />
    </div>
  );
}

export default App;
