import { chain } from 'ramda';
import { Grid, Coordinate, Cell } from '@/grid/grid';
import { detector as patternDetector } from '@/detector/detector';
import { horizontals } from '@/detector/scanner/horizontal';
import { verticals } from './scanner/vertical';

type Inner = (grid: Grid, minimumLength: number) => Coordinate[];
type Scanner = (grid: Grid) => Cell[][];

export function makeDetector(...scanners: Scanner[]): Inner {
  return (grid: Grid, minimumLength = 5) => {
    const detector = patternDetector(minimumLength);
    const candidates = scanners.reduce(
      (res: Cell[][], fn: Scanner): Cell[][] => {
        return res.concat(fn(grid));
      },
      []
    );

    return chain(detector, candidates);
  };
}

export const horizontalAndVerticalDetector = makeDetector(
  horizontals,
  verticals
);

export const horizontalDetector = makeDetector(horizontals);
