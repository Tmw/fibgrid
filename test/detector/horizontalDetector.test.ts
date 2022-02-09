import { FibGrid } from '../../src/grid';
import { horizontalDetector } from '../../src/detector';

describe(horizontalDetector, () => {
  test('detects multiple fibonacci sequences across multiple rows', () => {
    // prettier-ignore
    const initialValues = [
      0, 1, 2, 3, 5, 8, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 1, 2, 3, 5, 8, 0, 
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 1, 2, 3, 5, 8, 
      0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const grid = new FibGrid(8, 8, initialValues);

    const expected = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
      { x: 6, y: 2 },
      { x: 3, y: 6 },
      { x: 4, y: 6 },
      { x: 5, y: 6 },
      { x: 6, y: 6 },
      { x: 7, y: 6 },
    ];

    // the found sequence should be the top row
    expect(horizontalDetector(grid)).toStrictEqual(expected);
  });
});
