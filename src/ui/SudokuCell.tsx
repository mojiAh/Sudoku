import type { Cell } from "../engine/types";

type Props = {
  cell: Cell;
  index: number;
  isSelected: boolean;
  isRelated: boolean;
  isSameValue: boolean;
  onSelect: (i: number) => void;
  className?: string;
};
export const SudokuCell = ({
  cell,
  index,
  isSelected,
  isRelated,
  isSameValue,
  onSelect,
  className = "",
}: Props) => {
  const isGiven = cell.given !== null;

  const bgClass = isSelected
    ? "bg-blue-200"
    : isSameValue
    ? "bg-blue-100"
    : isRelated
    ? "bg-gray-100"
    : isGiven
    ? "bg-gray-50"
    : "bg-white";

  const hoverClass = isSelected
    ? "hover:bg-blue-200"
    : isGiven
    ? "hover:bg-gray-100"
    : "hover:bg-gray-50";

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

        isGiven ? "font-semibold text-gray-900" : "text-gray-700",
        isGiven ? "cursor-default" : "cursor-pointer",

        bgClass,
        hoverClass,

        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset",
      ].join(" ")}
    >
      {cell.value ?? ""}
    </button>
  );
};
