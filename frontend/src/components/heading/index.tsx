import React from 'react';
import { useClassnames } from '../../hooks/use-classnames';

import styles from './index.css';

type THeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {

    /** Element type */
    as?: keyof JSX.IntrinsicElements,

    /** Heading level */
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    level: 1 | 2 | 3 | 4 | 5 | 6
};

const Heading = (props: THeadingProps) => {
    const { as, level = 1, className, children, ...restProps } = props;
    const cx = useClassnames(styles);

    const classNames = cx(className, 'heading', {
        [`heading__level_${level}`]: level
    });

    return React.createElement(
        as || (`h${level}` as React.ElementType),
        {
            className: classNames,
            ...restProps
        },
        children
    );
};

export default Heading;
