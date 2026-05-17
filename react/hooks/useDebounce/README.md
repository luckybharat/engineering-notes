# How this code works?
- `useState(value)`: initializes debounced state with current value so there's no flash of empty state on first render.
- `useEffect() with [value, delay]`: re-runs whenever value or delay changes. Every new keystroke triggers a new effect, which clears the old timeout and sets a new one.
- `timeout = setTimeout(() => setDebounced(value), delay)`: after the delay, updates the debouned state with latest value, this is what tirggers the re-render with the debounced value.
- `return () => clearTimeout(timeout)`: the clean up function, Runs before the next effect fires and on unmount. This is the debounce mechanism. every call clears the previous timer.

Related topics
- [Debounce](/javascript/debounce/)
