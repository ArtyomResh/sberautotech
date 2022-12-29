import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Recaptcha from 'react-recaptcha';
import { graphql, useStaticQuery } from 'gatsby';

import Input from './input';
import Textarea from './textarea';
import Button from '../button';
import CheckBox from './check-box';
import InputFile from './inputFile';
import { useClassnames } from '../../hooks/use-classnames';
import { toBase64, toUnescapedHTML } from '../../utils';
import { appContext } from '../../context/context';
import useDocumentScrollThrottled from '../nav/use-document-scroll-throttled';
import Alert from '../public-beta-signup/components/alert';

import style from './index.css';

const FORM_URL = '/form/vacancy';

const query = graphql`
  query {
    allStrapiRespondForm {
      edges {
        node {
          consent
          errorButtonText
          errorSend
          file
          locale
          name
          successButtonText
          successSend
          surname
          buttonText
          telephone
          fewWordsAboutMyself
          mail
          vacancyRespondHeader
          vacancyRespondTitle
        }
      }
    }
  }
`;

export interface IRespondFormData {
    name: string,
    surname: string,
    email: string,
    telephone: string,
    aboutMyself: string,
    file: string
}

const formFields: {[key in keyof IRespondFormData]: key} = {
    name       : 'name',
    surname    : 'surname',
    email      : 'email',
    telephone  : 'telephone',
    aboutMyself: 'aboutMyself',
    file       : 'file'
};

