// Sum of n numbers using recursion

function sum(n) {
    if (n === 0) return;
    return n + sum(n - 1);
}