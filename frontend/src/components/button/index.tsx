import React, { useMemo } from 'react';

import Loader from '../loader/loaderComponent';

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
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    count?: number,
    isLoading?: boolean
}

const Button = ({ label, type, disabled, styleType, className, onClick, count, isLoading }: IProps) => {
    const cn = useClassnames(style);

    return (
        <button
            className={cn('button', `button__${styleType}`, className)}
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
        >
            <span>
                {isLoading ? <Loader /> : label}

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
