import React, { useState, useCallback, useRef } from 'react';

import style from './index.css';

import Cross from './cross';

import { useClassnames } from '../../../hooks/use-classnames';
import { useFormContext } from 'react-hook-form';

type TInputType = 'text' | 'email' | 'file';

interface IProps {
    type?: TInputType,
    placeholder?: string,
    name?: string,
    ref?: React.Ref<HTMLInputElement>
}

interface IState {
    fileName: string | undefined,
    fileExtension: string | undefined
}

const Input = ({ type, placeholder, ref, name }: IProps) => {
    const { register } = useFormContext();
    const cn = useClassnames(style);

    const [fill, setFill] = useState<string | null>('');
    const [file, setFile] = useState<IState>({ fileName: '', fileExtension: '' });

    const fillerHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFill(e.target.value), [fill]);

    const inputFile = useRef<HTMLInputElement>(null);

    const handler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(inputFile.current) {
            inputFile.current.click();
        }
    };

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


    if(type === 'file') {
        return (
            <div className={cn('field')}>
                <input
                    type="file"
                    id="file"
                    hidden={true}
                    // TODO VALIDATION
                    {...register(name)}
                    onChange={onChangeHandler}
                />
                <label htmlFor="file" className={cn('field__input_file')}>
                    <span className={cn({ 'field__input_file-title': file.fileName })}>{file.fileName ? file.fileName : 'Прикрепить файл'}</span>
                    <span className={cn('field__input_file-ext')}>{file.fileExtension ? `.${file.fileExtension}` : null}</span>
                    <div className={cn('field__input_file-cross')} onClick={cancelFileHandler}>{file.fileName ? <Cross /> : null}</div>
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
                className={cn('field__input', { 'field__input_filled': fill })}
                type={type}
                placeholder={placeholder}
                // TODO VALIDATION
                {...register(name)}
            />
        </div>
    );
};

export default Input;

