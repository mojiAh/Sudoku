import type { Board } from "./types";

export function parsePuzzle(puzzle: string): Board {
  if (puzzle.length !== 81) throw new Error("Puzzle must be 81 characters");

  return [...puzzle].map((ch) => {
    const d = Number(ch);
    if (!Number.isInteger(d) || d < 0 || d > 9) {
      throw new Error(`Invalid character: "${ch}"`);
    }
    return d === 0
      ? { given: null, value: null, notes: [] }
      : { given: d, value: d, notes: [] };
  });
}
