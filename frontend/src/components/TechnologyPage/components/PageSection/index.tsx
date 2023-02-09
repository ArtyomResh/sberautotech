import React from 'react';
import { useClassnames } from '../../../../hooks/use-classnames';

import styles from './index.css';

interface IProps {
    removeBelowOffset?: boolean,
    removeAboveOffset?: boolean
}

export const PageSection: React.FC<IProps> = ({ children, removeBelowOffset, removeAboveOffset }) => {
    const cssBlock = 'page-section';

    const cn = useClassnames(styles);

    return (
        <section className={cn(cssBlock, {
            [`${cssBlock}__remove-margin-top`]   : removeAboveOffset,
            [`${cssBlock}__remove-margin-bottom`]: removeBelowOffset
        })}
        >
            {children}
        </section>
    );
};
