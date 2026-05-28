import { useMemo, useState, type UIEvent } from "react";
import { randomResponseTimer } from "../../utils";

const generateList = () => {
    const length = randomResponseTimer(5000, 1000);
    return Array.from({ length }).fill(0).map(((_, i) => (i + 1)));
};

export function VirtualizedList<T>({ containerHeight, itemHeight, list = [], overscan = 10, }: { containerHeight: number, itemHeight: number, list: T[], overscan?: number }) {
    const [scrollTop, setScrollTop] = useState(0);
    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    };

    const visibleItems = Math.floor(containerHeight / itemHeight);
    const startIndex = Math.max(Math.floor(scrollTop / itemHeight) - overscan, 0);
    const endIndex = Math.min(startIndex + visibleItems + overscan * 2, list.length);

    const slicedList = list.slice(startIndex, endIndex);
    const offset = startIndex * itemHeight;

    return <div style={{
        height: containerHeight,
        overflowY: 'auto',
        border: '1px solid #EFEFEF',
        borderRadius: 8,
        padding: '8px 16px'
    }}
        onScroll={handleScroll}
    >
        <div style={{
            height: itemHeight * list.length
        }}>
            <div style={{ transform: `translateY(${offset}px)` }}>
                {
                    slicedList.map((item) => <div style={{ padding: "4px", boxSizing: 'border-box', borderBottom: '1px solid #EFEFEF' }} key={String(item)}>
                        {String(item)}
                    </div>)
                }
            </div>
        </div>
    </div>
}

export default function VirtualizationDemo() {
    const list = useMemo(() => generateList(), []);
    return <div>
        <h1>{list.length}</h1>
        <VirtualizedList
            containerHeight={500}
            itemHeight={33}
            overscan={10}
            list={list}
        />
    </div>
}