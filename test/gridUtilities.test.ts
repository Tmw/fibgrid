import { prop } from 'ramda';

import { Cell, Grid, Highlight, makeGrid } from '../src/grid';
import {
  advanceFromCoordinate,
  highlightMutation,
  highlightFibonacci,
  highlightReset,
} from '../src/gridUtilities';

describe(advanceFromCoordinate, () => {
  let grid: Grid;
  beforeAll(() => (grid = makeGrid(5, 5)));

  test('increments orthogonally from coordinate', () => {
    const updatedGrid = advanceFromCoordinate(grid, { x: 1, y: 2 });
    const expectedValues = [
      0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
    ];

    expect(updatedGrid.cells.map(prop('value'))).toStrictEqual(expectedValues);
  });
});

describe('updating cell highlights', () => {
  const makeCell = (highlight: Highlight): Cell => ({
    coordinate: { x: 0, y: 0 },
    value: 12,
    highlight: highlight,
  });

  test('mutation highlight', () => {
    const cell = makeCell('none');
    expect(highlightMutation(cell)).toHaveProperty('highlight', 'mutation');
  });

  test('fibonacci highlight', () => {
    const cell = makeCell('none');
    expect(highlightFibonacci(cell)).toHaveProperty('highlight', 'fibonacci');
  });

  test('reset highlight', () => {
    const cell = makeCell('fibonacci');
    expect(highlightReset(cell)).toHaveProperty('highlight', 'none');
  });
});
