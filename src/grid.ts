type Cell = number
type Coordinate = { x: number; y: number };

interface Grid {
  width: number,
  height: number,
  cells: Cell[],
}

const makeCells = (amount: number): Cell[] => 
  Array(amount).fill(0)

const makeGrid = (width: number, height: number): Grid => {
  return { width, height, cells: makeCells(width * height) }
}

const advanceFromCoordinate = (grid: Grid, coordinate: Coordinate): Grid => {
  let offsetInOrthogonalLine = (n: number): boolean => {
    // in same row
    if(Math.floor(n / grid.width) === coordinate.y) return true

    // in same column
    if(n % grid.width === coordinate.x) return true

    return false
  }

  return {
    ...grid,
    cells: grid.cells.map((value, offset) => 
      offsetInOrthogonalLine(offset) ? value + 1: value
    )
  }
}


export { 
  Cell, Grid, Coordinate, 
  makeGrid,
  advanceFromCoordinate
 };
