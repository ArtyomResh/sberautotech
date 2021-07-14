import React from 'react';

import style from './index.css';

import { useClassnames } from '../../hooks/use-classnames';

interface IProps {
    label: string,
    className?: string
}

export const Tooltip = ({ label, className }: IProps) => {
    const cn = useClassnames(style);

    return (
        <span className={cn('tooltip', className)}>{label}</span>
    );
};

export default Tooltip;
