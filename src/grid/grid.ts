type Value = number;
// type Highlight = 'none' | 'mutation' | 'fibonacci';
enum Highlight {
  NONE = 'none',
  MUTATION = 'mutation',
  FIBONACCI = 'fibonacci',
}

type Coordinate = {
  x: number;
  y: number;
};

type Cell = {
  coordinate: Coordinate;
  value: Value;
  highlight: Highlight;
};

type Optional<T> = T | undefined;
type UpdaterFn = (c: Cell) => Cell;

type Grid = {
  readonly width: number;
  readonly cells: Cell[];
  orthogonallyConnected: (origin: Coordinate) => Coordinate[];
  update: (coordinates: Coordinate[], fn: UpdaterFn) => void;
};

class FibGrid implements Grid {
  readonly width: number;
  readonly cells: Cell[];

  constructor(
    width: number,
    height: number,
    initialValues: Optional<Value[]> = undefined
  ) {
    this.width = width;
    this.cells = this.makeCells(width, height, initialValues);
  }

  // Returns all the Coordinates orthogonally (horizontal / vertical)
  // connected to the given origin Coordinate.
  orthogonallyConnected(origin: Coordinate): Coordinate[] {
    return this.cells
      .filter((cell) => this.isOrthogonallyInline(origin, cell.coordinate))
      .map((cell) => cell.coordinate);
  }

  // Updates the cells in the given grid on the given coordinates
  // using the given updater function
  update(coordinates: Coordinate[], fn: UpdaterFn) {
    const indexes = coordinates.map((coordinate) =>
      this.coordinateToIndex(coordinate)
    );

    for (const index of indexes) {
      this.cells[index] = fn(this.cells[index]);
    }
  }

  private indexToCoordinate(index: number): Coordinate {
    return {
      x: index % this.width,
      y: Math.floor(index / this.width),
    };
  }

  private coordinateToIndex({ x, y }: Coordinate): number {
    return this.width * y + x;
  }

  private makeCells(
    width: number,
    height: number,
    initialValues: Optional<Value[]> = undefined
  ): Cell[] {
    return Array(width * height)
      .fill(0)
      .map((value, index) => ({
        coordinate: this.indexToCoordinate(index),
        value: initialValues ? initialValues[index] : value,
        highlight: Highlight.NONE,
      }));
  }

  private isOrthogonallyInline(
    origin: Coordinate,
    subject: Coordinate
  ): boolean {
    return origin.x == subject.x || origin.y == subject.y;
  }
}

export { Cell, Grid, FibGrid, Coordinate, UpdaterFn, Value, Highlight };
