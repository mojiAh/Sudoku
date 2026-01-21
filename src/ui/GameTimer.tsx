type Props = {
  seconds: number;
};

export const GameTimer = ({ seconds }: Props) => {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="px-4 py-2 rounded-lg bg-white shadow text-sm font-mono">
      ⏱ {mm}:{ss}
    </div>
  );
};
