import React, { useState } from 'react';
import { ValidationRule } from 'react-hook-form/dist/types/validator';
import { Message, useFormContext } from 'react-hook-form';

import { useClassnames } from '../../../hooks/use-classnames';
import useDeviceDetect from '../../../hooks/use-device-detect';

import style from './index.css';

interface IProps {
    placeholder?: string,
    name: string,
    requiredValidation: Message | ValidationRule<boolean>,
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

const Textarea = ({ placeholder, name, requiredValidation, onFocus }: IProps) => {
    const { register, formState, getValues } = useFormContext();
    const fieldName = `${name}` as const;
    const textareaValue = getValues(fieldName);
    const cn = useClassnames(style);
    const [hasValue, setHasValue] = useState(Boolean(textareaValue));
    const { isMobile } = useDeviceDetect()

    const handleBlur = () => {
        const textareaValue = getValues(fieldName);

        setHasValue(Boolean(textareaValue));
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if(isMobile) {
            // Хотим скролить поле во вбю,
            // что бы оно появлялось над виртуальной клавиатурой на мобилках
            e.target.scrollIntoView();
        }

        onFocus?.(e);
    }

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
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
            <label className={cn('textarea__label')}>
                {placeholder}
            </label>
        </div>
    );
};

export default Textarea;

