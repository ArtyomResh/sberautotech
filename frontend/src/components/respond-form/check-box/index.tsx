import React from 'react';
import { ValidationRule } from 'react-hook-form/dist/types/validator';
import { Message } from 'react-hook-form/dist/types/form';

import { useClassnames } from '../../../hooks/use-classnames';

import style from './index.css';

import { useFormContext } from 'react-hook-form';

export interface IRadioButtonProps {
    label: string | React.ReactElement,
    name: string,
    inputRef?: React.Ref<HTMLInputElement>,
    checked?: boolean,
    className?: string,
    requiredValidation?: Message | ValidationRule<boolean>,
    isBlock?: boolean,
    onChange?: (e: InputEvent) => void
}

const CheckBox: React.FC<IRadioButtonProps> = ({ label, name, isBlock, ...props }: IRadioButtonProps) => {
    const { register, formState } = useFormContext();

    const cn = useClassnames(style);

    return (
        <div className={cn('check-box', props?.className)}>
            <input
                type="checkbox"
                className={cn('check-box__input', { 'check-box__input_error': formState.errors?.[name] })}
                {...register(name, {
                    required: props.requiredValidation
                })}
                onChange={props?.onChange}
            />
            <label className={cn('check-box__label', { 'check-box__label_block': isBlock })}>
                {label}
            </label>
        </div>
    );
};

export default CheckBox;

