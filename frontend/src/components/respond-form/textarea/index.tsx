import React, { useState, useCallback } from 'react';

import style from './index.css';

import { useClassnames } from '../../../hooks/use-classnames';

import { useFormContext } from 'react-hook-form';

interface IProps {
    placeholder?: string,
    name?: any,
    requiredValidation: any
    // ref?: React.Ref<HTMLTextAreaElement>;
}

const Textarea = ({ placeholder, name, requiredValidation }: IProps) => {
    const { register, formState } = useFormContext();
    const cn = useClassnames(style);

    const [fill, setFill] = useState('');

    const fillerHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setFill(e.target.value), [fill]);

    return (
        <textarea
            className={cn('textarea', { 'textarea_error': formState.errors?.[name] })}
            placeholder={placeholder}
            // onChange={fillerHandler}
            {...register(name, {
                required: requiredValidation
            })}
        />
    );
};

export default Textarea;

