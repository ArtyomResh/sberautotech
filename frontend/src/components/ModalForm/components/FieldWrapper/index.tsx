import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';

import style from './index.css';

interface IProps {
    isBlock?: boolean,
    children: React.ReactNode
}

const FieldWrapper = ({ isBlock, children }: IProps) => {
    const cn = useClassnames(style);

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