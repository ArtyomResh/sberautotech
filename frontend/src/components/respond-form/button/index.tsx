import React from 'react';

import style from './index.css';

import { useClassnames } from '../../../hooks/use-classnames';

interface IProps {
    label?: string
}

const Button = ({ label }: IProps) => {
    const cn = useClassnames(style);

    return (
        <button className={cn('button')}>{label}</button>
    )
}

export default Button
