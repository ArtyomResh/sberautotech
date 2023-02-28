import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { useClassnames } from '../../hooks/use-classnames';
import useDocumentScrollThrottled from '../nav/use-document-scroll-throttled';
import Alert from '../alert';
import Title from './components/Title';

import './index.css';

interface IProps {
    className: string,
    isSended: boolean,
    children: React.ReactNode,
    onSubmit: (data: Record<string, string>) => Promise<void>,
    alertType: 'error' | 'success',
    alertText: string,
    onOutsideClick: (e?: React.MouseEvent) => void,
    onCloseAlertClick: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    isFormVisible: boolean,
    setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>> | (() => void),
    leftContainerComponent: React.ReactNode,
    title: string
}

const ModalForm = ({
    className,
    isSended,
    children,
    onSubmit,
    alertType,
    alertText,
    onOutsideClick,
    onCloseAlertClick,
    isFormVisible,
    setIsFormVisible,
    leftContainerComponent,
    title
}: IProps) => {
    const context = useForm({
        mode            : 'onSubmit',
        reValidateMode  : 'onChange',
        shouldFocusError: true,
        defaultValues   : {}
    });

    const [onTop, setSendToTop] = useState(false);

    const cn = useClassnames();

    useDocumentScrollThrottled(({ previousScrollTop, currentScrollTop }) => {
        const MINIMUM_SCROLL = 5;
        const TIMEOUT_DELAY = 100;
        const isScrolledDown = previousScrollTop < currentScrollTop;
        const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

        const timeoutId = setTimeout(() => {
            setSendToTop(isScrolledDown && isMinimumScrolled);

            clearTimeout(timeoutId);
        }, TIMEOUT_DELAY);
    });


    useEffect(() => {
        const outsideClickHandler = (e: MouseEvent) => {
            if(
                isFormVisible
                && !(e.target as HTMLElement).closest('.modal-form')
                && !(e.target as HTMLElement).classList.contains('ui-select__option')
            ) {
                setIsFormVisible(false);
                context.reset();

                onOutsideClick();
            }
        };

        if(isFormVisible) {
            window.addEventListener('click', outsideClickHandler);
        }

        return () => {
            window.removeEventListener('click', outsideClickHandler);
        };
    }, [isFormVisible]);

    const handleClose = () => {
        setIsFormVisible(false);
    };

    if(!isFormVisible) {
        return null;
    }

    return (
        <React.Fragment>
            {!isSended && (
                <FormProvider {...context}>
                    <form
                        onSubmit={context.handleSubmit(onSubmit)} className={cn(className, 'modal-form', {
                            'modal-form_visible': isFormVisible,
                            'modal-form_top'    : onTop
                        })}
                    >
                        <div className={cn('modal-form__close-btn')} onClick={handleClose}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.80852 17.4881C0.417995 17.8786 0.417995 18.5118 0.80852 18.9023C1.19904 19.2928 1.83221 19.2928 2.22273 18.9023L10.0009 11.1241L17.7791 18.9023C18.1696 19.2928 18.8028 19.2928 19.1933 18.9023C19.5838 18.5118 19.5838 17.8786 19.1933 17.4881L11.4151 9.70989L19.1933 1.93172C19.5838 1.54119 19.5838 0.908027 19.1933 0.517502C18.8028 0.126978 18.1696 0.126979 17.7791 0.517503L10.0009 8.29568L2.22273 0.517503C1.83221 0.126979 1.19904 0.126979 0.808518 0.517503C0.417994 0.908028 0.417994 1.54119 0.808519 1.93172L8.58669 9.70989L0.80852 17.4881Z" fill="#2E3840" />
                            </svg>
                        </div>

                        <Title className={cn('modal-form__title')} dangerouslySetInnerHTML={{ __html: `${title}` }} />

                        <div className={cn('modal-form__content')}>
                            {leftContainerComponent}

                            {children}
                        </div>

                    </form>
                </FormProvider>
            )}

            <Alert
                type={alertType}
                onCloseClick={onCloseAlertClick}
                isVisible={isSended}
            >
                {alertText}
            </Alert>
        </React.Fragment>
    );
};

export default ModalForm;
