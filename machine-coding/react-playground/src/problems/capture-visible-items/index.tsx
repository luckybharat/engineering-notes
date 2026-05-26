import { useEffect, useRef } from "react"

import "./capture-visible-items.css";
import useDebouncedCallback from "../../hooks/useDebounce/callback";

export default function CaptureVisibleItems() {
    const listRef = useRef<HTMLDivElement | null>(null);
    const isVisible = (item: Element) => {
        const bound = item.getBoundingClientRect();
        return (
             bound.left >= 0 && 
             bound.top >= 0 &&
             bound.right <= (window.innerWidth || document.documentElement.clientWidth) &&
             bound.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        )
    };
    const getItems = () => {
        if (listRef.current) {
            const listItems = listRef.current.querySelectorAll('.list-item');
            listItems.forEach(item => {
                if (isVisible(item)) {
                    console.log(item.innerHTML);
                }
            })
        }
    };

    const debouncedGetItems = useDebouncedCallback(getItems, 1000);

    useEffect(() => {
        window.addEventListener('scroll', debouncedGetItems);

        return () => {
            window.removeEventListener('scroll', debouncedGetItems);
        }
    }, [debouncedGetItems]);

    return <div className="container">
        <div className={"list"} ref={listRef}>
            <div className={"list-item"}>1</div>
            <div className={"list-item"}>2</div>
            <div className={"list-item"}>3</div>
            <div className={"list-item"}>4</div>
            <div className={"list-item"}>5</div>
            <div className={"list-item"}>6</div>
            <div className={"list-item"}>7</div>
            <div className={"list-item"}>8</div>
            <div className={"list-item"}>9</div>
            <div className={"list-item"}>10</div>
            <div className={"list-item"}>11</div>
            <div className={"list-item"}>12</div>
            <div className={"list-item"}>13</div>
            <div className={"list-item"}>14</div>
            <div className={"list-item"}>15</div>
            <div className={"list-item"}>16</div>
            <div className={"list-item"}>17</div>
            <div className={"list-item"}>18</div>
            <div className={"list-item"}>19</div>
            <div className={"list-item"}>20</div>
            <div className={"list-item"}>21</div>
            <div className={"list-item"}>22</div>
            <div className={"list-item"}>23</div>
            <div className={"list-item"}>24</div>
            <div className={"list-item"}>25</div>
            <div className={"list-item"}>26</div>
            <div className={"list-item"}>27</div>
            <div className={"list-item"}>28</div>
            <div className={"list-item"}>29</div>
            <div className={"list-item"}>30</div>
            <div className={"list-item"}>31</div>
            <div className={"list-item"}>32</div>
            <div className={"list-item"}>33</div>
            <div className={"list-item"}>34</div>
            <div className={"list-item"}>35</div>
            <div className={"list-item"}>36</div>
            <div className={"list-item"}>37</div>
            <div className={"list-item"}>38</div>
            <div className={"list-item"}>39</div>
            <div className={"list-item"}>40</div>
            <div className={"list-item"}>41</div>
            <div className={"list-item"}>42</div>
            <div className={"list-item"}>43</div>
            <div className={"list-item"}>44</div>
            <div className={"list-item"}>45</div>
            <div className={"list-item"}>46</div>
            <div className={"list-item"}>47</div>
            <div className={"list-item"}>48</div>
            <div className={"list-item"}>49</div>
            <div className={"list-item"}>50</div>
        </div>
    </div>
}