import React from 'react';
import { useClassnames } from '../../../hooks/use-classnames';
import Loader from '../../loader/loaderComponent';

import styles from './index.css';

type TProps = React.HTMLProps<HTMLButtonElement> & {
    type?: 'button' | 'reset' | 'submit',
    variant?: 'primary' | 'secondary',
    size?: 'l' | 's',
    isActive?: boolean,
    isBlock?: boolean,
    isLoading?: boolean
};

const Button = (props: TProps) => {
    const cn = useClassnames(styles);
    const { className, children, isActive, isBlock, isLoading, size = 'l', variant = 'primary', ...otherProps } = props;

    return (
        <button
            className={cn(
                'core-button',
                className,
                `core-button_size-${size}`,
                `core-button_variant-${variant}`,
                {
                    'core-button_active'     : isActive,
                    'core-button_block'      : isBlock,
                    'core-button_text-hidden': isLoading
                }
            )}
            {...otherProps}
        >
            {children}
            {isLoading && <Loader className={cn('core-button__loader')} /> }
        </button>
    );
};

export default Button;
