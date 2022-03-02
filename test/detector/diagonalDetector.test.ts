import { FibGrid } from '@/grid';
import { diagonalDetector } from '@/detector';

describe('diagonalDetector', () => {
  test('detects multiple fibonacci sequences across multiple rows', () => {
    // prettier-ignore
    const initialValues = [
      0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 1, 0, 0, 
      0, 0, 0, 0, 2, 0, 0, 0, 
      0, 0, 0, 3, 0, 0, 0, 0,
      0, 0, 5, 0, 5, 0, 0, 0, 
      0, 8, 0, 0, 0, 8, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const grid = new FibGrid(8, 8, initialValues);

    const expected = [
      { x: 1, y: 5 },
      { x: 2, y: 4 },
      { x: 3, y: 3 },
      { x: 4, y: 2 },
      { x: 5, y: 1 },
    ];

    // the found sequence should be the top row
    expect(diagonalDetector(grid, 5)).toStrictEqual(expected);
  });
});
