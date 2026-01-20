import type { Difficulty } from "../engine/puzzles";

const controlBtnBase =
  "w-12 h-12 flex items-center justify-center rounded-lg " +
  "border border-gray-300 bg-white text-xl " +
  "hover:bg-gray-100 active:bg-gray-200 " +
  "disabled:opacity-40 disabled:cursor-not-allowed";

type Props = {
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
  onNewGame: () => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  isUndoDisabled: boolean;
  isRedoDisabled: boolean;
};
export const GameControls = ({
  difficulty,
  onDifficultyChange,
  onNewGame,
  onReset,
  onUndo,
  onRedo,
  isUndoDisabled,
  isRedoDisabled,
}: Props) => {
  return (
    <div className="flex items-center gap-3 justify-between w-full">
      <select
        id="difficulty"
        name="difficulty"
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <div className="flex gap-2">
        <button
          onClick={onUndo}
          disabled={isUndoDisabled}
          className={controlBtnBase}
          title="Undo"
        >
          ↶
        </button>

        <button
          onClick={onRedo}
          disabled={isRedoDisabled}
          className={controlBtnBase}
          title="Redo"
        >
          ↷
        </button>

        <button onClick={onReset} className={controlBtnBase} title="Reset">
          ⟲
        </button>

        <button onClick={onNewGame} className={controlBtnBase} title="New Game">
          🆕
        </button>
      </div>
    </div>
  );
};
