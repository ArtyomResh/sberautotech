import React, { useState } from 'react';
import { ValidationRule } from 'react-hook-form/dist/types/validator';
import { Message, useFormContext } from 'react-hook-form';

import { useClassnames } from '../../../hooks/use-classnames';

import style from './index.css';

interface IProps {
    placeholder?: string,
    name: string,
    requiredValidation: Message | ValidationRule<boolean>
}

const Textarea = ({ placeholder, name, requiredValidation }: IProps) => {
    const { register, formState, getValues } = useFormContext();
    const fieldName = `${name}` as const;
    const textareaValue = getValues(fieldName);
    const cn = useClassnames(style);
    const [hasValue, setHasValue] = useState(Boolean(textareaValue));

    const blurHandler = () => {
        const textareaValue = getValues(fieldName);

        setHasValue(Boolean(textareaValue));
    };

    return (
        <div
            className={cn('textarea', { 'textarea_error': formState.errors?.[name], 'textarea_has-value': hasValue })}
        >
            <textarea
                className={cn('textarea__field')}
                placeholder=" "
                {...register(fieldName, {
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

