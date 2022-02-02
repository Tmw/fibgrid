const isSquare = (n: number): boolean =>
  Math.sqrt(n) === Math.round(Math.sqrt(n));

const isFibonacciNumber = (n: number): boolean =>
  isSquare(5 * n * n + 4) || isSquare(5 * n * n - 4);

function* fibGen(a = 0, b = 1) {
  while (a + b < Infinity) {
    const oldA = a;
    a = b;
    b = oldA + b;
    yield b;
  }
}

// find the index of the given number in the fibonacci sequence.
const fibonacciIndex = (n: number): number | null => {
  if (!isFibonacciNumber(n)) return null;
  if (n <= 1) return n;
  const fib = fibGen();
  let index = 0;
  while (fib.next().value <= n) {
    index++;
  }

  return index;
};

export { isFibonacciNumber, fibonacciIndex };
