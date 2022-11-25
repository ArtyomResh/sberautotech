import React from 'react';
import { useClassnames } from '../../../../hooks/use-classnames';
import Text from '../../../text';
import Loader from '../../../loader/loaderComponent';

import styles from './index.css';

type TProps = React.AnchorHTMLAttributes<HTMLButtonElement> & {
    isActive? : boolean,
    isBlock? : boolean,
    isLoading?: boolean
};

const Button = (props: TProps) => {
    const cn = useClassnames(styles);
    const { className, children, isActive, isBlock, isLoading, ...otherProps } = props;

    return (
        <Text
            size={3}
            as="button"
            className={cn(
                'signup-button',
                className,
                {
                    'signup-button_active': isActive,
                    'signup-button_block' : isBlock
                }
            )}
            {...otherProps}
        >
            <span className={cn('signup-button__text', { 'button__text_hidden': isLoading })}>{children}</span>
            {isLoading && <Loader className={cn('button__loader')} /> }
        </Text>
    );
};

export default Button;
