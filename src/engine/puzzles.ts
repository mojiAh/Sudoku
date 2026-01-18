export type Difficulty = "easy" | "medium" | "hard";

export type Puzzle = {
  id: string;
  difficulty: Difficulty;
  puzzle: string;
};

export const PUZZLES: Puzzle[] = [
  {
    id: "easy-1",
    difficulty: "easy",
    puzzle:
      "530070000600195000098000060800060003400803001700020006060000280000419005000080079",
  },
];
