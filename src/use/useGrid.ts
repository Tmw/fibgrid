import { reactive } from 'vue';
import { Grid, FibGrid, Coordinate } from '@/grid';
import { advanceFromCoordinate } from '@/grid/utilities';

// wrapper around the FibGrid class. Exposes a reactive
// handle to the grid itself and an advance function to advance orthogonals
// from a given origin coordinate.
export function useGrid(dimension: number) {
  const grid = reactive<Grid>(new FibGrid(dimension, dimension));
  const advance = (origin: Coordinate) => advanceFromCoordinate(grid, origin);

  return {
    grid,
    advance,
  };
}
