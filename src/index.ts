import { flatten, compose } from 'ramda';
import {
  Grid,
  Coordinate,
  makeGrid,
  update,
  orthogonallyConnected,
} from './grid';
import {
  advanceFromCoordinate,
  nullifyCell,
  highlightFibonacci,
  highlightReset,
  highlightMutation,
} from './gridUtilities';
import { horizontalFibonacciSequences } from './horizontalFibonacciSequence';

import { createApp } from 'vue';

type HighlightState = {
  mutated: Coordinate[];
  fibonacci: Coordinate[];
};

type State = {
  grid: Grid;
  fibonacciResetTimerHandle: number | null;
  highlightState: HighlightState;
};

const size = 50;
const state: State = {
  grid: makeGrid(size, size),
  fibonacciResetTimerHandle: null,
  highlightState: {
    mutated: [],
    fibonacci: [],
  },
};

const App = createApp({
  data() {
    return {
      ...state,
      gridCss: {
        gridTemplateColumns: `repeat(${state.grid.width}, 1fr)`,
      },
    };
  },

  methods: {
    handleClick(coordinate: Coordinate) {
      if (coordinate === null) return;

      let advancedGrid = advanceFromCoordinate(this.grid, coordinate);

      // Highlight ortogonally connected
      const orthogonals = orthogonallyConnected(this.grid, coordinate);
      advancedGrid = update(advancedGrid, orthogonals, highlightMutation);
      this.highlightState.mutated =
        this.highlightState.mutated.concat(orthogonals);

      // Highlight fibonacci cells if any
      const fibonacciCells = flatten(
        horizontalFibonacciSequences(advancedGrid).filter(
          (seq: Coordinate[]) => seq.length >= 5
        )
      );

      this.highlightState.fibonacci =
        this.highlightState.fibonacci.concat(fibonacciCells);

      this.grid = update(advancedGrid, fibonacciCells, highlightFibonacci);

      // TODO: Update the tests so the highlight functionality is covered too

      // schedule a timer to reset any highlights
      // if there's any previous handle, clear timer first
      if (this.fibonacciResetTimerHandle !== null) {
        clearTimeout(this.fibonacciResetTimerHandle);
      }

      // then schedule a new timer
      this.fibonacciResetTimerHandle = setTimeout(() => {
        // un-highlight the "mutated" cells
        const newGrid = update(
          this.grid,
          this.highlightState.mutated,
          highlightReset
        );

        // un-highlight and reset the fibonacci cells
        const totalReset = compose(nullifyCell, highlightReset);
        this.grid = update(newGrid, this.highlightState.fibonacci, totalReset);
      }, 600);
    },
  },
});

App.mount('#app');
