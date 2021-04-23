import React from 'react';

import { useClassnames } from '../../../hooks/use-classnames';

import style from './index.css';

export interface IRadioButtonProps {
    label: string,
    name?: string,
    inputRef?: React.Ref<HTMLInputElement>,
    checked?: boolean,
    className?: string,
    onChange?: (value: string) => void
}

const CheckBox: React.FC<IRadioButtonProps> = (props: IRadioButtonProps) => {
    const {
        label, name, onChange
    } = props;

    const cn = useClassnames(style);

    return (
        <div className={cn('radio-button')}>
            <input
                name={name}
                type="checkbox"
                className={cn('radio-button__input')}
                onChange={(e) => onChange?.(e.target.value)}
            />
            <label className={cn('radio-button__label')}>
                {label}
            </label>
        </div>
    );
};

export default CheckBox;

