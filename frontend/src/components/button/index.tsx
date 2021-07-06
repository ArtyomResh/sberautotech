import React, { useMemo } from 'react';

import style from './index.css';

import { useClassnames } from '../../hooks/use-classnames';

type TButtonStyleType = 'primary' | 'secondary' | 'special';
type TButtonType = 'reset' | 'submit' | 'button';
interface IProps {
    label?: string,
    disabled?: boolean,
    type?: TButtonType,
    styleType?: TButtonStyleType,
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    count?: number
}

const Button = ({ label, type, disabled, styleType, className, onClick, count }: IProps) => {
    const cn = useClassnames(style);

    return (
        <button
            className={cn('button', `button__${styleType}`, className)}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            <span>
                {label}

                {count ? (
                    <span className={cn('button__count')}>
                        {count}
                    </span>
                ) : null}
            </span>
        </button>
    );
};

export default Button;
