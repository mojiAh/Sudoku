const rowOf = (i: number) => Math.floor(i / 9);
const colOf = (i: number) => i % 9;

const boxOf = (i: number) => {
  const r = rowOf(i);
  const c = colOf(i);
  return Math.floor(r / 3) * 3 + Math.floor(c / 3);
};

export const arePeers = (a: number, b: number) => {
  if (a === b) return false;

  return (
    rowOf(a) === rowOf(b) || colOf(a) === colOf(b) || boxOf(a) === boxOf(b)
  );
};

// TODO: refactor the app to remove all similar fucntions in SudokuBoard and conflict and reuse same functions
