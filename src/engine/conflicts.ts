import type { Board } from "./types";

const rowOf = (index: number): number => Math.floor(index / 9);
const colOf = (index: number): number => index % 9;

export function getConflictedIndices(board: Board): Set<number> {
  const conflicts = new Set<number>();

  const seen = new Map<string, number[]>();
  for (let i = 0; i < board.length; i++) {
    const value = board[i]?.value;
    if (value === null) continue;

    const r = rowOf(i);
    const c = colOf(i);
    const br = Math.floor(r / 3);
    const bc = Math.floor(c / 3);

    const keys = [`r${r}:${value}`, `c${c}:${value}`, `b${br}${bc}:${value}`];
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
