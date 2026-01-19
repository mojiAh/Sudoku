type Props = {
  onNumber: (n: number) => void;
  onClear: () => void;
  disabled: boolean;
};

export const NumberPad = ({ onNumber, onClear, disabled }: Props) => {
  return (
    <div className="grid grid-cols-5 gap-2 mt-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          disabled={disabled}
          onClick={() => onNumber(num)}
          className="w-12 h-12 rounded bg-white shadow-sm border text-lg font-medium hover:bg-gray-100 disabled:opacity-40"
        >
          {num}
        </button>
      ))}
      <button
        onClick={onClear}
        disabled={disabled}
        className="w-12 h-12 rounded bg-red-100 border text-red-700 font-medium hover:bg-red-200 disabled:opacity-40"
      >
        X
      </button>
    </div>
  );
};
