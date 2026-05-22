
arr = [4,3,2,1,0,5]
export function sum(n) {
    if (n === 0) return arr[0];
    return arr[n] + sum(n - 1);
}

console.log(sum(arr.length - 1));
