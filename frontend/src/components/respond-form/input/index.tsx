import React, { useState } from 'react';
import { ValidationRule, ValidationValueMessage } from 'react-hook-form/dist/types/validator';
import { Message } from 'react-hook-form/dist/types/form';

import style from './index.css';

import Cross from './cross';

import { useClassnames } from '../../../hooks/use-classnames';
import { useFormContext } from 'react-hook-form';

type TInputType = 'text' | 'email' | 'file';
type TAutoCompleteType = 'on' | 'off';

interface IProps {
    type?: TInputType,
    placeholder?: string,
    name: string,
    ref?: React.Ref<HTMLInputElement>,
    pattern?: RegExp | ValidationValueMessage<RegExp>,
    requiredValidation?: Message | ValidationRule<boolean>,
    autocomplete?: TAutoCompleteType
}

interface IState {
    fileName: string | undefined,
    fileExtension: string | undefined
}

const Input = ({ type, placeholder, ref, name, ...props }: IProps) => {
    const { register, formState } = useFormContext();
    const cn = useClassnames(style);

    const [file, setFile] = useState<IState>({ fileName: '', fileExtension: '' });

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

    if(type === 'file') {
        return (
            <div className={cn('input-file')}>
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
            </div>
        );
    }

    return (
        <input
            className={cn('input', { 'input_error': formState.errors?.[name] })}
            type={type}
            placeholder={placeholder}
            autoComplete={props.autocomplete || 'off'}
            {...register(name, { required: props.requiredValidation,
                pattern : props.pattern })}
        />
    );
};

export default Input;

