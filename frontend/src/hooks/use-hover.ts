import { MutableRefObject, useEffect, useState } from 'react';

export const UseHover = (ref: MutableRefObject<HTMLDivElement | undefined>) => {
    const [isHovering, setHovering] = useState(false);

    const on = () => {
        setHovering(true);
    };

    const off = () => {
        setHovering(false);
    };

    useEffect(() => {
        const node = ref.current;

        if(!node) {
            return;
        }

        node.addEventListener('mouseenter', on);
        node.addEventListener('mousemove', on);
        node.addEventListener('mouseleave', off);

        return () => {
            node.removeEventListener('mouseenter', on);
            node.removeEventListener('mousemove', on);
            node.removeEventListener('mouseleave', off);
        };
    }, [ref]);

    return isHovering;
};