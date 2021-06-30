import React, { useContext } from 'react';

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
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const ButtonWrapper = ({ className, label, disabled, type, styleType, onClick }: IProps) => {
    const { setIsPopupVisible } = useContext(appContext);

    const setIsPopupVisibleHandler = () => {
        setIsPopupVisible(true);
    };

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
