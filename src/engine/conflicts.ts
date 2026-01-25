import type { Board } from "./types";
import { rowOf, colOf, boxOf } from "./peers";

export function getConflictedIndices(board: Board): Set<number> {
  const conflicts = new Set<number>();
  const seen = new Map<string, number[]>();

  for (let i = 0; i < board.length; i++) {
    const value = board[i]?.value;
    if (value === null) continue;

    const keys = [
      `r${rowOf(i)}:${value}`,
      `c${colOf(i)}:${value}`,
      `b${boxOf(i)}:${value}`,
    ];

    for (const key of keys) {
      const list = seen.get(key) ?? [];
      list.push(i);
      seen.set(key, list);
    }
  }

  for (const [, indices] of seen) {
    if (indices.length > 1) {
      for (const index of indices) {
        conflicts.add(index);
      }
    }
  }

  return conflicts;
}
