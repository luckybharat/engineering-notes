import { useCallback, useEffect, useRef, useState } from "react";

const randomResponseTimer = (max = 10, min = 3) => {
    const timer = Math.floor(Math.random() * (max - min + 1)) + min;
    return timer;
}

const generateMockRows = (offset = 0, limit = 20, max = 500): Promise<number[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const end = Math.min(offset + limit, max);
            const response: number[] = Array.from({ length: end - offset }, (_, index) => offset + index + 1);
            resolve(response);
        }, randomResponseTimer() * 100);
    })
}

export default function InfinteScrollDemo() {
    const [data, setData] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const loadMore = useCallback(() => {
        setIsLoading(true);
        generateMockRows(data.length, 100, 1000).then(response => {
            if (response.length < 100) {
                setHasMore(false);
            }
            setData((data) => [...data, ...response]);
        }).catch(() => {
            setError('Faliled to load next rows')
            setHasMore(false);
        })
            .finally(() => {
                setIsLoading(false);
            })
    }, [data])

    useEffect(() => {
        let isUnmounted = false;
        setIsLoading(true);
        generateMockRows(0, 100, 1000).then((response) => {
            if (!isUnmounted) {
                setData(response)
            }
        }).catch(() => {
            setError('failed to fetch rows')
        }).finally(() => {
            setIsLoading(false);
        })
        return () => {
            isUnmounted = true;
        }
    }, [])

    useEffect(() => {
        if (!bottomRef.current || !containerRef.current) {
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting && !isLoading && hasMore) {
                console.log('hasMore');
                loadMore();
            }
        }, {
            root: containerRef.current,
            rootMargin: '100px',
        });

        observer.observe(bottomRef.current);

        return () => {
            observer.disconnect();
        }
    }, [loadMore, isLoading, hasMore])


    return <div style={{ border: '1px solid #EFEFEF', padding: 24, maxHeight: '300px', maxWidth: '400px', margin: '0 auto', overflowY: 'auto' }} ref={containerRef}>
        {
            data.map(item => <div key={item} style={{ borderBottom: '1px solid #EFEFEF', padding: '4px 8px' }}>Row {item}</div>)
        }
        {isLoading && 'Loading...'}
        <div ref={bottomRef}>{!hasMore && 'End of list.'}</div>
    </div>
}