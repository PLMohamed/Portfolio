"use client";
import { useEffect, useRef } from "react";

export default function StackWrapper({
    children,
    direction = "left",
    reset = 108,
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        containerRef.current.innerHTML += containerRef.current.innerHTML;

        const maxScroll =
            containerRef.current.scrollWidth -
            containerRef.current.clientWidth -
            reset;
        const scroll = () => {
            if (direction === "left") {
                containerRef.current.scrollLeft += 1;
                if (containerRef.current.scrollLeft >= maxScroll) {
                    containerRef.current.scrollLeft -=
                        containerRef.current.scrollLeft;
                }
            } else if (direction === "right") {
                containerRef.current.scrollLeft -= 1;
                if (containerRef.current.scrollLeft <= 108) {
                    containerRef.current.scrollLeft +=
                        containerRef.current.scrollWidth;
                }
            }
        };
        let interval = setInterval(scroll, 24);
        containerRef.current.addEventListener("mouseenter", () => {
            clearInterval(interval);
        });
        containerRef.current.addEventListener("mouseleave", () => {
            interval = setInterval(scroll, 24);
        });

        return () => {
            clearInterval(interval);
        };
    }, [direction]);

    return (
        <div
            className="relative flex gap-5 overflow-hidden 
                        transition-all ease-in-out [&>img]:box-border [&>img]:flex [&>img]:h-12 [&>img]:w-12 [&>img]:items-center [&>img]:justify-center [&>img]:rounded-md [&>img]:bg-neutral-200 [&>img]:p-1 [&>img]:dark:bg-zinc-700"
            ref={containerRef}
        >
            {children}
        </div>
    );
}
