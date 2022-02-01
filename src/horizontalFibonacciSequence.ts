import { Cell, Grid, Coordinate } from "./grid"
import { drop, zip } from "ramda"
import { fibonacciIndex } from "./fibonacci"

interface FibonacciCandidate extends Cell {
  fibonacciIndex: number | null
}

// Given a current grid status, it will return a list coordinate lists (sequences)
// that form an increasing (left-to-right) fibonacci sequence.
// TODO: Clean up the implementation of this function.
const horizontalFibonacciSequences = (grid: Grid): Coordinate[][] => {
  // assign an optional fibonacci index to each cell
  let candidates = grid.cells.map<FibonacciCandidate>( cell => ({
    ...cell,
    fibonacciIndex: fibonacciIndex(cell.value),
  }))

  // split the grid in rows (detecting rows only for now)
  var lines = []
  for(let i = 0; i < grid.height; i++) {
    lines.push(candidates.splice(0, grid.width))
  }

  // try to pluck fibonacci sequences per line
  var fibonacciCoordinates = []
  for(let line of lines) {
    let pairs = zip(drop(1, line), line)

    var currentSequence = []
    for(let [next, curr] of pairs) {
      if(next.fibonacciIndex === null || curr.fibonacciIndex === null) continue;
      if(next.value < 1 || curr.value < 1) continue;

      // Only if the fibonacci indexes are consecutive..
      if(next.fibonacciIndex - curr.fibonacciIndex === 1) {
        // starting a new sequence with current coordinate
        if(currentSequence.length === 0) {
          currentSequence.push(curr.coordinate)
        }

        // push the `next` coordinate too
        currentSequence.push(next.coordinate)
      } else {
        if(currentSequence.length > 0) {
          fibonacciCoordinates.push(currentSequence)
          currentSequence = []
        }
      }
    }

    if(currentSequence.length > 0) {
      fibonacciCoordinates.push(currentSequence)
    }
  }

  return fibonacciCoordinates
}

export {
    horizontalFibonacciSequences
}