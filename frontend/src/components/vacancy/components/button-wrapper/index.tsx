import React, { useContext, useCallback } from 'react';

import Button from '../../../button-like/button';
import { appContext } from '../../../../context/context';
import { useClassnames } from '../../../../hooks/use-classnames';

import './index.css';

interface IProps {
    children?: React.ReactNode,
    className?: string,
    title: string,
    huntflowId: string
}

const ButtonWrapper = ({ className, title, huntflowId: vacancyId, children }: IProps) => {
    const { setIsRespondFormVisible, isRespondFormVisible, setVacancyTitle, vacancyTitle, huntflowId, setHuntflowId } = useContext(appContext);

    const setIsPopupVisibleHandler = useCallback(() => {
        setIsRespondFormVisible?.(true);
        setVacancyTitle?.(title);
        setHuntflowId?.(vacancyId);
    }, [vacancyTitle, huntflowId]);

    const cn = useClassnames();

    return (
        <Button
            className={cn(className, 'button-wrapper', { 'button-wrapper_is-visible-on-tablet': !isRespondFormVisible })}
            type="button"
            buttonSize="s"
            isBlock={true}
            onClick={setIsPopupVisibleHandler}
        >
            {children}
        </Button>
    );
};


export default ButtonWrapper;
