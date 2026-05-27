import React, { createContext, Suspense, useContext, useEffect, useState, type ReactNode } from "react";

type TabsContextType = {
    activeTab: number; //using index for active tab.
    setActiveTab: (index: number) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

const useTabsContext = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("Tabs component can not be accessed outside of TabsProvider");
    }
    return context
};

export function Tabs({ children, defaultActive = 0 }: { children: ReactNode, defaultActive?: number }) {
    const [activeTab, setActiveTab] = useState(defaultActive);

    const onTabChange = (index: number) => {
        setActiveTab(index);
    }

    return <TabsContext.Provider value={{ activeTab, setActiveTab: onTabChange }}>
        {children}
    </TabsContext.Provider>
}

export function TabList({ children }: { children: ReactNode }) {
    return <div>{children}</div>
}
export function Tab({ children, index }: { children: ReactNode, index: number }) {
    const { activeTab, setActiveTab } = useTabsContext();
    return <button style={{ background: activeTab === index ? 'skyblue' : '#EFEFEF', }} onClick={() => setActiveTab(index)}>
        {children}
    </button>
}
export function TabPanels({ children }: { children: ReactNode }) {
    return <div>{children}</div>
}
export function TabPanel({ children, index }: { children: ReactNode, index: number }) {
    const { activeTab } = useTabsContext();
    const [isVisited, setIsVisited] = useState<boolean>(false);

    useEffect(() => {
        if (activeTab === index) setIsVisited(true);
    }, [activeTab, index]);

    if (!isVisited) return null;

    return <div hidden={activeTab !== index}>
        {children}
    </div>
}
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
Tabs.TabList = TabList;
Tabs.TabPanels = TabPanels;

const InfiniteScroll = React.lazy(() => import('../infinite-scroll'));
const MultiStepForm = React.lazy(() => import('../multi-step-form'));
const AutoComplete = React.lazy(() => import('../autocomplete-search'));

export default function TabsDemo() {
    return <Tabs>
        <Tabs.TabList>
            <Tabs.Tab index={0}>MultiStep</Tabs.Tab>
            <Tabs.Tab index={1}>InfiniteScroll</Tabs.Tab>
            <Tabs.Tab index={2}>AutoComplete</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanels>
            <Tabs.Panel index={0}>
                <Suspense fallback={<div>"loading..."</div>}><MultiStepForm /></Suspense>
            </Tabs.Panel>
            <Tabs.Panel index={1}>
                <Suspense fallback={<div>"loading..."</div>}><InfiniteScroll /></Suspense>
            </Tabs.Panel>
            <Tabs.Panel index={2}>
                <Suspense fallback={<div>"loading..."</div>}><AutoComplete /></Suspense>
            </Tabs.Panel>
        </Tabs.TabPanels>
    </Tabs>
}
