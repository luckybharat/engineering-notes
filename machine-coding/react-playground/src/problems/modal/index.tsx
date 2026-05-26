// input open and close
// closes on backdrop click
// closes on escape key
// accepts title, content and footer from props
// prevent body scroll when open
// ts

import { useEffect, useState, type ReactNode } from "react";
import classes from "./modal.module.css";
import { createPortal } from "react-dom";
export type ModalProps = {
    isOpen: boolean;
    title: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
    onClose: () => void;
}

export function Modal({ isOpen, title, children, footer, onClose }: ModalProps) {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        }
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose])

    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen])

    if (!isOpen) return null;
    return createPortal(<>
        <div className={`${classes.backdrop} ${classes.open}`} onClick={onClose}>
        </div>
        <div className={classes.modalShell}>
            <div className={classes.modalWrapper}>
                <div className={`${classes.modal} ${ classes.open}`}>
                    <h3>{title}</h3>
                    <div>{children}</div>
                    {footer}
                </div>
            </div>
        </div>
    </>, document.body)
};

export default function ModalDemo() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleToggle = () => setIsOpen((isOpen) => !isOpen);
    return <div>
        <button onClick={handleToggle}>Open</button>
        <Modal onClose={handleToggle} isOpen={isOpen} title="Please confirm" footer={<button onClick={handleToggle}>Cancel</button>}>
            <div>Are you sure you want to continue with this action?</div>
        </Modal>
    </div>
}
