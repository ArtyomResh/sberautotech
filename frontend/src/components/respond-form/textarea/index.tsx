import React, { useState } from 'react';
import { ValidationRule } from 'react-hook-form/dist/types/validator';
import { Message } from 'react-hook-form/dist/types/form';

import style from './index.css';

import { useClassnames } from '../../../hooks/use-classnames';

import { useFormContext } from 'react-hook-form';

interface IProps {
    placeholder?: string,
    name: string,
    requiredValidation: Message | ValidationRule<boolean>
}

const Textarea = ({ placeholder, name, requiredValidation }: IProps) => {
    const { register, formState, getValues } = useFormContext();
    const textareaValue = getValues(name);
    const cn = useClassnames(style);
    const [hasValue, setHasValue] = useState(Boolean(textareaValue));

    const blurHandler = () => {
        const textareaValue = getValues(name);

        setHasValue(Boolean(textareaValue));
    };

    return (
        <div
            className={cn('textarea', { 'textarea_error': formState.errors?.[name], 'textarea_has-value': hasValue })}
        >
            <textarea
                className={cn('textarea__field')}
                placeholder=" "
                {...register(name, {
                    required: requiredValidation
                })}
                onBlur={blurHandler}
            />
            <label className={cn('textarea__label')}>
                {placeholder}
            </label>
        </div>
    );
};

export default Textarea;

