import {isFibonacciNumber} from "../src/fibonacci"

describe(isFibonacciNumber, () => {
    test('identifies fibonacci numbers correctly', () => {
        [1, 2, 3, 5, 8].forEach(subject => 
            expect(isFibonacciNumber(subject)).toBeTruthy
        )
    })

    test('does not return false positives', () => {
        [4, 7, 9, 11].forEach(subject => 
            expect(isFibonacciNumber(subject)).toBeTruthy
        )
    })
})

