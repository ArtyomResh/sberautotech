import React from 'react';
import { useClassnames } from '../../hooks/use-classnames';
import Text from '../text';

import styles from './index.css';

type TProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    isActive? : boolean
};

const LinkButton = (props: TProps) => {
    const cn = useClassnames(styles);
    const { className, children, isActive, ...otherProps } = props;

    return (
        <Text
            size={4}
            as="a"
            className={cn(
                'link-button',
                className,
                {
                    'link-button_active': isActive
                }
            )}
            {...otherProps}
        >
            {children}
        </Text>
    );
};

export default LinkButton;
