import { horizontalAndVerticalDetector } from '@/detector';
import { Grid, Coordinate } from '@/grid';

// Detect fibonacci sequences in the given grid and trigger
// the callback once the given threshold is reached
type FibonacciDetectorCallback = (coordinates: Coordinate[]) => void;
export function useFibonacciDetector(
  grid: Grid,
  cb: FibonacciDetectorCallback
) {
  const runDetector = () => {
    const fibonacciCells = horizontalAndVerticalDetector(grid, 5);
    if (fibonacciCells.length > 0) {
      cb(fibonacciCells);
    }
  };

  return { runDetector };
}
