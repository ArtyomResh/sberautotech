import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';

import './index.css';

interface IProps {
    children: React.ReactNode,
    className?: string
}

const FieldsContainer = ({ children, className }: IProps) => {
    const cn = useClassnames();

    return (
        <div className={cn(className, 'modal-form__fields-container')}>
            {children}
        </div>
    );
};

export default FieldsContainer;
