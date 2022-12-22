import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import { useClassnames } from '../../../hooks/use-classnames';

import styles from './index.css';
import Loader from '../../loader/loaderComponent';

type TProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    size?: 'l' | 's',
    variant?: 'primary' | 'secondary',
    href: string,
    isActive? : boolean,
    isGatsbyLink?: boolean,
    isBlock?: boolean,
    isLoading?: boolean
};

const LinkButton = (props: TProps) => {
    const cn = useClassnames(styles);
    const { className, children, href, isActive, isGatsbyLink, isBlock, isLoading, size = 'l', variant = 'primary', ...otherProps } = props;

    const classNames = cn(
        'core-link-button',
        className,
        `core-link-button_size-${size}`,
        `core-button_variant-${variant}`,
        {
            'core-link-button_active'     : isActive,
            'core-link-button_block'      : isBlock,
            'core-link-button_text-hidden': isLoading
        }
    );

    return isGatsbyLink ? (
        <GatsbyLink
            className={classNames}
            to={href}
            {...otherProps}
        >
            {children}
            {isLoading && <Loader className={cn('core-link-button__loader')} /> }
        </GatsbyLink>
    ) : (
        <a
            className={classNames}
            href={href}
            {...otherProps}
        >
            {children}
            {isLoading && <Loader className={cn('core-link-button__loader')} /> }
        </a>
    );
};

export default LinkButton;
