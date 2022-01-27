const isFibonacciNumber = (n: number): boolean =>
    isSquare(5*n*n+4) || isSquare(5*n*n-4)

const isSquare = (n: number): boolean => 
    Math.sqrt(n) === Math.round(Math.sqrt(n))

export {
    isFibonacciNumber
}
