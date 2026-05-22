# Recursion

> Function calls itself to solve smaller versions of the same problem.

# Two pillars of recursion
1. **Base case** - stop condition (when to stop calling itself).
2. **Recursive case** - part where function calls itself.

# Real life examples
1. Queue of people.
2. Comment thread.
3. Organisational hierarchies.
4. type "recursion" on google search.

> Infinte recursion leads to ```stack overflow```

# Recursion & call stack

```
    function fun(num) {
        if (num === 0) return; // base case
        console.log(num);
        num = num - 1;
        fun(num);
    }

    let a = 5;
    fun(a);
```

```
Output:
5
4
3
2
1
```

# Callstack visualization
```
fun(5)
fun(4)
fun(3)
fun(2)
fun(1)
fun(0)
```

after reaching fun(0), function are removed from the stack 1 by 1.

> Explaination:
- The program starts with fun(5).
- 5 gets printed.
- Function calls itself with 4.
- This continues until num === 0.
- When the base case is reached, recursion stops - and the call stack starts clearing.

# Common mistakes
- Missing base case - leads to stack overflow.
- Not simplyfying the input - never reaches base case.
- Too deep recusrion - large inputs.
- Keeping in mind - time complexity.
- Recalculating same work repeatedly. (fibonacci)

# When to use?
- Problem can be broken into sub problems.
- Trees & Graphs.
- Backtracking
- DP
- Divide and Conquer.

# Iteration VS Recursion
| Iteration | Recursion|
|-----------|----------|
| Ues loops | Uses function calls|
| Useually memory efficient | Uses extrac call stack memory |
| Faster in many cases | Cleaner for recursion problems |
| Easier to optimize | Easier to express tree-like problems.|
