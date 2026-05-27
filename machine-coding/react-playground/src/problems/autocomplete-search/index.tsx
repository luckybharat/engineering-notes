import { useLocation, useSearchParams } from "react-router-dom"
import useDebounce from "../../hooks/useDebounce";
import { useEffect, useState } from "react";

const MOCK_SEARCH_DATA = [
    'Apple',
    'Banana',
    'Orange',
    'Mango',
    'Pineapple',
    'Grapes',
    'Watermelon',
    'Strawberry',
    'Blueberry',
    'Avocado',
    'Kiwi',
    'Papaya',
    'Dragon Fruit',
    'Guava',
    'Peach',
    'Pear',
    'Lemon',
    'Coconut',
    'Cherry',
    'Lychee',
];

const getRandomResponseTime = () => Math.floor((Math.random() + (5 - 2 + 1)) + 2);

function mockSearch(query: string): Promise<string[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!query.trim()) {
                resolve([])
                return;
            }
            const normalizedQuery = query.toLowerCase();
            const result = MOCK_SEARCH_DATA.filter(data => data.toLocaleLowerCase().includes(normalizedQuery));
            resolve(result);
        }, getRandomResponseTime());
    })
}

export default function AutoCompleteSearch() {
    const [searchParams, setSearchParams] = useSearchParams('');
    const [searchResult, setSearchResults] = useState<string[]>([]);
    const query = searchParams.get('search') ?? '';
    const debouncedQuery = useDebounce(query, 500);
    const [focus, setFocus] = useState<number>(0);
    const [selection, setSelection] = useState<string>('');
    const [loading, setIsLoading] = useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value) {
            setSearchParams({ search: value })
        } else {
            setSearchParams('')
        }
    }

    useEffect(() => {
        if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
            setSearchResults([]);
            return
        };
        setIsLoading(true);
        mockSearch(debouncedQuery).then(result => {
            setSearchResults(result);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [debouncedQuery])

    useEffect(() => {
        const handleKeyNavigation = (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown') {
                if (focus < searchResult.length - 1) {
                    setFocus((focus) => focus === null ? 0 : focus + 1);
                }
            } else if (event.key === 'ArrowUp') {
                if (focus !== 0) {
                    setFocus((focus) => focus === null ? 0 : focus - 1);
                }
            } else if (event.key === 'Enter') {
                if (focus !== null) {
                    setSelection(searchResult[focus] ?? '');
                }
            }
        }
        window.addEventListener('keydown', handleKeyNavigation);
        return () => {
            window.removeEventListener('keydown', handleKeyNavigation)
        }
    }, [searchResult, focus])

    return <div>
        <input type={'text'} placeholder="type here to search" value={query} onChange={handleChange} />
        <div className="results">
            {
                loading ? 'loading...' : (searchResult.length === 0 && <div>No results found</div>)
            }
            {searchResult.map((result, index) => <div key={result} style={{
                ...(focus === index && { background: '#EFEFEF', color: "gray" }),
                ...(selection === result && {
                    background: 'skyblue',
                })
            }}>{result}</div>)}
        </div>
    </div>
}