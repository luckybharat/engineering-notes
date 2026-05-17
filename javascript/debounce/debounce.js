export function debounce(callback, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        tiemout = setTimeout(() => callback.apply(this, args), delay);
    }
}
