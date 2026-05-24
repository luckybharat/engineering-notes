# What is event loop in JS runtimes?
> Event Loop is the mechanism that lets **JavaScript run asynchronous operations without blocking its single-threaded execution**.
---
### Parts of Event Loop
To understand it better, we need to understand all the parts of the system. These components are part of the event loop.

1. Call stack:
    - The call stack keeps track of functions being executed in a program.
    - When a function is called, it is added to the top of the callstack.
    - When the funtion completes, it is removed from the call stack.
    - This allows program to keep track of where it is in the execution of a function and return to the correct location when the function completes.
    - As the name suggests, it is a stack data structure which follows last-in-first-out.

2. Web APIs/ Node.js APIs:
    - Asynchronous operations like ```setTimeout```, HTTP requests, file I/O etc. are handled by the Web APIs (in the browser) or C++ APIs(in Node.js).
    - These APIs are not part of the JavaScript engine and runs on separate threads, allowing them to exectute concurrently without blocking the call stack.

3. Task queue/ MacroTask queue/ Callback queue:
    - The macrotask queue (also called task queue or event queue) holds callbacks waiting to run when the call stack is and micro task queue are empty.

4. MicroTask Queue
    - The microtask holds higher-priority callbacks that drain after the call stack empties and between every macrotask.



# Event loop order

1. The JavaScript engine starts executing scripts, placing synchronous operations on the call stack.
2. When an asynchronous operation is encountered (e.g. ```setTimeout()```, HTTP request), it is offloaded to the respective Web API or Node.js API to handle the operation in the background.
3. Once the asynchronous operations completes, its callback function is placed in the respective queues - task queues (also known as macrotask queues/ callback queues) or microtask queues.
4. The event loop continously monitors the call stack and executes items on the call stack. If/when the callstack is empty:
    1. Microtask queue is processed. Microtasks include (```then```, ```catch```, ```finally```), ```await``` continuations, ```MutationObserver``` callbacks, and calls to ```queueMicrotask()```. The event loop takes the first callback from the microtask queue and pushes it in the call stack for execution. until microtask queue is completely drained.
    2. Macrotask queue is processed.
    Macrotasks include (```setTimeout```, ```setInterval```), HTTP requests, user interface handlers like cliks, scroll etc. The event loop dequeues the first callback from  macrotask queue and pushes it into callstack for execution. However after macrotask queue callback is processed, The event loop does not proceed with the next macrotask yet! The event loop first checks the microtask queue is necessary as microtasks have higher priority than macrotask queue callbacks. The macrotsak queue callback that was just executed could have added more microtasks
        - If the microtask queue is not-empty, the next macrotask queue callback is processed. This repeats until the macrotask queue is empty.
        - if microtask queue is empty, the next macrotask queue callback is processed. This repeats until the macrotask queue is empty.
5. This process continues indefinitely, allowing the JavaScript to handle both synchronous and asynchronous operations efficiently without blocking the call stack.