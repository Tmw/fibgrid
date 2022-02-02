import { drop, zip, splitEvery } from 'ramda';

import { Cell, Grid, Coordinate } from '../grid/grid';
import { fibonacciIndex } from '../fibonacci';

type FibonacciCandidate = Cell & {
  fibonacciIndex: number | null;
};
const MIN_SEQUENCE_LENGTH = 5;

// Given a current grid status, it will return a list coordinates that are part of
// a fibonacci sequence of at least 5 cells.
const detector = (grid: Grid): Coordinate[] => {
  // assign an optional fibonacci index to each cell
  const candidates = grid.cells.map<FibonacciCandidate>((cell) => ({
    ...cell,
    fibonacciIndex: fibonacciIndex(cell.value),
  }));

  // split the grid in rows
  const lines = splitEvery(grid.width, candidates);

  // try to pluck fibonacci sequences per line
  let fibonacciCoordinates: Coordinate[] = [];
  for (const line of lines) {
    const pairs = zip(drop(1, line), line);

    let currentSequence = [];
    for (const [next, curr] of pairs) {
      if (next.fibonacciIndex === null || curr.fibonacciIndex === null)
        continue;
      if (next.value < 1 || curr.value < 1) continue;

      // check if the fibonacci indexes are increasing by one
      if (next.fibonacciIndex - curr.fibonacciIndex === 1) {
        // starting a new sequence with current coordinate
        if (currentSequence.length === 0) {
          currentSequence.push(curr.coordinate);
        }

        // push the `next` coordinate too
        currentSequence.push(next.coordinate);
      } else {
        // as soon as the fibonacciIndex are not consecutive anymore, push
        // the sub sequence to the list of fibonacciCoordinates.
        if (currentSequence.length >= MIN_SEQUENCE_LENGTH) {
          fibonacciCoordinates = fibonacciCoordinates.concat(currentSequence);
        }
        currentSequence = [];
      }
    }

    if (currentSequence.length >= MIN_SEQUENCE_LENGTH) {
      fibonacciCoordinates = fibonacciCoordinates.concat(currentSequence);
    }
  }

  return fibonacciCoordinates;
};

export { detector };
