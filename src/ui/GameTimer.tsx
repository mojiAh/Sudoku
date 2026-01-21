type Props = {
  seconds: number;
  onTogglePause: () => void;
  isPaused: boolean;
};

export const GameTimer = ({ seconds, onTogglePause, isPaused }: Props) => {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex items-end gap-3 justify-end w-full">
      <div className="px-4 py-2 rounded-lg bg-white shadow text-sm font-mono">
        ⏱ {mm}:{ss}
      </div>
      <button
        onClick={onTogglePause}
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
      >
        {isPaused ? "▶️" : "⏸"}
      </button>
    </div>
  );
};
