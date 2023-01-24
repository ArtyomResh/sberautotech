import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';

import style from './index.css';
import Heading from '../../../heading';

type TProps = React.HTMLAttributes<HTMLHeadingElement> & {
    className?: string
};

const Title = ({ className, children, ...props }: TProps) => {
    const cn = useClassnames(style);

    return (
        <Heading level={1} as="h2" className={cn(className, '.modal-form__title')} {...props}>
            {children}
        </Heading>
    );
};

export default Title;