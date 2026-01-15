import type { Cell } from "../engine/types";

type Props = {
  cell: Cell;
  index: number;
  isSelected: boolean;
  onSelect: (i: number) => void;
  className?: string;
};
export const SudokuCell = ({
  cell,
  index,
  isSelected,
  onSelect,
  className = "",
}: Props) => {
  const isGiven = cell.given !== null;
  return (
    <button
      onClick={() => onSelect(index)}
      className={[
        // sizing + layout
        "w-10 h-10 sm:w-12 sm:h-12",
        "flex items-center justify-center",
        "text-lg sm:text-xl",
        "select-none",

        // borders passed from board
        className,

        // styling by cell type
        isGiven ? "font-semibold text-gray-900" : "text-gray-700",

        // hover/focus
        "hover:bg-gray-50",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset",

        // selected state
        isSelected ? "bg-blue-200" : "bg-white",
      ].join(" ")}
    >
      {cell.value ?? ""}
    </button>
  );
};
