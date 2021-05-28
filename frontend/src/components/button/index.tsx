import React from 'react';

import style from './index.css';

import { useClassnames } from '../../hooks/use-classnames';

type TButtonStyleType = 'primary' | 'secondary' | 'special';
type TButtonType = 'reset' | 'submit' | 'button';
interface IProps {
    label?: string,
    disabled?: boolean,
    type?: TButtonType,
    styleType?: TButtonStyleType,
    className?: string
}

const Button = ({ label, type, disabled, styleType, className }: IProps) => {
    const cn = useClassnames(style);

    return (
        <button
            className={cn('button', `button__${styleType}`, className)}
            type={type}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
