import { prop } from 'ramda';

import { Grid, makeGrid } from '../src/grid';
import { advanceFromCoordinate } from '../src/gridUtilities';

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
