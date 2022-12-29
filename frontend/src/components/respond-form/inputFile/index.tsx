import React, { useState, useMemo } from 'react';
import { useController } from 'react-hook-form';

import { useClassnames } from '../../../hooks/use-classnames';
import CrossIcon from '../../../images/cross.inline.svg';

import styles from './index.css';

interface IProps {
    placeholder?: string,
    name: string,
    requiredValidation?: boolean,
    className?: string,
    onFileChange?: (file: File | null) => void
}

interface IState {
    fileName?: string,
    fileExtension?: string
}

const InputFile = ({ placeholder, name, className, onFileChange, ...props }: IProps) => {
    const controller = useController({ name : `${name}` as const, rules: {
        required: props.requiredValidation && 'Обязательное поле'
    }, shouldUnregister: true });

    const cn = useClassnames(styles);

    const [file, setFile] = useState<IState>({ fileName: '', fileExtension: '' });

    const errorMessage = useMemo(() => {
        const error = controller.fieldState.error;
        const defaultMessage = 'Поле заполнено неверно';

        if(!error) {
            return;
        }

        return error.message || defaultMessage;
    }, [controller.fieldState.error]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const inputFile: File | null = input.files ? input.files[0] : null;
        const fileExtension = inputFile?.name.split('.').pop();
        const fileName = inputFile?.name.split('.').shift();
        const fileSize = inputFile?.size ?? 0;

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if(fileSize / 1024 / 1024 < 1) {
            onFileChange?.(inputFile);
            setFile({ fileName, fileExtension });
        }

        e.target.value = '';
    };

    const handleFileCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onFileChange?.(null);
        setFile({ fileName: '', fileExtension: '' });
    };

    const controllerProps = controller.field;

    return (
        <div className={cn('input-file', className)}>
            <input
                id="file"
                type="file"
                accept="application/pdf, application/msword, application/vnd.oasis.opendocument.text, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/rtf, .pdf, .doc, .docx, .rtf"
                {...controllerProps}
                onChange={handleFileChange}
            />
            <label htmlFor="file" className={cn('input-file__label', { 'input-file__label_error': errorMessage, 'input-file__label_has-file': file.fileName })}>
                <span className={cn({ 'input-file__title': file.fileName })}>
                    {file.fileName ? file.fileName : placeholder}
                </span>

                <span className={cn('input-file__ext')}>
                    {file.fileExtension ? `.${file.fileExtension}` : null}
                </span>
            </label>

            {
                file.fileName && (
                    <button className={cn('input-file__cross')} type="button" onClick={handleFileCancel}>
                        <CrossIcon width="16px" height="16px" />
                    </button>
                )
            }

        </div>);
};

export default InputFile;

