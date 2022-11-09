import React from 'react';
import { useClassnames } from '../../../../hooks/use-classnames';
import Text from '../../../text';

import styles from './index.css';

type TProps = React.AnchorHTMLAttributes<HTMLButtonElement> & {
    isActive? : boolean,
    isBlock? : boolean
};

const Button = (props: TProps) => {
    const cn = useClassnames(styles);
    const { className, children, isActive, isBlock, ...otherProps } = props;

    return (
        <Text
            size={3}
            as="button"
            className={cn(
                'button',
                className,
                {
                    'button_active': isActive,
                    'button_block' : isBlock
                }
            )}
            {...otherProps}
        >
            {children}
        </Text>
    );
};

export default Button;
