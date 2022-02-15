import { map, pipe, pluck } from 'ramda';
import { verticals } from '@/detector/scanner/vertical';
import { FibGrid } from '@/grid';

describe(verticals, () => {
  test('returns columns of a grid', () => {
    // prettier-ignore
    const initialValues = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ]

    const grid = new FibGrid(3, 3, initialValues);

    // prettier-ignore
    const result = pipe(
      verticals, 
      map(pluck('value'))
    )(grid);

    // prettier-ignore
    const expected = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]

    expect(result).toStrictEqual(expected);
  });
});
