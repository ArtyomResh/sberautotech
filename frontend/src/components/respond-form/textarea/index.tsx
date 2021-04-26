import React from 'react';
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

    return (
        <textarea
            className={cn('textarea', { 'textarea_error': formState.errors?.[name] })}
            placeholder={placeholder}
            {...register(name, {
                required: requiredValidation
            })}
        />
    );
};

export default Textarea;

