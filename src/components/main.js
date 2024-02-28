"use client";

export default function Main({
    children,
    ref,
    id,
    classNameInView,
    classNameNotInView,
    inView,
}) {
    return (
        <article
            ref={ref}
            className={inView ? classNameInView : classNameNotInView}
            id={id}
        >
            {children}
        </article>
    );
}
