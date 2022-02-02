type Value = number;
type Highlight = 'none' | 'mutation' | 'fibonacci';

type Coordinate = {
  x: number;
  y: number;
};

type Grid = {
  width: number;
  height: number;
  cells: Cell[];
};

type Cell = {
  coordinate: Coordinate;
  value: Value;
  highlight: Highlight;
};

const indexToCoordinate = (gridWidth: number, index: number): Coordinate => {
  return {
    x: index % gridWidth,
    y: Math.floor(index / gridWidth),
  };
};

const coordinateToIndex =
  (gridWidth: number) =>
  ({ x, y }: Coordinate): number =>
    gridWidth * y + x;

const makeCells = (
  width: number,
  height: number,
  initialValues: Value[] | undefined = undefined
): Cell[] =>
  Array(width * height)
    .fill(0)
    .map((value, index) => ({
      coordinate: indexToCoordinate(width, index),
      value: initialValues ? initialValues[index] : value,
      highlight: 'none',
    }));

// Make a new grid, initialized width * height cells initialized with a zero value
const makeGrid = (
  width: number,
  height: number,
  initialValues: number[] | undefined = undefined
): Grid => {
  return {
    width,
    height,
    cells: makeCells(width, height, initialValues),
  };
};

// Updates the cells in the given grid on the given coordinates using the given updater function
type UpdaterFn = (c: Cell) => Cell;
const update = (grid: Grid, coordinates: Coordinate[], fn: UpdaterFn): Grid => {
  const indexes = coordinates.map(coordinateToIndex(grid.width));
  const newGrid = { ...grid };

  for (const index of indexes) {
    newGrid.cells[index] = fn(newGrid.cells[index]);
  }

  return newGrid;
};

const isOrthogonallyInline = (
  origin: Coordinate,
  subject: Coordinate
): boolean => origin.x == subject.x || origin.y == subject.y;

// Returns all the Coordinates orthogonally (horizontal / vertical)
// connected to the given origin Coordinate.
const orthogonallyConnected = (grid: Grid, origin: Coordinate): Coordinate[] =>
  grid.cells
    .filter((cell) => isOrthogonallyInline(origin, cell.coordinate))
    .map((cell) => cell.coordinate);

export {
  Cell,
  Grid,
  Coordinate,
  UpdaterFn,
  Value,
  Highlight,
  makeGrid,
  orthogonallyConnected,
  update,
};
