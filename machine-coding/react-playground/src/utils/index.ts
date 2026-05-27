export const randomResponseTimer = (max = 10, min = 3) => {
    const timer = Math.floor(Math.random() * (max - min + 1)) + min;
    return timer;
}
