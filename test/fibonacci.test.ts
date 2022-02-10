import { isFibonacciNumber, fibonacciIndex } from '@/fibonacci';

describe(isFibonacciNumber, () => {
  test('identifies fibonacci numbers correctly', () => {
    [1, 2, 3, 5, 8].forEach(
      (subject) => expect(isFibonacciNumber(subject)).toBeTruthy
    );
  });

  test('does not return false positives', () => {
    [4, 7, 9, 11].forEach(
      (subject) => expect(isFibonacciNumber(subject)).toBeTruthy
    );
  });
});

describe(fibonacciIndex, () => {
  test('returns null if number not in fibonacci sequence', () => {
    expect(fibonacciIndex(12)).toBeNull;
  });

  test('returns index of number in fibonacci sequence', () => {
    const examples = [0, 1, 2, 3, 5, 8, 13, 21, 34];

    examples.forEach((example, index) => {
      expect(fibonacciIndex(example)).toEqual(index);
    });
  });
});
