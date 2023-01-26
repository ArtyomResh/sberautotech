import React, { ChangeEvent } from 'react';
import { ValidationRule } from 'react-hook-form/dist/types/validator';
import { Message, useFormContext } from 'react-hook-form';

import { useClassnames } from '../../hooks/use-classnames';

import Text from '../text';

import style from './index.css';


export interface IRadioButtonProps {
    label: string | React.ReactElement,
    name: string,
    inputRef?: React.Ref<HTMLInputElement>,
    checked?: boolean,
    className?: string,
    requiredValidation?: Message | ValidationRule<boolean>,
    isBlock?: boolean,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const CheckBox: React.FC<IRadioButtonProps> = ({ label, name, isBlock, ...props }: IRadioButtonProps) => {
    const { register, formState } = useFormContext();


    const { onChange, ...registerProps } = register(`${name}` as const, {
        required: props.requiredValidation
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        void onChange(e);
        props.onChange?.(e);
    };

    const cn = useClassnames(style);

    return (
        <div className={cn('check-box', props?.className)}>
            <input
                type="checkbox"
                className={cn('check-box__input', { 'check-box__input_error': formState.errors?.[name] })}
                {...registerProps}
                onChange={handleChange}
            />

            <Text className={cn('check-box__label', { 'check-box__label_block': isBlock })} size={4} as="label">
                {label}
            </Text>
        </div>
    );
};

export default CheckBox;

