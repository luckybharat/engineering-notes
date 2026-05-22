const arr = [4,6,2,3,1,5];
export function sum(n) {
    const isOdd = arr[n] % 2 !== 0;
    if (n === 0) return isOdd ? arr[n] : 0;
    return (isOdd ? arr[n] : 0) + sum(n - 1);
}

console.log(sum(arr.length - 1));