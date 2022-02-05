import { concat } from 'ramda';
import {
  highlightFibonacci,
  highlightReset,
  highlightMutation,
} from '../grid/utilities';

import { Grid, Coordinate } from '../grid';

export function useHighlight(grid: Grid) {
  const highlight = {
    mutated: new Set<Coordinate>(),
    fibonacci: new Set<Coordinate>(),
  };

  const setMutationHighlight = (coordinates: Coordinate[]) => {
    coordinates.forEach((c) => highlight.mutated.add(c));
    updateGrid();
  };

  const setFibonacciHighlight = (coordinates: Coordinate[]) => {
    coordinates.forEach((c) => highlight.fibonacci.add(c));
    updateGrid();
  };

  const clearHighlights = () => {
    const allCoordinates = concat(
      Array.from(highlight.mutated),
      Array.from(highlight.fibonacci)
    );

    // update the grid
    grid.update(allCoordinates, highlightReset);

    // clear stored highlights
    highlight.mutated.clear();
    highlight.fibonacci.clear();
  };

  const updateGrid = () => {
    grid.update(Array.from(highlight.mutated), highlightMutation);
    grid.update(Array.from(highlight.fibonacci), highlightFibonacci);
  };

  return {
    setMutationHighlight,
    setFibonacciHighlight,
    clearHighlights,
  };
}
