import type { Board } from "../engine/types";
import { SudokuCell } from "./Cell";

type Props = {
  board: Board;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

export const SudokuBoard = ({ board, selectedIndex, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-9 border-2 border-gray-900 bg-white shadow-sm">
      {board.map((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;

        const isSelected = selectedIndex === index;

        const thickLeft = col % 3 === 0;
        const thickTop = row % 3 === 0;
        const thickRight = col === 8;
        const thickBottom = row === 8;

        const borderClasses = [
          thickLeft
            ? "border-l-2 border-l-gray-900"
            : "border-l border-l-gray-300",
          thickTop
            ? "border-t-2 border-t-gray-900"
            : "border-t border-t-gray-300",
          thickRight ? "border-r-2 border-r-gray-900" : "",
          thickBottom ? "border-b-2 border-b-gray-900" : "",
        ].join(" ");

        return (
          <SudokuCell
            key={index}
            index={index}
            cell={cell}
            isSelected={isSelected}
            onSelect={onSelect}
            className={borderClasses}
          />
        );
      })}
    </div>
  );
};
