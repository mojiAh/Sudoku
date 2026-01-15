import type { Board } from "../engine/types";
import { SudokuCell } from "./Cell";

type Props = {
  board: Board;
  selectedIndex: number | null;
  onSelect: (i: number) => void;
};

export const SudokuBoard = ({ board, selectedIndex, onSelect }: Props) => {
  return (
    <div>
      {board.map((item, index) => {
        const row = index % 9;
        const col = Math.floor(index / 9);
        const leftThick = row % 3 === 0;
        const topThick = col % 3 === 0;
        return (
          <SudokuCell
            cell={item}
            isSelected={selectedIndex === index}
            onSelect={onSelect}
            index={index}
          />
        );
      })}
    </div>
  );
};
