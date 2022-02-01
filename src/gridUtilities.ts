import { Coordinate, Grid, update, UpdaterFn, Cell, Value, orthogonallyConnected } from "./grid"

const advanceCell = (c: Cell): Value => c.value + 1
const nullifyCell = (_c: Cell): Value => 0

const advanceFromCoordinate = (grid: Grid, origin: Coordinate): Grid => {
    const connected = orthogonallyConnected(grid, origin)
    return update(grid, connected, advanceCell)
}

export {
    advanceFromCoordinate,
    orthogonallyConnected,
    advanceCell,
    nullifyCell
}