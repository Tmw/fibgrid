import { chain, pipe } from 'ramda';
import { Grid, Coordinate } from '../grid/grid';
import { detector } from './detector';
import { horizontals } from './scanner/horizontal';

export function horizontalDetector(
  grid: Grid,
  minimumLength = 5
): Coordinate[] {
  // prettier-ignore
  return pipe(
    horizontals, 
    chain(detector(minimumLength))
  )(grid);
}
