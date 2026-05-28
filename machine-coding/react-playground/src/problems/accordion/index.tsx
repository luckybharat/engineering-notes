import { createContext, useContext, useState, type ReactNode } from "react"

export type AccordionContext = {
    currentOpen: string[],
    updateAccordion: (key: string) => void;
    isOpen: (key: string) => boolean;
}

export type ItemContextType = {
    value: string;
}

const AccordionContext = createContext<AccordionContext | null>(null);
const ItemContext = createContext<ItemContextType | null>(null);

const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error('Can not use accordion component outside accordion provider');
    }
    return context;
}

const useAccordionItem = () => {
    const context = useContext(ItemContext);
    if (!context) {
        throw new Error('Accordion.Trigger, Accordion.Content can not be accessed outside Accordion.Item');
    }
    return context;
}

const Accordion = ({ children, type, defaultOpen }: { children: ReactNode, type: 'single' | 'multiple', defaultOpen?: string }) => {
    const [open, setOpen] = useState<string[]>(defaultOpen ? [defaultOpen] : []);
    const updateAccordion = (key: string) => {
        if (type === 'single') {
            setOpen(prev => prev.includes(key) ? [] : [key])
            return;
        }
        const itemIndex = open.findIndex(i => i === key);
        if (itemIndex >= 0) {
            setOpen((prev) => prev.filter(p => p !== key));
        } else {
            setOpen((prev) => [...prev, key]);
        }
    };

    const isOpen = (value: string) => open.some(key => key === value);

    return <AccordionContext.Provider value={{ currentOpen: open, updateAccordion, isOpen, }}>
        <div style={{ border: '1px solid #EFEFEF', padding: 4 }}>
            {children}
        </div>
    </AccordionContext.Provider>
}


const AccordionItem = ({ value, children }: { value: string, children: ReactNode }) => {
    return <ItemContext.Provider value={{ value }}>
        <div style={{ border: '1px solid #EFEFEF', padding: 4, margin: 8 }}>
            {children}
        </div>
    </ItemContext.Provider>
}

const AccordionTrigger = ({ children }: { children: ReactNode }) => {
    const { updateAccordion } = useAccordion();
    const { value } = useAccordionItem();
    const onOpen = () => {
        updateAccordion(value)
    }

    return <div onClick={onOpen} style={{ cursor: 'pointer' }}>{children}</div>
}

const AccordionContent = ({ children }: { children: ReactNode }) => {
    const { value } = useAccordionItem();
    const { isOpen } = useAccordion();
    return isOpen(value) ? <div>{children}</div> : null

}

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export default function AccordionDemo() {
    return <div>
        <div>Single</div>
        <Accordion type="single" >
            <Accordion.Item value="home">
                <Accordion.Trigger>Home</Accordion.Trigger>
                <Accordion.Content>
                    Home content appears here.
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="about">
                <Accordion.Trigger>About</Accordion.Trigger>
                <Accordion.Content>
                    This is about section.
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
        <hr />
        <div>Multiple</div>
        <Accordion type="multiple" defaultOpen="about" >
            <Accordion.Item value="home">
                <Accordion.Trigger>Home</Accordion.Trigger>
                <Accordion.Content>
                    Home content appears here.
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="about">
                <Accordion.Trigger>About</Accordion.Trigger>
                <Accordion.Content>
                    <Accordion type="single" defaultOpen="about">
                        <Accordion.Item value="home">
                            <Accordion.Trigger>Home</Accordion.Trigger>
                            <Accordion.Content>
                                Home content appears here.
                            </Accordion.Content>
                        </Accordion.Item>
                        <Accordion.Item value="about">
                            <Accordion.Trigger>About</Accordion.Trigger>
                            <Accordion.Content>
                                This is about section.
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    </div>
}