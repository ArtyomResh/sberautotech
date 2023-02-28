import React from 'react';
import { useClassnames } from '../../hooks/use-classnames';

import './index.css';

type TTextProps = React.HTMLAttributes<HTMLElement> & {

    /** Element type */
    as?: keyof JSX.IntrinsicElements,

    /** Text size */
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    size: 1 | 2 | 3 | 4 | 5
};

const Text = (props: TTextProps) => {
    const { as = 'div', size, className, children, ...restProps } = props;
    const cx = useClassnames();

    const classNames = cx(className, 'text', {
        [`text__size_${size}`]: size
    });

    return React.createElement(
        as as React.ElementType,
        {
            className: classNames,
            ...restProps
        },
        children
    );
};

export default Text;
