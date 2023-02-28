import React from 'react';
import { useClassnames } from '../../../../hooks/use-classnames';

import './index.css';

interface IProps {
    removeBelowOffset?: boolean,
    removeAboveOffset?: boolean
}

export const PageSection: React.FC<IProps> = ({ children, removeBelowOffset, removeAboveOffset }) => {
    const cssBlock = 'page-section';

    const cn = useClassnames();

    return (
        <section className={cn(cssBlock, {
            [`${cssBlock}_without-margin-top`]   : removeAboveOffset,
            [`${cssBlock}_without-margin-bottom`]: removeBelowOffset
        })}
        >
            {children}
        </section>
    );
};
