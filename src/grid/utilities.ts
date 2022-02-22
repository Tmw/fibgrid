import { Coordinate, Grid, Cell, Value, Highlight } from './grid';

export const advanceCell = (cell: Cell): Cell => ({
  ...cell,
  value: cell.value + 1,
});

export const setCellValue =
  (newValue: Value) =>
  (cell: Cell): Cell => ({ ...cell, value: newValue });

export const nullifyCell = setCellValue(0);

export const setCellHighlight = (highlight: Highlight) => (cell: Cell) => ({
  ...cell,
  highlight: highlight,
});

export const highlightMutation = setCellHighlight(Highlight.MUTATION);
export const highlightReset = setCellHighlight(Highlight.NONE);
export const highlightFibonacci = setCellHighlight(Highlight.FIBONACCI);

export const advanceFromCoordinate = (grid: Grid, origin: Coordinate) => {
  const connected = grid.orthogonallyConnected(origin);
  grid.update(connected, advanceCell);
};
