import { chain } from 'ramda';
import { Grid, Coordinate, Cell } from '@/grid/grid';
import { detector as patternDetector } from '@/detector/detector';
import { horizontals } from '@/detector/scanner/horizontal';
import { verticals } from '@/detector/scanner/vertical';
import { diagonals, ScanDirection } from '@/detector/scanner/diagonal';

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

export const verticalDetector = makeDetector(verticals);
export const horizontalDetector = makeDetector(horizontals);
export const diagonalDetector = makeDetector(
  diagonals(),
  diagonals(ScanDirection.RightToLeft)
);

export const horizontalAndVerticalDetector = makeDetector(
  horizontals,
  verticals
);

export const horizontalVerticalAndDiagonalDetector = makeDetector(
  diagonals(),
  diagonals(ScanDirection.RightToLeft),
  horizontals,
  verticals
);
