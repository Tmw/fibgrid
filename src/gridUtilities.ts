import {
  Coordinate,
  Grid,
  update,
  Cell,
  orthogonallyConnected,
  Value,
  Highlight,
} from './grid';

const advanceCell = (cell: Cell): Cell => ({ ...cell, value: cell.value + 1 });

const setCellValue =
  (newValue: Value) =>
  (cell: Cell): Cell => ({ ...cell, value: newValue });

const nullifyCell = setCellValue(0);

const setCellHighlight = (highlight: Highlight) => (cell: Cell) => ({
  ...cell,
  highlight: highlight,
});

const highlightMutation = setCellHighlight('mutation');
const highlightReset = setCellHighlight('none');
const highlightFibonacci = setCellHighlight('fibonacci');

const advanceFromCoordinate = (grid: Grid, origin: Coordinate): Grid => {
  const connected = orthogonallyConnected(grid, origin);
  return update(grid, connected, advanceCell);
};

export {
  advanceFromCoordinate,
  orthogonallyConnected,
  advanceCell,
  nullifyCell,
  setCellValue,
  setCellHighlight,
  highlightMutation,
  highlightFibonacci,
  highlightReset,
};
