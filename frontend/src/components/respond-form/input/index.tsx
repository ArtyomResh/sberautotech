import React, { useMemo } from 'react';
import { ValidationValueMessage } from 'react-hook-form/dist/types/validator';

import style from './index.css';

import { useClassnames } from '../../../hooks/use-classnames';
import { useController, useFormContext } from 'react-hook-form';

type TInputType = 'text' | 'email' | 'tel';
type TAutoCompleteType = 'on' | 'off';

interface IProps {
    type?: TInputType,
    placeholder?: string,
    name: string,
    pattern?: RegExp | ValidationValueMessage<RegExp>,
    requiredValidation?: boolean,
    autocomplete?: TAutoCompleteType,
    className?: string,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const Input = ({ type, placeholder, name, className, pattern, ...props }: IProps) => {
    const { setValue } = useFormContext();

    const controller = useController({ name, rules: {
        required: props.requiredValidation && 'Обязательное поле',
        pattern : pattern
    }, shouldUnregister: true });
    const controllerProps = controller.field;

    const cn = useClassnames(style);

    const getInputNumbersValue = (string: string) => {
        return String(string).replace(/\D/g, '');
    };

    const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        const pasted = e.clipboardData;

        if(pasted) {
            const pastedText = pasted.getData('Text');

            if(/\D/g.test(pastedText)) {
                (input as HTMLInputElement).value = inputNumbersValue;
            }
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target,
            selectionStart = (input as HTMLInputElement).selectionStart;
        let formattedInputValue = '',
            inputNumbersValue = getInputNumbersValue((input as HTMLInputElement).value);


        if(!inputNumbersValue) {
            setValue(name, '');
            void controllerProps.onChange(e);

            return;
        }

        if((input as HTMLInputElement).value.length !== selectionStart) {
            if(e.data && /\D/g.test(e.data)) {
                setValue(name, inputNumbersValue);
                void controllerProps.onChange(e);
            }

            return;
        }

        if(['7', '8', '9'].includes(inputNumbersValue[0])) {
            if(inputNumbersValue.startsWith('9')) {
                inputNumbersValue = `7${inputNumbersValue}`;
            }
            const firstSymbols = '+7';

            (input as HTMLInputElement).value = `${firstSymbols} `;

            formattedInputValue = (input as HTMLInputElement).value;

            if(inputNumbersValue.length > 1) {
                formattedInputValue += inputNumbersValue.substring(1, 4);
            }

            if(inputNumbersValue.length >= 5) {
                formattedInputValue += ` ${inputNumbersValue.substring(4, 7)}`;
            }

            if(inputNumbersValue.length >= 8) {
                formattedInputValue += `–${inputNumbersValue.substring(7, 9)}`;
            }

            if(inputNumbersValue.length >= 10) {
                formattedInputValue += `–${inputNumbersValue.substring(9, 11)}`;
            }
        } else {
            formattedInputValue = `+${inputNumbersValue.substring(0, 16)}`;
        }
        setValue(name, formattedInputValue);
        void controllerProps.onChange(e);
    };

    const errorMessage = useMemo(() => {
        const error = controller.fieldState.error;

        if(!error) {
            return;
        }
        const errorType = error.type;

        let defaultMessage = 'Поле заполнено неверно';

        if(errorType === 'pattern') {
            switch (type) {
                case 'email':
                    defaultMessage = 'Неверный формат почты';
                    break;
                case 'tel':
                    defaultMessage = 'Неверный формат номера телефона';
                    break;
                default:
                    defaultMessage = 'Недопустимое значение';
                    break;
            }
        }

        return error.message || defaultMessage;
    }, [controller.fieldState.error]);

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        void controllerProps.onBlur();
        props?.onBlur?.(e);
    };

    const elInput = () => {
        return (
            <div className={cn('input', className, { 'input_error': Boolean(errorMessage) })}>
                <input
                    placeholder={' '}
                    id="input"
                    type={type}
                    autoComplete={props.autocomplete || 'off'}
                    {...controllerProps}
                    onFocus={props?.onFocus}
                    onBlur={onBlur}
                />
                <label className={cn('input__label')} htmlFor="input">
                    {placeholder}
                </label>
                <label className={cn('input__error-label')} htmlFor="input">
                    {errorMessage}
                </label>
            </div>
        );
    };

    const elInputTel = () => {
        return (
            <div className={cn('input', className, { 'input_error': Boolean(errorMessage) })}>
                <input
                    placeholder="+7 ___ ___ - __ - __"
                    id="input"
                    type={type}
                    autoComplete={props.autocomplete || 'off'}
                    {...controllerProps}
                    onChange={handlePhoneChange}
                    onPaste={handlePhonePaste}
                    onFocus={props?.onFocus}
                    onBlur={onBlur}
                />
                <label className={cn('input__label', 'input__label_tel')} htmlFor="input">
                    {placeholder}
                </label>
                <label className={cn('input__error-label')} htmlFor="input">
                    {errorMessage}
                </label>
            </div>
        );
    };

    return (
        <React.Fragment>
            {type === 'tel' ? elInputTel() : null}
            {type === 'text' || type === 'email' ? elInput() : null}
        </React.Fragment>
    );
};

export default Input;

