import { detector } from '../fibonacciDetectors/horizontalDetector';
import { Grid, Coordinate } from '../grid';

// Detect fibonacci sequences in the given grid and trigger
// the callback once the given threshold is reached
type FibonacciDetectorCallback = (coordinates: Coordinate[]) => void;
export function useFibonacciDetector(
  grid: Grid,
  cb: FibonacciDetectorCallback
) {
  const runDetector = () => {
    const fibonacciCells = detector(grid);
    if (fibonacciCells.length > 0) {
      cb(fibonacciCells);
    }
  };

  return { runDetector };
}
