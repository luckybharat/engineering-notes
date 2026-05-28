// total pages + total items
// show page numbers
// prev / next buttons
// highlight current page
// edge cases - first, last page
// type strict

import { useEffect, useMemo, useState } from "react";
import { getPaginatedData } from "./mock";

const pageSize = 10;

const getPagination = (data: number, limit: number, current: number, siblings = 2) => {
    const start = 1;
    const end = Math.ceil(data / limit); //total no of pages
    let leftBoundary = current - siblings;
    let rightBoundary = current + siblings;
    if (leftBoundary < start) {
        leftBoundary = start;
    }
    if (rightBoundary > end) {
        rightBoundary = end;
    }
    const middle = [];
    for (let i = leftBoundary; i <= rightBoundary; i++) {
        middle.push(i);
    }
    const result = [];
    const hasLeftDots = leftBoundary > start + 1;
    const hasRightDots = rightBoundary < end - 1;

    if (middle[0] !== start) {
        result.push(start);
    }
    if (hasLeftDots) {
        result.push('...');
    }
    result.push(...middle);
    if (hasRightDots) {
        result.push('...');
    }
    if (middle[middle.length - 1] !== end) {
        result.push(end);
    }
    return result;
};

const getActivePage = (isActive: boolean) => {
    return ({ ...(isActive && { background: 'skyblue', color: '#FFFFFF' }) });
}

export default function PaginationDemo() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rows, setRows] = useState<number[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { page, total } = useMemo(() => getPaginatedData(), []);

    useEffect(() => {
        let isUnmounted = false;
        const getPage = () => {
            setError('');
            setIsLoading(true);
            page(currentPage, pageSize).then(response => {
                if (!isUnmounted) {
                    if (response.data.length > 0) {
                        setRows(response.data);
                        setHasMore(true);
                    }
                    if (response.data.length < pageSize) {
                        setHasMore(false);
                    }
                }
            }).catch(() => {
                setError('Something went wrong please try again');
            }).finally(() => {
                setIsLoading(false);
            })
        }
        if (!isNaN(currentPage)) {
            getPage();
        }
        return () => {
            isUnmounted = true;
        }
    }, [currentPage, page]);


    const handleRetry = () => {
        setCurrentPage(() => 1);
    }

    const paginationNavData = useMemo(() => {
        return getPagination(total, pageSize, currentPage);
    }, [currentPage, total,]);


    return <div>
        <h3>
            Displaying {Math.min(currentPage * pageSize, total)} of {total}
        </h3>
        <div className="pagination-data-list">
            {error && <div>{error} <button onClick={handleRetry}>retry</button></div>}
            {
                rows.map(row => <div key={row}>Row: {row}</div>)
            }
            {isLoading && 'loading ...'}
        </div>
        <div className="page-navigation" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {
                paginationNavData.map((page, index) => {
                    const isPage = typeof page === 'number'
                    return isPage ? <button disabled={currentPage === page} style={getActivePage(currentPage === page)}  onClick={() => setCurrentPage(page)} key={page + `${index}`}>{page}</button> : <span> {page} </span>
                })
            }
            {/* <button disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)}>Prev</button>
            <button disabled={!hasMore} onClick={() => setCurrentPage((page) => page + 1)}>Next</button> */}
        </div>
    </div>
}