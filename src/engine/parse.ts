import type { Board } from "./types";

export function parsePuzzle(puzzle: string): Board {
  const board: Board = [];
  if (puzzle.length !== 81) throw new Error("Size of puzzle is 81");

  for (const character of puzzle) {
    const digit = Number(character);
    if (digit === 0) board.push({ given: null, value: null });
    board.push({ given: digit, value: digit });
  }

  return board;
}
