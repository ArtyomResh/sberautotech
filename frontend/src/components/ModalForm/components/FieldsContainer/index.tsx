import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';

import style from './index.css';

interface IProps {
    children: React.ReactNode
}

const FieldsContainer = ({ children }: IProps) => {
    const cn = useClassnames(style);

    return (
        <div className={cn('modal-form__fields-container')}>
            {children}
        </div>
    );
};

export default FieldsContainer;