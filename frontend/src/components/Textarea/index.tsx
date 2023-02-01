import React, { useMemo } from 'react';
import { ValidationRule } from 'react-hook-form/dist/types/validator';
import { Message, useController } from 'react-hook-form';

import { useClassnames } from '../../hooks/use-classnames';
import useDeviceDetect from '../../hooks/use-device-detect';
import { translate } from '../../utils/i18n';

import style from './index.css';

interface IProps {
    className?: string,
    placeholder?: string,
    name: string,
    requiredValidation: Message | ValidationRule<boolean>,
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

const Textarea = ({ className, placeholder, name, requiredValidation, onFocus }: IProps) => {
    const fieldName = `${name}` as const;
    const cn = useClassnames(style);
    const { isMobile } = useDeviceDetect();
    const controller = useController({
        name : fieldName,
        rules: {
            required: requiredValidation && 'Обязательное поле'
        },
        shouldUnregister: true
    });
    const errorMessage = useMemo(() => {
        const error = controller.fieldState.error;

        if(!error) {
            return;
        }

        const defaultMessage = translate('validation:default');

        return error.message || defaultMessage;
    }, [controller.fieldState.error]);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if(isMobile) {
            // Хотим скролить поле во вбю,
            // что бы оно появлялось над виртуальной клавиатурой на мобилках
            e.target.scrollIntoView();
        }

        onFocus?.(e);
    };

    const controllerProps = controller.field;

    return (
        <div
            className={cn(className, 'textarea', { 'textarea_error': Boolean(errorMessage) })}
        >
            <textarea
                className={cn('textarea__field')}
                placeholder=" "
                {...controllerProps}
                onFocus={handleFocus}
            />
            <label className={cn('textarea__label')}>
                {placeholder}
            </label>
            <label className={cn('input__error-label')} htmlFor="textarea">
                {errorMessage}
            </label>
        </div>
    );
};

export default Textarea;

