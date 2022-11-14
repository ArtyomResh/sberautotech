import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import { useClassnames } from '../../../../hooks/use-classnames';

import styles from './index.css';

type TProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    isActive? : boolean,
    isGatsbyLink?: boolean,
    href: string
};

const LinkButton = (props: TProps) => {
    const cn = useClassnames(styles);
    const { className, children, isActive, isGatsbyLink, href, ...otherProps } = props;

    const classNames = cn(
        'link-button',
        className,
        {
            'link-button_active': isActive
        }
    );

    return isGatsbyLink ? (
        <GatsbyLink
            className={classNames}
            to={href}
            {...otherProps}
        >
            Принять участие
        </GatsbyLink>
    ) : (
        <a
            className={classNames}
            href={href}
            {...otherProps}
        >
            {children}
        </a>
    );
};

export default LinkButton;
