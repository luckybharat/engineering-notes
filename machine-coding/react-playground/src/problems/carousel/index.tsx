import { useCallback, useEffect, useState } from "react";

const Carousel = ({ images, timeout = 4000 }: { images: string[], timeout?: number }) => {
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const onPrev = () => {
        setActive((prev) => {
            let newActive = prev - 1;
            if (newActive < 0) {
                newActive = images.length - 1;
            }
            return newActive;
        });
    };

    const onNext = useCallback(() => {
        setActive((active) => {
            let newActive = active + 1;
            if (newActive > images.length - 1) {
                newActive = 0;
            }
            return newActive;
        })
    }, [images.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                onNext();
            }
        }, timeout);

        return () => {
            clearInterval(interval);
        }
    }, [onNext, timeout, isPaused])

    return <div>
        <div className="item-list" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            {
                images.map((image, i) =>
                    <img
                        className={`carousel-item${active === i ? ' active' : ''}`}
                        src={image}
                        key={image}
                        alt={`carousel-image-${i}`}
                    />)
            }
        </div>
        <div className="carousel-nav">
            {
                images.map((_, i) => <div className={`dot${active === i ? ' active' : ''}`} key={_}></div>)
            }
        </div>
        <button onClick={onPrev}>prev</button>
        <button onClick={onNext}>next</button>
    </div>
}

export default function CarouselDemo() {
    return <div>
        <Carousel
            images={[
                'https://placehold.co/600x400?text=1',
                'https://placehold.co/600x400?text=2',
                'https://placehold.co/600x400?text=3',
                'https://placehold.co/600x400?text=4',
                'https://placehold.co/600x400?text=5',
            ]}
        />
    </div>
}