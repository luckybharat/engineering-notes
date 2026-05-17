import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounced;
}
