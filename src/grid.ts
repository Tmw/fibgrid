type Value = number

interface Coordinate {
  x: number;
  y: number;
}

interface Grid {
  width: number;
  height: number;
  cells: Cell[];
}

interface Cell {
  coordinate: Coordinate;
  value: Value;
}

const indexToCoordinate = (gridWidth: number, index: number): Coordinate => {
  return {
    x: index % gridWidth,
    y: Math.floor(index / gridWidth),
  }
}

const coordinateToIndex = (gridWidth: number) => ({x, y}: Coordinate): number =>
  gridWidth * y + x

const makeCells = (width: number, height: number, initialValues: Value[] | undefined = undefined): Cell[] => 
  Array(width * height).fill(0).map((value, index) => ({
    coordinate: indexToCoordinate(width, index),
    value: initialValues ? initialValues[index] : value,
  }))

// Make a new grid, initialized width * height cells initialized with a zero value
const makeGrid = (width: number, height: number, initialValues: number[] | undefined = undefined): Grid => {
  return { 
    width, 
    height, 
    cells: makeCells(width, height, initialValues) 
  }
}

// Updates the cells in the given grid on the given coordinates using the given updater function
type UpdaterFn = (c: Cell) => Value
const update = (grid: Grid, coordinates: Coordinate[], fn: UpdaterFn): Grid => {
  let indexes = coordinates.map(coordinateToIndex(grid.width))
  const newGrid = {...grid}

  for(let index of indexes) {
    newGrid.cells[index].value = fn(newGrid.cells[index])
  }

  return newGrid
}

const isOrthogonallyInline = (origin: Coordinate, subject: Coordinate): boolean => 
  origin.x == subject.x || origin.y == subject.y

// Returns all the Coordinates orthogonally (horizontal / vertical)
// connected to the given origin Coordinate.
const orthogonallyConnected = (grid: Grid, origin: Coordinate): Coordinate[] =>
    grid.cells
        .filter(cell => isOrthogonallyInline(origin, cell.coordinate))
        .map(cell => cell.coordinate)

export { 
  Cell, Grid, Coordinate, UpdaterFn, Value,
  makeGrid,
  orthogonallyConnected,
  update
 };
