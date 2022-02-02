import { prop } from 'ramda';
import {
  Coordinate,
  makeGrid,
  orthogonallyConnected,
  update,
} from '../src/grid';

import { setCellValue } from '../src/gridUtilities';

describe(makeGrid, () => {
  test('initializes a new grid with correct number of cells', () => {
    const subject = makeGrid(5, 5);
    expect(subject.cells).toHaveLength(25);
  });

  test('initializes the grid with all zeroes if no initial values are passed', () => {
    const subject = makeGrid(5, 5);
    const values = subject.cells.map(prop('value'));
    const expected = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    expect(values).toStrictEqual(expected);
  });

  test('initializes the grid with initial values', () => {
    const subject = makeGrid(
      5,
      5,
      [
        1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4,
        5,
      ]
    );

    const values = subject.cells.map(prop('value'));
    const expected = [
      1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5,
    ];

    expect(values).toStrictEqual(expected);
  });
});

describe(orthogonallyConnected, () => {
  const grid = makeGrid(5, 5);
  const orthogonals = orthogonallyConnected(grid, { x: 2, y: 2 });
  const expected: Coordinate[] = [
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 2, y: 3 },
    { x: 2, y: 4 },
  ];

  expect(orthogonals).toStrictEqual(expected);
});

describe(update, () => {
  test('updates cells at given coordinates', () => {
    const grid = makeGrid(5, 5);
    const coordinates = [
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
    ];

    const updatedGrid = update(grid, coordinates, setCellValue(8));
    const updatedValues = updatedGrid.cells.map(prop('value'));

    const expectedValues = [
      0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 8, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0,
    ];

    expect(updatedValues).toStrictEqual(expectedValues);
  });
});
