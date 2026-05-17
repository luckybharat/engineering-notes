# Debounce

## What is it?
| Debounce ensures a function fires only after a specified delay has passed since the last time it was called, Every new call resets the timer. The callback only executes when the calls stop completely.


## When to use it
- Search Inputs - fire api call only after user stops typing.
- Form Validation - validate after user finishes entering a field.
- Window Resize - recalculate layout after resize stops.
- Auto Save - save draft only after user stops making any changes.

## When NOT to use it
- Scroll or mouse move events where we need regular feedback - use throttle instead.
- Button clicks where every click should register - debounce may swallow clicks.

## Implementation
[Debounce Implementation](debounce.js)

## Key gotchas
- must store `timeout` id, timeout = setTimeout(() => callback.apply(this, args), delay);
- `this` binding using `apply`, `callback.apply(this, args)` to preserve context when debouncing object methods.
- spread args - use `...args` so debounce works on any function regardless of param count.
- arrow function loose `this` - the returned function must be a regular function, not arrow function, so `this` is determined by caller.

## Interview tips
### Follow-up question 
##### "what's the difference between debounce and throttle? 
| Debounce fires after activity stops. Throttle fires at regular intervals during activity.
##### "Connect it to React:" [React `useDebounce()` hook](/react/hooks/useDebounce/index.jsx)