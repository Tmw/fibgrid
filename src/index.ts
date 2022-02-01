import { any, flatten, includes } from "ramda"
import { Grid, Coordinate, Cell, makeGrid, update } from "./grid";
import { advanceFromCoordinate, nullifyCell } from "./gridUtilities"
import { horizontalFibonacciSequences } from "./horizontalFibonacciSequence"

import { createApp } from "vue"

interface State {
  grid: Grid;
  clickedHistory: number[];
  fibonacci: Coordinate[][];
  fibonacciResetTimerHandle: number | null;
};

interface Tile extends Cell {
  highlighted: boolean
}

const size = 50
const state: State = {
  grid: makeGrid(size, size),
  clickedHistory: [],
  fibonacci: [],
  fibonacciResetTimerHandle: null
};

const App = createApp({
  data() {
    return {
      ...state,
      gridCss: {
        gridTemplateColumns: `repeat(${state.grid.width}, 1fr)`,
      }
    }
  },

  methods: {
    handleClick(coordinate: Coordinate) {
      if(coordinate !== null) {
        this.grid = advanceFromCoordinate(this.grid, coordinate)
      }

      this.fibonacci = horizontalFibonacciSequences(this.grid)
                        .filter((seq: Coordinate[]) => seq.length >= 5);

      if(this.fibonacci.length > 0) {
        // if there's any previous handle, clear timer first
        if(this.fibonacciResetTimerHandle !== null) {
          clearTimeout(this.fibonacciResetTimerHandle)
        }

        // then schedule a new timer
        this.fibonacciResetTimerHandle = setTimeout(() => {
          this.resetFibonacciSequences()
        }, 1000)
      }

      // this.clickedHistory.push(coordinate)
    },

    resetFibonacciSequences() {
      this.grid = update(this.grid, flatten(this.fibonacci), nullifyCell)
      this.fibonacci = []
    }
  },

  computed: {
    tiles(): Tile[] {
      const isHighlighted = ({coordinate}: Cell): boolean =>
        any(includes(coordinate), this.fibonacci)

      return this.grid.cells.map( (cell: Cell) => ({
        ...cell,
        highlighted: isHighlighted(cell),
      }))
    }
  }
})

App.mount('#app')
