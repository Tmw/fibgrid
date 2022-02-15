import { Cell } from '@/grid';
import { detector } from '@/detector/detector';

const fiveDetector = detector(5);
const cellify = (values: number[]): Cell[] =>
  values.map<Cell>((value, x) => ({
    value,
    coordinate: { y: 0, x },
    highlight: 'none',
  }));

describe(detector, () => {
  test('detects a single fibonacci sequence in a row', () => {
    const values = cellify([0, 1, 2, 3, 5, 8]);

    const expected = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
    ];

    expect(fiveDetector(values)).toStrictEqual(expected);
  });

  test('detects multiple fibonacci sequences on a single row', () => {
    const values = cellify([0, 1, 2, 3, 5, 8, 1, 2, 3, 5, 8, 0]);

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
    expect(fiveDetector(values)).toStrictEqual(expected);
  });

  test('detects fibonacci sequences not starting with 1', () => {
    const values = cellify([0, 3, 5, 8, 13, 21, 0, 0]);

    const expected = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
    ];

    expect(fiveDetector(values)).toStrictEqual(expected);
  });

  test('only detects fibonacci when full sequence is either increasing or decreasing', () => {
    const values = cellify([1, 2, 3, 5, 3]);
    expect(fiveDetector(values)).toHaveLength(0);
  });

  test('detects reverse fibonacci sequences', () => {
    const values = cellify([8, 5, 3, 2, 1, 0, 0]);
    expect(fiveDetector(values)).toHaveLength(5);
  });

  test('only detects consecutive sequences of 5 or longer', () => {
    const values = cellify([1, 2, 3, 0, 5, 8, 13]);
    expect(fiveDetector(values)).toHaveLength(0);
  });
});
