import { Grid, Cell } from '@/grid';
import { min, max } from 'ramda';

export enum ScanDirection {
  LeftToRight,
  RightToLeft,
}

// return diagonals of a given grid. Using the `scanDirection` option we determine
// the traversal direction to be either from left-to-right or from right-to-left.
export const diagonals =
  (scanDirection = ScanDirection.LeftToRight) =>
  (grid: Grid): Cell[][] => {
    const out: Cell[][] = [];

    for (let i = 0; i <= grid.width * 2 - 1; i++) {
      const startX = max(0, i - grid.width + 1);
      const startY = min(i, grid.width - 1);
      const length = min(startY, grid.width - 1 - startX) + 1;

      for (let j = 0; j < length; j++) {
        if (out[i] == undefined) {
          out[i] = [];
        }

        // based on the `scanDirection` param we'll traverse the cells in opposite direction
        // so that diagonals can be detected from left-to-right as well as from right-to-left.
        const cellIndex = getIndex(scanDirection)(
          grid.width,
          startX,
          j,
          startY
        );
        const cellAtIndex = grid.cells.at(cellIndex);
        if (cellAtIndex != undefined) {
          out[i].push(cellAtIndex);
        }
      }
    }

    return out;
  };

const getIndex =
  (scanDirection: ScanDirection) =>
  (gridWidth: number, startX: number, j: number, startY: number): number => {
    if (scanDirection == ScanDirection.RightToLeft) {
      return gridWidth - 1 - startX - j + (startY - j) * gridWidth;
    }
    return startX + j + (startY - j) * gridWidth;
  };
