import type { Difficulty } from "../engine/puzzles";

type Props = {
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
  onNewGame: () => void;
  onReset: () => void;
};
export const GameControls = ({
  difficulty,
  onDifficultyChange,
  onNewGame,
  onReset,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <select
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button
        onClick={onNewGame}
        className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        New Game
      </button>

      <button
        onClick={onReset}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        Reset
      </button>
    </div>
  );
};
