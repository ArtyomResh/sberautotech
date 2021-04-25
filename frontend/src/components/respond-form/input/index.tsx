import React, { useState } from 'react';
import { ValidationRule, ValidationValueMessage } from 'react-hook-form/dist/types/validator';
import { Message } from 'react-hook-form/dist/types/form';

import style from './index.css';

import Cross from './cross';

import { useClassnames } from '../../../hooks/use-classnames';
import { useFormContext } from 'react-hook-form';

type TInputType = 'text' | 'email' | 'file';

interface IProps {
    type?: TInputType,
    placeholder?: string,
    name?: string,
    ref?: React.Ref<HTMLInputElement>,
    pattern?: RegExp | ValidationValueMessage<RegExp>,
    requiredValidation?: Message | ValidationRule<boolean>
}

interface IState {
    fileName: string | undefined,
    fileExtension: string | undefined
}

const Input = ({ type, placeholder, ref, name, ...props }: IProps) => {
    const { register, formState } = useFormContext();
    const cn = useClassnames(style);

    const [file, setFile] = useState<IState>({ fileName: '', fileExtension: '' });

    // const fillerHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFill(e.target.value), [fill]);

    // const inputFile = useRef<HTMLInputElement>(null);

    // const handler = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();

    //     if(inputFile.current) {
    //         inputFile.current.click();
    //     }
    // };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const inputFile: File | null = input.files ? input.files[0] : null;
        const fileExtension = inputFile?.name.split('.').pop();
        const fileName = inputFile?.name.split('.').shift();

        setFile({ fileName, fileExtension });
    };

    const cancelFileHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setFile({ fileName: '', fileExtension: '' });
    };

    console.log(formState.errors);

    if(type === 'file') {
        return (
            <div className={cn('field')}>
                <input
                    type="file"
                    id="file"
                    hidden={true}
                    {...register(name, { required: props.requiredValidation })}
                    onChange={onChangeHandler}
                />
                <label htmlFor="file" className={cn('field__input-file', { 'field__input-file_error': formState.errors?.[name] })}>
                    <span className={cn({ 'field__input-file-title': file.fileName })}>{file.fileName ? file.fileName : 'Прикрепить файл'}</span>
                    <span className={cn('field__input-file-ext')}>{file.fileExtension ? `.${file.fileExtension}` : null}</span>
                    <div className={cn('field__input-file-cross')} onClick={cancelFileHandler}>{file.fileName ? <Cross /> : null}</div>
                </label>
                {/* <button
                    className={cn('field__input_file')}
                    onClick={handler}
                ><span className={cn({ 'field__input_file-title': file.fileName })}>{file.fileName ? file.fileName : 'Прикрепить файл'}</span>
                    <span className={cn('field__input_file-ext')}>{file.fileExtension ? `.${file.fileExtension}` : null}</span>
                    <div className={cn('field__input_file-cross')} onClick={cancelFileHandler}>{file.fileName ? <Cross /> : null}</div>
                </button> */}
            </div>
        );
    }

    return (
        <div className={cn('field')}>
            <input
                className={cn('field__input', { 'field__input_error': formState.errors?.[name] })}
                type={type}
                placeholder={placeholder}
                {...register(name, { required: props.requiredValidation,
                    pattern : props.pattern })}
            />
        </div>
    );
};

export default Input;

