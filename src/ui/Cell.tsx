import type { Cell } from "../engine/types";

type Props = {
  cell: Cell;
  index: number;
  isSelected: boolean;
  onSelect: (i: number) => void;
};
export const SudokuCell = ({ cell, index, isSelected, onSelect }: Props) => {
  return (
    <div
      className={isSelected ? "cell selected" : "cell"}
      onClick={() => onSelect(index)}
    >
      {cell.value ?? ""}
    </div>
  );
};
