const isSquare = (n: number): boolean => 
    Math.sqrt(n) === Math.round(Math.sqrt(n))

const isFibonacciNumber = (n: number): boolean =>
    isSquare(5*n*n+4) || isSquare(5*n*n-4)

// find the index of the given number in the fibonacci sequence.

// TODO(refactor): Can we use an es6 generator function for this?
const fibonacciIndex = (n: number): number | null => {
    if(!isFibonacciNumber(n)) return null
    if(n <= 1) return n
    
    var partA = 0
    var partB = 1
    var index = 0

    // work our way through the fibonacci sequence from the beginning
    // until we hit the given number, keeping track of the index.
    // this can be improved by looking at the ratio between the numbers instead.
    while(partA + partB <= n){
        let oldPartB = partB
        partB = partA + oldPartB
        partA = oldPartB
        index++
    }

    return index
}

export {
    isFibonacciNumber,
    fibonacciIndex
}
