import { useCallback, useMemo, useState, type ChangeEvent, type DragEvent, type SubmitEvent } from "react";
type Status = 'pending' | 'in-progress' | 'complete';
type Priority = 'low' | 'medium' | 'high';


type Todo = {
    id: string;
    title: string;
    message: string;
    priority: Priority;
    status: Status;
}
type CreatTodoParams = Omit<Todo, 'id'>;

const defaultTodoForm: Todo = {
    id: '',
    title: '',
    message: '',
    priority: 'low',
    status: 'pending',
}

const useTodos = () => {
    const [todoForm, setTodoForm] = useState<Todo>(defaultTodoForm);
    const [todos, setTodos] = useState<Todo[]>([]);

    const updateTodoForm = useCallback(<K extends keyof Todo>(field: K, value: Todo[K]) => {
        setTodoForm((form) => ({ ...form, [field]: value }))
    }, []);

    const addTodo = useCallback((todo: CreatTodoParams) => {
        setTodos((todos) => [...todos, { ...todo, id: crypto.randomUUID() }]);
        setTodoForm(defaultTodoForm);
    }, [])

    const updateTodoStatus = useCallback((todoId: string, partialTodo: Partial<Todo>) => {
        setTodos((todos) => todos.map(todo => {
            if (todo.id === todoId) {
                return { ...todo, ...partialTodo }
            }
            return todo;
        }));
    }, []);

    const reorder = useCallback((sourceIndex: number, targetIndex: number) => {
        setTodos((old) => {
            const copy = [...old];
            const element = copy[sourceIndex];
            copy.splice(sourceIndex, 1);
            copy.splice(targetIndex, 0, element);
            return copy
        });
    }, [])

    return { todos, addTodo, updateTodoStatus, todoForm, updateTodoForm, reorder }

};

function TodoList({ status, todos, updateTodoStatus, reorder }:
    {
        status: Status,
        todos: Todo[],
        updateTodoStatus: (todoId: string, status: Partial<Todo>,) => void,
        reorder: (source: number, target: number) => void,
    },
) {
    const filteredTodos = useMemo(() => todos.filter(todo => todo.status === status), [todos, status]);
    const [targetIndex, setTargetIndex] = useState<number | null>(null);
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const todoId = event.dataTransfer.getData('todoId');
        const sourceIndex = event.dataTransfer.getData('sourceIndex');
        console.log(sourceIndex, targetIndex)
        if (targetIndex !== null) {
            reorder(Number(sourceIndex), targetIndex);
        } else {   
            updateTodoStatus(todoId, { status });
        }
        setTargetIndex(() => null);
    };

    const handleDragStart = (event: DragEvent<HTMLDivElement>, id: string, index: number) => {
        event.dataTransfer.setData('todoId', id)
        event.dataTransfer.setData('sourceIndex', String(index));
    };
    return <div style={{ background: '#FFF', padding: 8 }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
    >
        <h1 style={{ textTransform: 'uppercase' }}>{status}</h1>
        {
            filteredTodos.map((todo, index) => <div
                draggable
                style={{ border: '1px solid #EFEFEF', borderRadius: 4, padding: '4px 16px', display: 'flex' }}
                key={todo.id}
                onDragStart={(e) => handleDragStart(e, todo.id, index)}
                onDragOver={() => { setTargetIndex(index) }}
            >
                <div>
                    <h3 style={{ margin: 0, }}>{todo.title}</h3>
                    <p style={{ margin: 0, }}>{todo.message}</p>
                    <div>{todo.priority}</div>
                </div>
                <div>
                    [ - ]
                </div>
            </div>
            )
        }
    </div>
};


export const DraggableTodos = () => {
    const { todos, addTodo, todoForm, updateTodoForm, updateTodoStatus, reorder } = useTodos();

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        addTodo(todoForm);
    }

    const getInputProps = <K extends keyof Todo>(field: K) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { value } = event.target;
            updateTodoForm(field, value as Todo[K]);
        };
        return {
            name: field,
            value: todoForm[field],
            onChange: handleChange
        }
    };

    return <div>
        <form onSubmit={handleSubmit}>
            <input placeholder="Enter title" {...getInputProps('title')} />
            <input placeholder="Enter message" {...getInputProps('message')} />
            <select {...getInputProps('priority')}>
                <option value={'low'}>Low</option>
                <option value={'medium'}>Medium</option>
                <option value={'high'}>High</option>
            </select>
            <select {...getInputProps('status')}>
                <option value='pending'>Pending</option>
                <option value='in-progress'>In-progress</option>
                <option value='complete'>Complete</option>
            </select>
            <button type="submit">Save</button>
        </form>
        <hr />
        <div style={{ display: 'flex', gap: 24 }}>
            <TodoList status='pending' todos={todos} updateTodoStatus={updateTodoStatus} reorder={reorder} />
            <TodoList status='in-progress' todos={todos} updateTodoStatus={updateTodoStatus} reorder={reorder} />
            <TodoList status='complete' todos={todos} updateTodoStatus={updateTodoStatus} reorder={reorder}/>
        </div>
    </div>
};

export default DraggableTodos;
