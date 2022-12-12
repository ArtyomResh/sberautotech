import React, { useContext, useCallback } from 'react';

import Button from '../../../button';
import { appContext } from '../../../../context/context';

interface IProps {
    children?: React.ReactNode,
    className?: string,
    title: string,
    huntflowId: string
}

const ButtonWrapper = ({ className, title, huntflowId: vacancyId, children }: IProps) => {
    const { setIsRespondFormVisible, setIsPopupVisible, setVacancyTitle, vacancyTitle, huntflowId, setHuntflowId } = useContext(appContext);

    const setIsPopupVisibleHandler = useCallback(() => {
        setIsPopupVisible?.(true);
        setIsRespondFormVisible?.(true);
        setVacancyTitle?.(title);
        setHuntflowId?.(vacancyId);
    }, [vacancyTitle, huntflowId]);

    return (
        <Button
            className={className}
            type="button"
            size="s"
            isBlock={true}
            onClick={setIsPopupVisibleHandler}
        >
            {children}
        </Button>
    );
};


export default ButtonWrapper;
