import { createContext, useContext, useState, type CSSProperties, type ReactNode } from "react";
const MAX_TOAST_STACK_LIMIT = 3;

type ToastOptions = 'success' | 'error' | 'warning' | 'info';


type CreateToastParams = Omit<ToastParams, 'id'>;

type ToastParams = {
    id: string; //for internal use only
    type: ToastOptions;
    title: string;
    message: string;
    timeout?: number
}

type ToastContextType = {
    toasts: ToastParams[];
    createToast: (params: CreateToastParams) => void;
    removeToast: (id: string) => void;
}
type ToastStyles = {
    [K in ToastOptions]: CSSProperties
}

const toastStyles: ToastStyles = {
    'success': { background: 'green', color: '#FFFFFF' },
    'warning': { background: 'orange', color: '#FFFFFF' },
    'info': { background: 'skyblue', color: '#FFFFFF' },
    'error': { background: 'red', color: '#FFFFFF' },
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('Can not access toasts outside of ToastProvider');
    }
    return context;
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastParams[]>([]);

    const createToast = (toastParams: CreateToastParams) => {
        const newToast = {
            ...toastParams,
            id: crypto.randomUUID(),
        }

        setToasts((prev) => {
            const updated = [newToast, ...prev];
            return updated.slice(0, MAX_TOAST_STACK_LIMIT);
        })
        setTimeout(() => {
            removeToast(newToast.id);
        }, newToast.timeout ?? 3000)
    }

    const removeToast = (toastId: string) => {
        setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== toastId));
    }

    return <ToastContext.Provider value={{ toasts, createToast, removeToast }}>
        {children}
    </ToastContext.Provider>
}

const Toast = ({ toast }: { toast: ToastParams }) => {
    const { removeToast } = useToast();
    return <div style={{ border: '1px solid #EFEFEF', borderRadius: 8, display: 'flex', justifyContent: 'space-between', width: 400, padding: 8, ...toastStyles[toast.type] }}>
        <div>
            <div>{toast.title}</div>
            <div>{toast.message}</div>
        </div>
        <button onClick={() => removeToast(toast.id)}>X</button>
    </div>
};

export const ToastContainer = () => {
    const { toasts } = useToast();
    return <div style={{ position: "fixed", bottom: 100, right: 20, }}>
        {
            toasts.map((toast) => <Toast key={toast.id} toast={toast} />)
        }
    </div>
}


export default function ToastDemo() {
    const { createToast } = useToast();
    const [config, setConfig] = useState<CreateToastParams>({
        title: '',
        message: '',
        type: 'success',
        timeout: 3000,
    })

    const onAddToast = () => {
        createToast(config)
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setConfig((config) => ({ ...config, [name]: value }));
    }

    return <div>
        <input name="title" type="text" placeholder="Add title" value={config.title} onChange={handleChange} />
        <input name="message" type="text" placeholder="Add title" value={config.message} onChange={handleChange} />
        <select name="type" value={config.type} onChange={handleChange}>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
            <option value="error">Error</option>
        </select>
        <input name="timeout" type="number" value={config.timeout} min={3000} onChange={handleChange} />
        <button onClick={onAddToast}>Add toast</button>
    </div>
}