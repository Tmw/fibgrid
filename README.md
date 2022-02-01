# Fibgrid

T.B.D


## Objective
Create a grid of 50x50. When you click on a cell, all values in the cells in the same row and column are increased by 1. If a cell is empty, it will get a value of 1. After each change a cell will briefly turn yellow. If 5 consecutive numbers in the Fibonacci sequence are next to each other, these cells will briefly turn green and will be cleared.

## Issues along the way
- Extremely slow interaction. After clicking a cell, it took ~250ms before the updated grid was rendered due to inefficient mapping logic on the grid.
- Rewriting the grid logic so that it wouldn't iterate the values converting them to Cell objects everytime; made it worse. It now took 1.6sec each click.
- Rewrite the `map` function so that we're only targetting the coordinates orthogonally to the clicked cell. Improved a bit; still, not amazing: ~70ms per click.
- turns out `Ramda`'s `clone` function is the culprit; cloning the grid already took almost 60ms. Just a simple javascript unwrap (`{...grid}`) did the trick in ~0.02ms bringing the total to 6.9ms

## Possible improvements
- The function that checks for horizontal fibonacci sequences checks the whole grid on every click; we can speed this up by only checking the row/column intersection. However; currently this logic runs in ~15ms on my machine.