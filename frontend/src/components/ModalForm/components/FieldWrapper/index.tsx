import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';

import './index.css';

interface IProps {
    isBlock?: boolean,
    children: React.ReactNode
}

const FieldWrapper = ({ isBlock, children }: IProps) => {
    const cn = useClassnames();

    return (
        <div className={cn('modal-form__field-wrapper', {
            'modal-form__field-wrapper_is-block': isBlock
        })}
        >
            {children}
        </div>
    );
};

export default FieldWrapper;
