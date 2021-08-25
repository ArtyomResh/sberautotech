import React, { useCallback } from 'react';
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
    const { register, formState } = useFormContext();
    const cn = useClassnames(style);

    const blurHandler = useCallback((e) => {
        if(!e.currentTarget.querySelector('textarea').value) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.removeProperty('border-color');
        }
    }, []);

    const onClickHandler = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = 'white';

        if(!formState.errors?.[name]) {
            e.currentTarget.style.borderColor = 'white';
        }
        e.currentTarget.querySelector('textarea').focus();
    }, [formState.errors?.[name]]);

    return (
        <div
            className={cn('textarea', { 'textarea_error': formState.errors?.[name] })}
            onMouseDown={onClickHandler}
            onBlur={blurHandler}
        >
            <textarea
                className={cn('textarea__field')}
                placeholder=" "
                {...register(name, {
                    required: requiredValidation
                })}
            />
            <label className={cn('textarea__label')}>
                {placeholder}
            </label>
        </div>
    );
};

export default Textarea;

