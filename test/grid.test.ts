import { advanceFromCoordinate, Grid, makeGrid } from "../src/grid"

describe(makeGrid, () => {
    test('initializes a new grid with correct number of cells', () => {
        const subject = makeGrid(5, 5)
        expect(subject.cells).toHaveLength(25)
    })

    test('initializes the grid with all zeroes', () => {
        const subject = makeGrid(5, 5)
        expect(subject.cells.filter( v => v == 0)).toHaveLength(25)
    })
})

describe(advanceFromCoordinate, () => {
    let grid: Grid
    beforeAll(() => grid = makeGrid(5, 5))

    test('increments orthogonally from coordinate', () => {
        const newGrid = advanceFromCoordinate(grid, {x: 1, y: 2})
        const expectedGrid = [
            0, 1, 0, 0, 0,
            0, 1, 0, 0, 0,
            1, 1, 1, 1, 1,
            0, 1, 0, 0, 0,
            0, 1, 0, 0, 0,
        ]

        expect(newGrid.cells).toStrictEqual(expectedGrid)
    })
})
