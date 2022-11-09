import React, { useState, useMemo } from 'react';
import { ValidationRule, ValidationValueMessage } from 'react-hook-form/dist/types/validator';
import { Message } from 'react-hook-form/dist/types/form';

import style from './index.css';

import Cross from './cross';

import { useClassnames } from '../../../hooks/use-classnames';
import { useFormContext } from 'react-hook-form';

type TInputType = 'text' | 'email' | 'file' | 'tel';
type TAutoCompleteType = 'on' | 'off';

interface IProps {
    type?: TInputType,
    placeholder?: string,
    name: string,
    ref?: React.Ref<HTMLInputElement>,
    pattern?: RegExp | ValidationValueMessage<RegExp>,
    requiredValidation?: Message | ValidationRule<boolean>,
    autocomplete?: TAutoCompleteType,
    className?: string
}

interface IState {
    fileName?: string,
    fileExtension?: string
}

const Input = ({ type, placeholder, ref, name, className, ...props }: IProps) => {
    const { register, formState } = useFormContext();
    const cn = useClassnames(style);

    const [file, setFile] = useState<IState>({ fileName: '', fileExtension: '' });
    const [string, setString] = useState<string>('');

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const inputFile: File | null = input.files ? input.files[0] : null;
        const fileExtension = inputFile?.name.split('.').pop();
        const fileName = inputFile?.name.split('.').shift();
        const fileSize = inputFile?.size ?? 0;

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if(fileSize / 1024 / 1024 < 1) {
            setFile({ fileName, fileExtension });
        }
    };

    const cancelFileHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setFile({ fileName: '', fileExtension: '' });
    };

    const getInputNumbersValue = (string: string) => {
        return String(string).replace(/\D/g, '');
    };

    const onPhonePaste = (e: React.MouseEvent<HTMLInputElement>) => {
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

    const onPhoneInput = (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target,
            selectionStart = (input as HTMLInputElement).selectionStart;
        let formattedInputValue = '',
            inputNumbersValue = getInputNumbersValue((input as HTMLInputElement).value);

        if(!inputNumbersValue) {
            (input as HTMLInputElement).value = '';

            return;
        }

        if((input as HTMLInputElement).value.length !== selectionStart) {
            if(e.data && /\D/g.test(e.data)) {
                (input as HTMLInputElement).value = inputNumbersValue;
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
        (input as HTMLInputElement).value = formattedInputValue;
    };

    const onPhoneKeyDown = (e: React.MouseEvent<HTMLInputElement>) => {
        const inputValue = (e.target as HTMLInputElement).value.replace(/\D/g, '');

        if(e.keyCode === 8 && inputValue.length === 1) {
            (e.target as HTMLInputElement).value = '';
        }
    };

    const erorrHandler = useMemo(() => {
        if(formState.errors?.[name] && string) {
            if(name === 'Почта') {
                return 'Неверный формат почты';
            }

            return 'Недопустимые значение';
        }

        if(formState.errors?.[name] && !string) {
            return 'Обязательное поле';
        }
    }, [string, formState.errors?.[name]]);

    const elInputFile = useMemo(() => {
        return (
            <div className={cn('input-file', className)}>
                <input
                    type="file"
                    id="file"
                    accept="application/pdf, application/msword, application/vnd.oasis.opendocument.text, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/rtf, .pdf, .doc, .docx, .rtf"
                    {...register(name, { required: props.requiredValidation })}
                    onChange={onChangeHandler}
                />
                <label htmlFor="file" className={cn('input-file__label', { 'input-file__label_error': formState.errors?.[name] })}>
                    <span className={cn({ 'input-file__title': file.fileName })}>{file.fileName ? file.fileName : placeholder}</span>
                    <span className={cn('input-file__ext')}>{file.fileExtension ? `.${file.fileExtension}` : null}</span>
                    <div className={cn('input-file__cross')} onClick={cancelFileHandler}>{file.fileName ? <Cross /> : null}</div>
                </label>
            </div>);
    }, [formState, file]);

    const elInput = useMemo(() => {
        return (
            <div className={cn('input', className, { 'input_error': formState.errors?.[name] })}>
                <input
                    placeholder={' '}
                    id="input"
                    type={type}
                    onInput={(e) => {
                        setString(e.target.value);
                    }}
                    autoComplete={props.autocomplete || 'off'}
                    {...register(name, { required: props.requiredValidation,
                        pattern : props.pattern })}
                />
                <label className={cn('input__label')} htmlFor="input">
                    {placeholder}
                </label>
                <label className={cn('input__error-label')} htmlFor="input">
                    {erorrHandler}
                </label>
            </div>
        );
    }, [formState, string]);

    const elInputTel = useMemo(() => {
        return (
            <div className={cn('input', className, { 'input_error': formState.errors?.[name] })}>
                <input
                    placeholder="+7 ___ ___ - __ - __"
                    id="input"
                    type={type}
                    autoComplete={props.autocomplete || 'off'}
                    {...register(name, { required: props.requiredValidation,
                        pattern : props.pattern })}
                    onChange={onPhoneInput}
                    onPaste={onPhonePaste}
                    onKeyDown={onPhoneKeyDown}
                    onInput={(e) => {
                        setString(e.target.value);
                    }}
                />
                <label className={cn('input__label', 'input__label_tel')} htmlFor="input">
                    {placeholder}
                </label>
                <label className={cn('input__error-label')} htmlFor="input">
                    {erorrHandler}
                </label>
            </div>
        );
    }, [formState]);

    return (
        <React.Fragment>
            {type === 'file' ? elInputFile : null}
            {type === 'tel' ? elInputTel : null}
            {type === 'text' || type === 'email' ? elInput : null}
        </React.Fragment>
    );
};

export default Input;

