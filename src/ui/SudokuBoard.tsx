import { getConflictedIndices } from "../engine/conflicts";
import type { Board } from "../engine/types";
import { SudokuCell } from "./SudokuCell";

type Props = {
  board: Board;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

const rowOf = (i: number): number => Math.floor(i / 9);
const colOf = (i: number): number => i % 9;

const boxStart = (n: number) => Math.floor(n / 3) * 3;
const isSameBox = (a: number, b: number) => {
  const ra = rowOf(a),
    ca = colOf(a);
  const rb = rowOf(b),
    cb = colOf(b);

  return boxStart(ra) === boxStart(rb) && boxStart(ca) === boxStart(cb);
};

export const SudokuBoard = ({ board, selectedIndex, onSelect }: Props) => {
  const conflicts = getConflictedIndices(board);

  const selectedValue =
    selectedIndex !== null ? board[selectedIndex]?.value : null;
  return (
    <div className="grid grid-cols-9 border-2 border-gray-900 bg-white shadow-sm">
      {board.map((cell, index) => {
        const row = rowOf(index);
        const col = colOf(index);

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

        const isRelated =
          selectedIndex !== null &&
          index !== selectedIndex &&
          (rowOf(selectedIndex) === row ||
            colOf(selectedIndex) === col ||
            isSameBox(selectedIndex, index));

        const isSameValue =
          selectedValue !== null &&
          index !== selectedIndex &&
          cell.value === selectedValue;

        return (
          <SudokuCell
            key={index}
            index={index}
            cell={cell}
            isSelected={isSelected}
            isRelated={isRelated}
            isSameValue={isSameValue}
            isConflict={conflicts.has(index)}
            onSelect={onSelect}
            className={borderClasses}
          />
        );
      })}
    </div>
  );
};
