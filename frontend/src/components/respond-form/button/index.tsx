import React from 'react';

import style from './index.css';

import { useClassnames } from '../../../hooks/use-classnames';

type TButtonType = 'reset' | 'submit' | 'button';
interface IProps {
    label?: string,
    disabled?: boolean,
    type?: TButtonType,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = ({ label, type, disabled, onClick }: IProps) => {
    const cn = useClassnames(style);

    return (
        <button className={cn('button')} onClick={onClick} type={type} disabled={disabled}>{label}</button>
    );
};

export default Button;
