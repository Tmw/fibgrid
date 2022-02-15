import { splitEvery, transpose } from 'ramda';
import { Grid, Cell } from '@/grid';

// given a grid it will return all columns in that grid
export function verticals(grid: Grid): Cell[][] {
  const horizontals = splitEvery(grid.width, grid.cells);
  return transpose(horizontals);
}
