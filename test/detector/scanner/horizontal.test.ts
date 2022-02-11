import { horizontals } from '@/detector/scanner/horizontal';
import { FibGrid } from '@/grid';
import { pipe, pluck, map } from 'ramda';

describe(horizontals, () => {
  test('returns rows of a given grid', () => {
    // prettier-ignore
    const initialValues = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
    ]

    const grid = new FibGrid(3, 3, initialValues);

    // prettier-ignore
    const expected = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ]

    // prettier-ignore
    const result = pipe(
        horizontals, 
        map(pluck('value'))
    )(grid);

    expect(result).toStrictEqual(expected);
  });
});
