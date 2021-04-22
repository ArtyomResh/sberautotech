import React, { useState, useCallback } from 'react';

import style from './index.css';

import { useClassnames } from '../../../hooks/use-classnames';

interface IProps {
    placeholder?: string;
    ref?: React.Ref<HTMLTextAreaElement>;
}

const Textarea = ({ placeholder, ref }: IProps) => {
    const cn = useClassnames(style);

    const [fill, setFill] = useState('');

    const fillerHandler = useCallback(e: React.<> => setFill(e.target.value), [fill]);

    return (
        <textarea
            className={cn('textarea', { 'textarea_filled': fill })}
            placeholder={placeholder}
            onChange={fillerHandler}
            ref={ref}
        />
    );
};

export default Textarea;

