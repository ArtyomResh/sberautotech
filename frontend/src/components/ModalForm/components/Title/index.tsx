import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';

import style from './index.css';

interface IProps {
    children: React.ReactNode
}

const Title = ({ children }: IProps) => {
    const cn = useClassnames(style);

    return (
        <h2 className={cn('modal-form__title')}>
            {children}
        </h2>
    );
};

export default Title;