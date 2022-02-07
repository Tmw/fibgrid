import { FibGrid } from '../src/grid';
import { detector } from '../src/fibonacciDetectors/horizontalDetector';

describe(detector, () => {
  test('detects a single fibonacci sequence in rows', () => {
    // prettier-ignore
    const initialValues = [
      0, 1, 2, 3, 5, 8, 
      0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0,
    ];

    const grid = new FibGrid(6, 6, initialValues);

    const expected = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
    ];

    expect(detector(grid)).toStrictEqual(expected);
  });

  test('detects multiple fibonacci sequences on a single row', () => {
    // prettier-ignore
    const initialValues = [
      0, 1, 2, 3, 5, 8, 1, 2, 3, 5, 8, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const grid = new FibGrid(12, 12, initialValues);

    const expected = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 8, y: 0 },
      { x: 9, y: 0 },
      { x: 10, y: 0 },
    ];

    // the found sequence should be the top row
    expect(detector(grid)).toStrictEqual(expected);
  });

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
    expect(detector(grid)).toStrictEqual(expected);
  });

  test('detects fibonacci sequences not starting with 1', () => {
    // prettier-ignore
    const initialValues = [
      0, 3, 5, 8, 13, 21, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const grid = new FibGrid(8, 8, initialValues);

    const expected = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
    ];

    expect(detector(grid)).toStrictEqual(expected);
  });

  test('only detects consecutive sequences of 5 or longer', () => {
    // prettier-ignore
    const initialValues = [
      1, 2, 3, 0, 5, 8, 13,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ];

    const grid = new FibGrid(7, 7, initialValues);

    expect(detector(grid)).toHaveLength(0);
  });
});
