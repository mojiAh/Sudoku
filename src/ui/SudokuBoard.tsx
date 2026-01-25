import { getConflictedIndices } from "../engine/conflicts";
import type { Board } from "../engine/types";
import { SudokuCell } from "./SudokuCell";
import { rowOf, colOf, arePeers } from "../engine/peers";

type Props = {
  board: Board;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

export const SudokuBoard = ({ board, selectedIndex, onSelect }: Props) => {
  const conflicts = getConflictedIndices(board);

  const selectedValue =
    selectedIndex !== null ? board[selectedIndex]?.value : null;

  const isComplete = board.every((cell) => cell.value !== null);
  const isSolved = isComplete && conflicts.size === 0;
  return (
    <div className="flex flex-col items-center gap-3">
      {isSolved && (
        <div className="rounded-lg bg-green-100 text-green-800 px-4 py-2 text-sm font-medium">
          🎉 Solved! Nice one.
        </div>
      )}
      <div className="grid grid-cols-9 border-2 border-gray-900 bg-white shadow-sm">
        {board.map((cell, index) => {
          const row = rowOf(index);
          const col = colOf(index);

          const isSelected = selectedIndex === index;

          const isRelated =
            selectedIndex !== null && arePeers(selectedIndex, index);

          const isSameValue =
            selectedValue !== null &&
            index !== selectedIndex &&
            cell.value === selectedValue;

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
              isRelated={isRelated}
              isSameValue={isSameValue}
              isConflict={conflicts.has(index)}
              onSelect={onSelect}
              className={borderClasses}
            />
          );
        })}
      </div>
    </div>
  );
};
