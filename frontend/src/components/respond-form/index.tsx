import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Recaptcha from 'react-recaptcha';

import Input from './input';
import Textarea from './textarea';
import Button from '../button';
import CheckBox from './check-box';
import { useClassnames } from '../../hooks/use-classnames';
import { toBase64 } from '../../utils';
import { appContext } from '../../context/context';

import { toUnescapedHTML } from '../../utils';

import useDocumentScrollThrottled from '../nav/use-document-scroll-throttled';

import style from './index.css';
import { graphql, useStaticQuery } from 'gatsby';

const FORM_URL = '/form';

const query = graphql`
  query {
    allStrapiRespondForm {
      edges {
        node {
          consent
          email
          errorButtonText
          errorSend
          experience
          file
          header
          locale
          name
          successButtonText
          successSend
          surname
          buttonText
          telephone
          theme
          comment
          fewWordsAboutMyself
          mail
          contactEmail
          contactEmailLabel
          prEmail
          prEmailLabel
          title
          vacancyRespondHeader
          vacancyRespondTitle
        }
      }
    }
  }
`;

const RespondForm = () => {
    const data = useStaticQuery(query);
    const [isRecaptchaConfirmed, setIsRecaptchaConfirmed] = useState(true);
    const [isSended, setIsSended] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [onTop, setSendToTop] = useState(false);
    const { isPopupVisible, setIsPopupVisible, vacancyTitle, huntflowId, setVacancyTitle, setHuntflowId, isRespondFormVisible, setIsRespondFormVisible } = useContext(appContext);
    const cn = useClassnames(style);
    const timeoutId = useRef<number>();
    const recaptchaInstance = useRef<Recaptcha | null>();

    const { consent,
        telephone,
        vacancyRespondHeader,
        email,
        mail,
        errorButtonText,
        contactEmailLabel,
        contactEmail,
        prEmailLabel,
        prEmail,
        title,
        errorSend,
        experience,
        file,
        header,
        locale,
        name,
        fewWordsAboutMyself,
        theme,
        successButtonText,
        successSend,
        buttonText,
        vacancyRespondTitle,
        surname } = data.allStrapiRespondForm.edges[0].node;

    const context = useForm({
        mode            : 'onSubmit',
        reValidateMode  : 'onChange',
        shouldFocusError: true,
        defaultValues   : {}
    });

    const closeHandler = () => {
        setVacancyTitle('');
        setHuntflowId('');
        setIsPopupVisible(false);
        setIsRespondFormVisible(false);
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

    const outsideClickHandler = useCallback((e) => {
        if(isPopupVisible && !e.target.closest('.respond-form') && !e.target.classList.contains('ui-select__option')) {
            closeHandler();
        }
    }, [isPopupVisible]);

    useEffect(() => {
        window.addEventListener('click', outsideClickHandler);

        return () => {
            window.removeEventListener('click', outsideClickHandler);
        };
    });

    const preventClosePopup = useCallback((e) => {
        e.stopPropagation();

        if(timeoutId) {
            clearTimeout(timeoutId.current);
        }

        setIsSended(false);
        setIsError(false);
        setIsPopupVisible(false);
        setIsRespondFormVisible(false);
        context.reset();
    }, [timeoutId]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        const formData = new FormData();
        const fileInput = document.querySelector('#file');
        const file = data.file[0] || fileInput?.files[0];
        const base64 = file ? await toBase64(file) : null;

        if(vacancyTitle) {
            formData.append('vacancy', vacancyTitle);
        }

        if(huntflowId) {
            formData.append('huntflowId', huntflowId);
        }

        for(const name in data) {
            if(data[name]) {
                if(name === 'file' && base64) {
                    formData.append('content', base64);
                    formData.append('filename', file.name);
                } else {
                    formData.append(name, data[name]);
                }
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
                    setIsPopupVisible(false);
                }, 3000);
            }
        } catch(err) {
            setIsSended(true);
            setIsError(true);
            setIsLoading(false);
            setIsPopupVisible(true);
        }
    };

    const verifyCallback = useCallback(() => {
        setIsRecaptchaConfirmed(true);
    }, []);

    if(!isPopupVisible) {
        return null;
    }

    return (
        <FormProvider {...context}>
            <form
                onSubmit={context.handleSubmit(onSubmit)} className={cn('respond-form', {
                    'respond-form_visible': isPopupVisible,
                    'respond-form_top'    : onTop,
                    'respond-form_sended' : isSended,
                    'respond-form_error'  : isError
                })}
            >
                {isSended ? (
                    <div
                        className={cn('respond-form__send-block')} onClick={preventClosePopup}
                    >
                        <div className={cn('text-block')}>
                            <h1 className={cn('text-block__title', { 'text-block__title_error': isError })}>{isError ? toUnescapedHTML(errorSend) : successSend}</h1>
                        </div>
                        <div
                            className={cn('respond-form__close-btn')} onClick={preventClosePopup}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.80852 17.4881C0.417995 17.8786 0.417995 18.5118 0.80852 18.9023C1.19904 19.2928 1.83221 19.2928 2.22273 18.9023L10.0009 11.1241L17.7791 18.9023C18.1696 19.2928 18.8028 19.2928 19.1933 18.9023C19.5838 18.5118 19.5838 17.8786 19.1933 17.4881L11.4151 9.70989L19.1933 1.93172C19.5838 1.54119 19.5838 0.908027 19.1933 0.517502C18.8028 0.126978 18.1696 0.126979 17.7791 0.517503L10.0009 8.29568L2.22273 0.517503C1.83221 0.126979 1.19904 0.126979 0.808518 0.517503C0.417994 0.908028 0.417994 1.54119 0.808519 1.93172L8.58669 9.70989L0.80852 17.4881Z" fill={isError ? '#FFFFFF' : '#1F272E'} />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
                        <div className={cn('respond-form__close-btn')} onClick={closeHandler}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.80852 17.4881C0.417995 17.8786 0.417995 18.5118 0.80852 18.9023C1.19904 19.2928 1.83221 19.2928 2.22273 18.9023L10.0009 11.1241L17.7791 18.9023C18.1696 19.2928 18.8028 19.2928 19.1933 18.9023C19.5838 18.5118 19.5838 17.8786 19.1933 17.4881L11.4151 9.70989L19.1933 1.93172C19.5838 1.54119 19.5838 0.908027 19.1933 0.517502C18.8028 0.126978 18.1696 0.126979 17.7791 0.517503L10.0009 8.29568L2.22273 0.517503C1.83221 0.126979 1.19904 0.126979 0.808518 0.517503C0.417994 0.908028 0.417994 1.54119 0.808519 1.93172L8.58669 9.70989L0.80852 17.4881Z" fill="#2E3840" />
                            </svg>
                        </div>
                        {!isRespondFormVisible ? (
                            <div className={cn('text-block')}>
                                <h1 className={cn('text-block__header')}>{header}</h1>
                                <p className={cn('text-block__title')}>{title}</p>
                                <p className={cn('text-block__pr-email-label')}>{prEmailLabel}</p>
                                <p className={cn('text-block__pr-email')}>{prEmail}</p>
                                <p className={cn('text-block__contact-email-label')}>{contactEmailLabel}</p>
                                <p className={cn('text-block__contact-email')}>{contactEmail}</p>
                            </div>
                        ) : (
                            <div className={cn('text-block')}>
                                <h1 className={cn('text-block__header')}>{toUnescapedHTML(vacancyRespondHeader)}</h1>
                                <p className={cn('text-block__respond-vacancy-title')}>{vacancyTitle}</p>
                            </div>
                        )}
                        <div className={cn('right-block')}>
                            <div className={cn('right-block__inputs')}>
                                <div className={cn('right-block__top-section')}>
                                    <div className={cn('right-block__field-wrapper')}>
                                        <Input type="text" placeholder={name} name="name" autocomplete="off" pattern={/^[А-Яа-яЁёA-Za-z\s-]+$/i} requiredValidation={true} />
                                    </div>
                                    <div className={cn('right-block__field-wrapper')}>
                                        <Input type="text" placeholder={surname} name="surname" autocomplete="off" pattern={/^[А-Яа-яЁёA-Za-z\s-]+$/i} requiredValidation={true} />
                                    </div>
                                </div>
                                <div className={cn('right-block__bottom-section')}>
                                    <div className={cn('right-block__field-wrapper', 'right-block__field-email')}>
                                        <Input type={isRespondFormVisible ? 'email' : 'text'} placeholder={isRespondFormVisible ? mail : theme} name={isRespondFormVisible ? mail : theme} autocomplete="off" requiredValidation={true} pattern={isRespondFormVisible ? /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g : null} />
                                    </div>
                                    {isRespondFormVisible ? (
                                        <div className={cn('right-block__field-wrapper', 'right-block__field-email')}>
                                            <Input type="tel" placeholder={telephone} name="telephone" requiredValidation={true} />
                                        </div>) : null}
                                </div>
                            </div>
                            <div className={cn('right-block__textarea-wrapper')}>
                                <Textarea name="textarea" placeholder={isRespondFormVisible ? fewWordsAboutMyself : experience} requiredValidation={true} />
                            </div>
                            <div className={cn('right-block__checkbox-wrapper')}>
                                <CheckBox name="acception" requiredValidation={true} label={consent} />
                            </div>
                            <div className={cn('right-block__button-section')}>
                                <div className={cn('right-block__field-wrapper')}>
                                    <Input type="file" placeholder={file} name="file" />
                                </div>
                                {isRecaptchaConfirmed ? (
                                    <div className={cn('right-block__field-wrapper')}>
                                        <Button type="submit" label={buttonText} disabled={isLoading} isLoading={isLoading} styleType="special" />
                                    </div>
                                ) : (
                                    <Recaptcha
                                        className={cn('right-block__grecaptcha')}
                                        ref={(e) => recaptchaInstance.current = e}
                                        sitekey="6LcxFCQbAAAAAPk5ZtW8P4LTJFuMUTHMh65Oap4n"
                                        render="explicit"
                                        hl={locale}
                                        verifyCallback={verifyCallback}
                                    />
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </form>
        </FormProvider>
    );
};

export default RespondForm;