const RespondForm = () => {
    const data = useStaticQuery(query);
    const [isRecaptchaConfirmed, setIsRecaptchaConfirmed] = useState(true);
    const [isSended, setIsSended] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [onTop, setSendToTop] = useState(false);
    const { vacancyTitle, huntflowId, setVacancyTitle, setHuntflowId, isRespondFormVisible, setIsRespondFormVisible } = useContext(appContext);
    const cn = useClassnames(style);
    const timeoutId = useRef<ReturnType<typeof setTimeout>>();
    const timeoutTime = 3000;

    const {
        consent,
        telephone,
        vacancyRespondHeader,
        mail,
        errorSend,
        file,
        locale,
        name,
        fewWordsAboutMyself,
        successSend,
        buttonText,
        surname
    } = data.allStrapiRespondForm.edges[0].node;

    const context = useForm({
        mode            : 'onSubmit',
        reValidateMode  : 'onChange',
        shouldFocusError: true,
        defaultValues   : {}
    });

    const fileRef = useRef<File | null>(null);
    const handleFileChange = (file: File | null) => {
        fileRef.current = file;
    };

    const closeHandler = () => {
        setVacancyTitle?.('');
        setHuntflowId?.('');
        setIsRespondFormVisible?.(false);
    };

    const MINIMUM_SCROLL = 5;
    const TIMEOUT_DELAY = 100;

    useDocumentScrollThrottled(({ previousScrollTop, currentScrollTop }) => {
        const isScrolledDown = previousScrollTop < currentScrollTop;
        const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

        setTimeout(() => {
            setSendToTop(isScrolledDown && isMinimumScrolled);
        }, TIMEOUT_DELAY);
    });

    const preventClosePopup = useCallback((e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.stopPropagation();

        if(timeoutId) {
            clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);
        }

        setIsSended(false);
        setIsError(false);
        setIsRespondFormVisible?.(false);
        context.reset();
        fileRef.current = null;
    }, [timeoutId]);


    const outsideClickHandler = useCallback((e) => {
        if(isRespondFormVisible && !e.target.closest('.respond-form') && !e.target.classList.contains('ui-select__option')) {
            preventClosePopup();
        }
    }, [isRespondFormVisible, preventClosePopup]);

    useEffect(() => {
        window.addEventListener('click', outsideClickHandler);

        return () => {
            window.removeEventListener('click', outsideClickHandler);
        };
    }, [outsideClickHandler]);


    const onSubmit = async (data: IRespondFormData) => {
        setIsLoading(true);
        const formData = new FormData();
        const file = fileRef.current;


        formData.append('name', data.name);
        formData.append('surname', data.surname);
        formData.append('email', data.email);
        formData.append('telephone', data.telephone);
        formData.append('textarea', data.aboutMyself);

        vacancyTitle && formData.append('vacancy', vacancyTitle);
        huntflowId && formData.append('huntflowId', huntflowId);

        if(file) {
            const base64 = await toBase64(file);

            if(base64) {
                // TODO: избавиться от any https://jira.csssr.io/browse/SBER-187
                formData.append('content', base64 as any);
                formData.append('filename', file.name);
            }
        }

        try {
            const res = await fetch(FORM_URL, {
                method: 'POST',
                body  : formData
            });

            if(!res.ok) {
                throw new Error(res.statusText);
            }

            if(res.ok) {
                setIsSended(true);
                setIsLoading(false);

                timeoutId.current = setTimeout(() => {
                    setIsSended(false);
                    setIsRespondFormVisible?.(false);
                }, timeoutTime);
            }
        } catch(err) {
            setIsSended(true);
            setIsError(true);
            setIsLoading(false);
            setIsRespondFormVisible?.(true);
        }
    };

    const verifyCallback = useCallback(() => {
        setIsRecaptchaConfirmed(true);
    }, []);

    if(!isRespondFormVisible) {
        return null;
    }

    return (
        <React.Fragment>
            {!isSended && (
                <FormProvider {...context}>
                    <form
                        onSubmit={context.handleSubmit(onSubmit)} className={cn('respond-form', {
                            'respond-form_visible': isRespondFormVisible,
                            'respond-form_top'    : onTop
                        })}
                    >
                        <div className={cn('respond-form__close-btn')} onClick={closeHandler}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.80852 17.4881C0.417995 17.8786 0.417995 18.5118 0.80852 18.9023C1.19904 19.2928 1.83221 19.2928 2.22273 18.9023L10.0009 11.1241L17.7791 18.9023C18.1696 19.2928 18.8028 19.2928 19.1933 18.9023C19.5838 18.5118 19.5838 17.8786 19.1933 17.4881L11.4151 9.70989L19.1933 1.93172C19.5838 1.54119 19.5838 0.908027 19.1933 0.517502C18.8028 0.126978 18.1696 0.126979 17.7791 0.517503L10.0009 8.29568L2.22273 0.517503C1.83221 0.126979 1.19904 0.126979 0.808518 0.517503C0.417994 0.908028 0.417994 1.54119 0.808519 1.93172L8.58669 9.70989L0.80852 17.4881Z" fill="#2E3840" />
                            </svg>
                        </div>
                        <div className={cn('text-block')}>
                            <h1 className={cn('text-block__header')}>{toUnescapedHTML(vacancyRespondHeader)}</h1>
                            <p className={cn('text-block__respond-vacancy-title')}>{vacancyTitle}</p>
                        </div>
                        <div className={cn('right-block')}>
                            <div className={cn('right-block__inputs')}>
                                <div className={cn('right-block__top-section')}>
                                    <div className={cn('right-block__field-wrapper')}>
                                        <Input type="text" placeholder={name} name={formFields.name} autocomplete="off" pattern={/^[А-Яа-яЁёA-Za-z\s-]+$/i} requiredValidation={true} />
                                    </div>
                                    <div className={cn('right-block__field-wrapper')}>
                                        <Input type="text" placeholder={surname} name={formFields.surname} autocomplete="off" requiredValidation={true} pattern={/^[А-Яа-яЁёA-Za-z\s-]+$/i} />
                                    </div>
                                </div>
                                <div className={cn('right-block__bottom-section')}>
                                    <div className={cn('right-block__field-wrapper', 'right-block__field-email')}>
                                        <Input type="text" placeholder={mail} name={formFields.email} autocomplete="off" requiredValidation={true} pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g} />
                                    </div>
                                    <div className={cn('right-block__field-wrapper', 'right-block__field-email')}>
                                        <Input type="tel" placeholder={telephone} name={formFields.telephone} requiredValidation={true} />
                                    </div>
                                </div>
                            </div>
                            <div className={cn('right-block__textarea-wrapper')}>
                                <Textarea name={formFields.aboutMyself} placeholder={fewWordsAboutMyself} requiredValidation={true} />
                            </div>
                            <div className={cn('right-block__checkbox-wrapper')}>
                                <CheckBox name="acception" requiredValidation={true} label={consent} />
                            </div>
                            <div className={cn('right-block__button-section')}>
                                <div className={cn('right-block__button-wrapper')}>
                                    <InputFile placeholder={file} name="file" onFileChange={handleFileChange} />
                                </div>

                                {isRecaptchaConfirmed ? (
                                    <div className={cn('right-block__button-wrapper')}>
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            isLoading={isLoading}
                                            isBlock={true}
                                        >
                                            {buttonText}
                                        </Button>
                                    </div>
                                ) : (
                                    <Recaptcha
                                        className={cn('right-block__grecaptcha')}
                                        sitekey="6LcxFCQbAAAAAPk5ZtW8P4LTJFuMUTHMh65Oap4n"
                                        render="explicit"
                                        hl={locale}
                                        verifyCallback={verifyCallback}
                                    />
                                )}
                            </div>
                        </div>
                    </form>
                </FormProvider>
            )}
            <Alert
                type={isError ? 'error' : 'success'}
                onCloseClick={preventClosePopup}
                isVisible={isSended}
            >
                {isError ? errorSend : successSend}
            </Alert>
        </React.Fragment>
    );
};

export default RespondForm;
