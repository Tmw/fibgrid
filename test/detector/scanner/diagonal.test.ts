import { diagonals, ScanDirection } from '@/detector/scanner/diagonal';
import { FibGrid } from '@/grid';
import { pipe, map, prop } from 'ramda';
describe(diagonals, () => {
  test('returns diagonal (ltr) from grid', () => {
    // prettier-ignore
    const initialValues = [
        0, 0, 0, 0, 0, 6,
        0, 0, 0, 0, 5, 0,
        0, 0, 0, 4, 0, 0,
        0, 0, 3, 0, 0, 0,
        0, 2, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0,
    ]

    const grid = new FibGrid(6, 6, initialValues);

    // prettier-ignore
    const expected = [
        [0],
        [0, 0],
        [0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 2, 3, 4, 5, 6],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0],
        [0, 0],
        [0],
    ]

    // prettier-ignore
    const actual = pipe(
      diagonals(), 
      map(map(prop('value')))
    )(grid);

    expect(actual).toStrictEqual(expected);
  });

  test('returns diagonal (rtl) from grid', () => {
    // prettier-ignore
    const initialValues = [
        6, 0, 0, 0, 0, 0,
        0, 5, 0, 0, 0, 0,
        0, 0, 4, 0, 0, 0,
        0, 0, 0, 3, 0, 0,
        0, 0, 0, 0, 2, 0,
        0, 0, 0, 0, 0, 1,
    ]

    const grid = new FibGrid(6, 6, initialValues);

    // prettier-ignore
    const expected = [
        [0],
        [0, 0],
        [0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 2, 3, 4, 5, 6],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0],
        [0, 0],
        [0],
    ]

    // prettier-ignore
    const actual = pipe(
      diagonals(ScanDirection.RightToLeft), 
      map(map(prop('value')))
    )(grid);

    expect(actual).toStrictEqual(expected);
  });
});
