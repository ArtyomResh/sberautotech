import React, { useState, useCallback, useRef } from 'react';

import style from './index.css';

import Cross from './cross';

import { useClassnames } from '../../../hooks/use-classnames';

type TInputType = 'text' | 'email' | 'file';

interface IProps {
    type?: TInputType;
    placeholder?: string;
    ref?: React.Ref<HTMLInputElement>;
}

const Input = ({ type, placeholder, ref }: IProps) => {
    const cn = useClassnames(style);

    const [fill, setFill] = useState<string | null>('');
    const [file, setFile] = useState<string | undefined>('');
    const [fileExtension, setFileExtension] = useState<string | undefined>('');

    const fillerHandler = useCallback((e: React.ChangeEvent) => setFill(e.target.value), [fill]);

    const inputFile = useRef<HTMLInputElement>(null);

    const handler = (e: React.ChangeEvent) => {
        e.preventDefault();

        if(inputFile.current) {
            inputFile.current.click();
        }
    };

    const onChangeHandler = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        const inputFile: File | null = input.files ? input.files[0] : null;
        const fileExtension = inputFile?.name.split('.').pop();
        const fileName = inputFile?.name.split('.').shift();

        setFile(fileName);
        setFileExtension(fileExtension);
    };

    const cancelFileHandler = (e) => {
        e.stopPropagation();
        setFile('');
    };


    if(type === 'file') {
        return (
            <div className={cn('field')}>
                <input
                    type="file"
                    hidden={true}
                    ref={inputFile}
                    onChange={onChangeHandler}
                />
                <button
                    className={cn('field__input_file')}
                    onClick={handler}
                ><span className={cn({ 'field__input_file-title': file })}>{file ? file : 'Прикрепить файл'}</span>
                    <span className={cn('field__input_file-ext')}>{file ? `.${fileExtension}` : null}</span>
                    <div className={cn('field__input_file-cross')} onClick={cancelFileHandler}>{file ? <Cross /> : null}</div>
                </button>
            </div>
        );
    }

    return (
        <div className={cn('field')}>
            <input
                className={cn('field__input', { 'field__input_filled': fill })}
                type={type}
                placeholder={placeholder}
                onChange={fillerHandler}
                ref={ref}
            />
        </div>
    );
};

export default Input;

