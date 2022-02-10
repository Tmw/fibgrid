import { splitEvery } from 'ramda';
import { Grid, Cell } from '@/grid';

// given a grid it will return all rows in that grid
export function horizontals(grid: Grid): Cell[][] {
  return splitEvery(grid.width, grid.cells);
}
