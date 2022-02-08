import { splitEvery, groupWith, flatten, isNil, uniq, pluck } from 'ramda';
import { Cell, Grid, Coordinate } from '../grid/grid';
import { fibonacciIndex } from '../fibonacci';

type FibonacciCandidate = {
  cell: Cell;
  fibonacciIndex: number | null;
};

// when two cells have an increasing or decreasing fibonacci index value
// they are considered fibonacci neighbours.
function areFibonacciNeighbours(
  a: FibonacciCandidate,
  b: FibonacciCandidate
): boolean {
  if (isNil(a.fibonacciIndex) || isNil(b.fibonacciIndex)) {
    return false;
  }

  if (a.cell.value <= 0 || b.cell.value <= 0) {
    return false;
  }

  return Math.abs(a.fibonacciIndex - b.fibonacciIndex) === 1;
}

// a valid sequence consists of 5 or more unique fibonacci members
const validSequence =
  (minimumLength: number) =>
  (s: FibonacciCandidate[]): boolean => {
    return uniq(pluck('fibonacciIndex', s)).length >= minimumLength;
  };

// Given a current grid status, it will return a list coordinates that are part of
// a fibonacci sequence of at least 5 cells.
export function detector(grid: Grid, minimumLength = 5): Coordinate[] {
  // assign an optional fibonacci index to each cell
  const candidates = grid.cells.map<FibonacciCandidate>((cell) => ({
    cell,
    fibonacciIndex: fibonacciIndex(cell.value),
  }));

  // split the grid in rows
  const lines = splitEvery(grid.width, candidates);

  // try to pluck fibonacci sequences per line
  const fibonacciCoordinates = lines.flatMap<FibonacciCandidate>(
    (line): FibonacciCandidate[] => {
      const sequenceCandidates = groupWith(areFibonacciNeighbours, line);
      return flatten(sequenceCandidates.filter(validSequence(minimumLength)));
    }
  );

  return fibonacciCoordinates.map((c) => c.cell.coordinate);
}
