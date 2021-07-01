import React, { useContext, useEffect, useCallback } from 'react';

import Button from '../button';
import { appContext } from '../../context/context';

type TButtonStyleType = 'primary' | 'secondary' | 'special';
type TButtonType = 'reset' | 'submit' | 'button';

interface IProps {
    label?: string,
    disabled?: boolean,
    type?: TButtonType,
    styleType?: TButtonStyleType,
    className?: string,
    title: string
}

const ButtonWrapper = ({ className, label, disabled, type, styleType, title }: IProps) => {
    const { setIsPopupVisible, setVacancyTitle, vacancyTitle } = useContext(appContext);

    const setIsPopupVisibleHandler = useCallback(() => {
        setIsPopupVisible(true);
        setVacancyTitle(title);
    }, [vacancyTitle]);

    useEffect(() => {
        return () => {
            setVacancyTitle('');
        };
    }, [vacancyTitle]);

    return (
        <Button
            className={className}
            label={label}
            disabled={disabled}
            type={type}
            styleType={styleType}
            onClick={setIsPopupVisibleHandler}
        />
    );
};


export default ButtonWrapper;
