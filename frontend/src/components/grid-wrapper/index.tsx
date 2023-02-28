import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import './index.css';

type TGridWrapperProps = React.HTMLProps<HTMLDivElement> & {
    as?: keyof JSX.IntrinsicElements,
    className?: string
};

const GridWrapper: React.FC<TGridWrapperProps> = (props) => {
    const cx = useClassnames();
    const { children, className, as = 'div', ...restProps } = props;

    const classNames = cx('grid-wrapper', className);

    return React.createElement(
        as as React.ElementType,
        {
            className: classNames,
            ...restProps
        },
        children
    );
};

export default GridWrapper;
