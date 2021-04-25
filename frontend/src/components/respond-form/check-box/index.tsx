import React from 'react';
import { ValidationRule } from 'react-hook-form/dist/types/validator';
import { Message } from 'react-hook-form/dist/types/form';

import { useClassnames } from '../../../hooks/use-classnames';

import style from './index.css';

import { useFormContext } from 'react-hook-form';

export interface IRadioButtonProps {
    label: string,
    name?: string,
    inputRef?: React.Ref<HTMLInputElement>,
    checked?: boolean,
    className?: string,
    requiredValidation?: Message | ValidationRule<boolean>
    // onChange?: (value: string) => void
}

const CheckBox: React.FC<IRadioButtonProps> = (props: IRadioButtonProps) => {
    const { register, formState } = useFormContext();
    const {
        label, name
    } = props;

    console.log(formState.errors);
    

    const cn = useClassnames(style);

    return (
        <div className={cn('check-box')}>
            <input
                type="checkbox"
                className={cn('check-box__input', { 'check-box__input_error': formState.errors?.[name] })}
                // onChange={(e) => onChange?.(e.target.value)}
                {...register(name, {
                    required: props.requiredValidation
                })}
            />
            <label className={cn('check-box__label')}>
                {label}
            </label>
        </div>
    );
};

export default CheckBox;

