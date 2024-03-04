import React from "react";
import Marquee from "react-fast-marquee";

export default function StackWrapper({ children, direction = "left" }) {
    return (
        <Marquee direction={direction} autoFill={true} pauseOnHover={true}>
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    className:
                        "box-border flex h-12 w-12 items-center justify-center rounded-md bg-neutral-200 p-1 mx-2 dark:bg-zinc-700",
                }),
            )}
        </Marquee>
    );
}
