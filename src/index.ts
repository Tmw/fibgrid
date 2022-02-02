import { compose } from 'ramda';
import {
  Coordinate,
  makeGrid,
  update,
  orthogonallyConnected,
} from './grid/grid';

import {
  advanceFromCoordinate,
  nullifyCell,
  highlightFibonacci,
  highlightReset,
  highlightMutation,
} from './grid/utilities';

import { detector } from './fibonacciDetectors/horizontalDetector';
import { createApp, ref } from 'vue';

type HighlightState = {
  mutated: Coordinate[];
  fibonacci: Coordinate[];
};

const GRID_SIZE = 50;
const App = createApp({
  setup() {
    const grid = ref(makeGrid(GRID_SIZE, GRID_SIZE));

    const highlightState: HighlightState = {
      mutated: [],
      fibonacci: [],
    };

    let highlightResetTimer: number | null = null;

    const handleClick = (coordinate: Coordinate) => {
      grid.value = advanceFromCoordinate(grid.value, coordinate);

      // Highlight ortogonally connected
      const orthogonals = orthogonallyConnected(grid.value, coordinate);
      grid.value = update(grid.value, orthogonals, highlightMutation);
      highlightState.mutated = highlightState.mutated.concat(orthogonals);

      // Highlight fibonacci cells if any
      const fibonacciCells = detector(grid.value);
      highlightState.fibonacci =
        highlightState.fibonacci.concat(fibonacciCells);

      grid.value = update(grid.value, fibonacciCells, highlightFibonacci);

      // schedule a timer to reset any highlights
      // if there's any previous handle, clear timer first
      if (highlightResetTimer !== null) {
        clearTimeout(highlightResetTimer);
      }

      // then schedule a new timer
      highlightResetTimer = window.setTimeout(() => {
        // un-highlight the "mutated" cells
        const newGrid = update(
          grid.value,
          highlightState.mutated,
          highlightReset
        );

        // un-highlight and reset the fibonacci cells
        const totalReset = compose(nullifyCell, highlightReset);
        grid.value = update(newGrid, highlightState.fibonacci, totalReset);
      }, 600);
    };

    return {
      grid,
      gridCss: { gridTemplateColumns: `repeat(${grid.value.width}, 1fr)` },
      handleClick: handleClick,
    };
  },
});

App.mount('#app');
