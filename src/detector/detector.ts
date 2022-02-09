import {
  groupWith,
  flatten,
  isNil,
  uniq,
  pluck,
  pipe,
  length,
  lte,
} from 'ramda';

import { fibonacciIndex } from '../fibonacci';
import { Cell, Coordinate } from '../grid';

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
// prettier-ignore
const validSequence = (minimumLength: number) =>
    pipe(
      pluck('fibonacciIndex'),
      uniq, 
      length, 
      lte(minimumLength)
    );

// Given a list of cells it will detect the presence of a valid fibonacci sequence.
// the minimum length of said sequence can be specified using the `minimumLength` param
// and the return type is a list of coordinates that make up this sequence.
export const detector =
  (minimumLength = 5) =>
  (candidates: Cell[]): Coordinate[] => {
    // assign an optional fibonacci index to each cell
    const fibonacciCandidates = candidates.map<FibonacciCandidate>((cell) => ({
      cell,
      fibonacciIndex: fibonacciIndex(cell.value),
    }));

    // group the candidates when they are fibonacci neighbours. For example
    // cells 1 and 2 are neighbours. 1 and 3 are not, but 3 and 5 are and so on.
    const sequenceCandidates = groupWith(
      areFibonacciNeighbours,
      fibonacciCandidates
    );

    const fibonacciCoordinates = flatten(
      sequenceCandidates.filter(validSequence(minimumLength))
    );

    return fibonacciCoordinates.map((c) => c.cell.coordinate);
  };

export const defaultDetector = (candidates: Cell[]) => detector(5)(candidates);
