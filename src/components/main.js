"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Main({
    children,
    id,
    classNameInView,
    classNameNotInView,
}) {
    const ref = useRef();
    const isInView = useInView(ref, { once: true });

    return (
        <article
            ref={ref}
            className={isInView ? classNameInView : classNameNotInView}
            id={id}
        >
            {children}
        </article>
    );
}
