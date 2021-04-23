import React from 'react';

import style from './index.css';

import { useClassnames } from '../../../hooks/use-classnames';

type TButtonType = 'reset' | 'submit' | 'button';
interface IProps {
    label?: string,
    type?: TButtonType
}

const Button = ({ label, type }: IProps) => {
    const cn = useClassnames(style);

    return (
        <button className={cn('button')} type={type}>{label}</button>
    );
};

export default Button;
