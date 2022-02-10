import { prop, repeat } from 'ramda';
import { Coordinate, FibGrid } from '@/grid';
import { setCellValue } from '@/grid/utilities';

describe(FibGrid, () => {
  describe('#new', () => {
    test('initializes a new grid with correct number of cells', () => {
      const grid = new FibGrid(5, 5);
      expect(grid.cells).toHaveLength(25);
    });

    test('initializes the grid with all zeroes if no initial values are passed', () => {
      const grid = new FibGrid(5, 5);
      const values = grid.cells.map(prop('value'));
      const expected = repeat(0, 5 * 5);

      expect(values).toStrictEqual(expected);
    });

    test('initializes the grid with initial values', () => {
      // prettier-ignore
      const initialValues = [
        1, 2, 3, 4, 5, 
        1, 2, 3, 4, 5, 
        1, 2, 3, 4, 5, 
        1, 2, 3, 4, 5, 
        1, 2, 3, 4, 5,
      ];

      const grid = new FibGrid(5, 5, initialValues);
      const values = grid.cells.map(prop('value'));
      expect(values).toStrictEqual(initialValues);
    });
  });

  describe('.orthogonallyConnected', () => {
    const grid = new FibGrid(5, 5);
    const orthogonals = grid.orthogonallyConnected({ x: 2, y: 2 });
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

  describe('.update', () => {
    test('updates cells at given coordinates', () => {
      const grid = new FibGrid(5, 5);
      const coordinates = [
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
      ];

      grid.update(coordinates, setCellValue(8));

      const updatedValues = grid.cells.map(prop('value'));

      // prettier-ignore
      const expectedValues = [
        0, 0, 0, 0, 0, 
        0, 0, 8, 0, 0, 
        0, 0, 8, 0, 0, 
        0, 0, 8, 0, 0, 
        0, 0, 0, 0, 0,
      ];

      expect(updatedValues).toStrictEqual(expectedValues);
    });
  });
});
