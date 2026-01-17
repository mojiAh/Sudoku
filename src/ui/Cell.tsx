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
      type="button"
      onClick={() => onSelect(index)}
      className={[
        "w-10 h-10 sm:w-12 sm:h-12",
        "flex items-center justify-center",
        "text-lg sm:text-xl",
        "select-none",
        className,

        // styling by cell type
        isGiven ? "font-semibold text-gray-900" : "text-gray-700",
        isGiven ? "bg-gray-50" : "bg-white",

        isSelected
          ? "bg-blue-200 hover:bg-blue-200"
          : isGiven
          ? "hover:bg-gray-100"
          : "hover:bg-gray-50",

        isGiven ? "cursor-default" : "cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset",
      ].join(" ")}
    >
      {cell.value ?? ""}
    </button>
  );
};
