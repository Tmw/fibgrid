import { createApp } from 'vue';

import { useGrid, useFibonacciDetector, useHighlight, useDelay } from './use';
import { Coordinate } from './grid/grid';
import { nullifyCell } from './grid/utilities';

const GRID_SIZE = 50;
const App = createApp({
  setup() {
    const { grid, advance } = useGrid(GRID_SIZE);
    const fibonacciCells = new Set<Coordinate>();

    const { runDetector } = useFibonacciDetector(
      grid,
      (coordinates: Coordinate[]) => {
        coordinates.forEach((c) => fibonacciCells.add(c));
        setFibonacciHighlight(coordinates);
      }
    );

    const { setMutationHighlight, setFibonacciHighlight, clearHighlights } =
      useHighlight(grid);

    const { postpone } = useDelay(600, () => {
      // clear highlighted cells
      clearHighlights();

      // nullify fibonacci cells
      grid.update(Array.from(fibonacciCells), nullifyCell);
      fibonacciCells.clear();
    });

    const handleClick = (coordinate: Coordinate) => {
      advance(coordinate);
      setMutationHighlight(grid.orthogonallyConnected(coordinate));
      runDetector();
      postpone();
    };

    return {
      grid,
      gridCss: { gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` },
      handleClick,
    };
  },
});

App.mount('#app');
