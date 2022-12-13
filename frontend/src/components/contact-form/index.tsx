import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Recaptcha from 'react-recaptcha';
import { graphql, useStaticQuery } from 'gatsby';

import Input from '../respond-form//input';
import Textarea from '../respond-form/textarea';
import Button from '../button';
import CheckBox from '../respond-form/check-box';
import { useClassnames } from '../../hooks/use-classnames';
import { toBase64 } from '../../utils';
import { appContext } from '../../context/context';
import useDocumentScrollThrottled from '../nav/use-document-scroll-throttled';
import Alert from '../public-beta-signup/components/alert';
import InputFile from '../respond-form/inputFile';

import style from './index.css';

const FORM_URL = `${process.env.GATSBY_API_URL}/form/contact`;

const query = graphql`
  query {
    allStrapiRespondForm {
      edges {
        node {
          consent
          email
          errorButtonText
          errorSend
          file
          header
          locale
          name
          successButtonText
          successSend
          buttonText
          theme
          comment
          mail
          contactEmail
          contactEmailLabel
          prEmail
          prEmailLabel
          title
        }
      }
    }
  }
`;

export interface IContactFormData {
    name: string,
    email: string,
    subject: string,
    comment: string,
    file: string
}

const formFields: {[key in keyof IContactFormData]: key} = {
    name   : 'name',
    email  : 'email',
    subject: 'subject',
    comment: 'comment',
    file   : 'file'
};


export const ContactForm = () => {
    const data = useStaticQuery(query);
    const [isRecaptchaConfirmed, setIsRecaptchaConfirmed] = useState(true);
    const [isSended, setIsSended] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [onTop, setSendToTop] = useState(false);
    const { isContactFormVisible, setIsContactFormVisible } = useContext(appContext);
    const cn = useClassnames(style);
    const timeoutId = useRef<ReturnType<typeof setTimeout>>();
    const timeoutTime = 3000;

    const {
        consent,
        mail,
        contactEmailLabel,
        contactEmail,
        prEmailLabel,
        prEmail,
        title,
        errorSend,
        file,
        header,
        locale,
        name,
        theme,
        comment,
        successSend,
        buttonText
    } = data.allStrapiRespondForm.edges[0].node;

    const context = useForm({
        mode            : 'onSubmit',
        reValidateMode  : 'onChange',
        shouldFocusError: true,
        defaultValues   : {}
    });

    const fileRef = useRef<File | null>(null);
    const hadleFileChange = (file: File | null) => {
        fileRef.current = file;
    };

    const closeHandler = () => {
        setIsContactFormVisible?.(false);
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
        if(isContactFormVisible && !e.target.closest('.contact-form') && !e.target.classList.contains('ui-select__option')) {
            closeHandler();
        }
    }, [isContactFormVisible]);

    useEffect(() => {
        window.addEventListener('click', outsideClickHandler);

        return () => {
            window.removeEventListener('click', outsideClickHandler);
        };
    });

    const preventClosePopup = useCallback((e?: MouseEvent) => {
        e?.stopPropagation();

        if(timeoutId) {
            clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);
        }

        setIsSended(false);
        setIsError(false);
        setIsContactFormVisible?.(false);
        context.reset();
        fileRef.current = null;
    }, [timeoutId]);

    const onSubmit = async (data: IContactFormData) => {
        setIsLoading(true);
        const formData = new FormData();
        const file = fileRef.current;


        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('subject', data.subject);
        formData.append('comment', data.comment);

        if(file) {
            const base64 = await toBase64(file);

            formData.append('content', base64);
            formData.append('filename', file.name);
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
                    setIsContactFormVisible?.(false);
                }, timeoutTime);
            }
        } catch(err) {
            setIsSended(true);
            setIsError(true);
            setIsLoading(false);
            setIsContactFormVisible?.(true);
        }
    };

    const verifyCallback = useCallback(() => {
        setIsRecaptchaConfirmed(true);
    }, []);

    if(!isContactFormVisible) {
        return null;
    }

    return (
        <React.Fragment>
            {!isSended && (
                <FormProvider {...context}>
                    <form
                        onSubmit={context.handleSubmit(onSubmit)} className={cn('contact-form', {
                            'contact-form_visible': isContactFormVisible,
                            'contact-form_top'    : onTop,
                            'contact-form_sended' : isSended,
                            'contact-form_error'  : isError
                        })}
                    >
                        <div className={cn('contact-form__close-btn')} onClick={closeHandler}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.80852 17.4881C0.417995 17.8786 0.417995 18.5118 0.80852 18.9023C1.19904 19.2928 1.83221 19.2928 2.22273 18.9023L10.0009 11.1241L17.7791 18.9023C18.1696 19.2928 18.8028 19.2928 19.1933 18.9023C19.5838 18.5118 19.5838 17.8786 19.1933 17.4881L11.4151 9.70989L19.1933 1.93172C19.5838 1.54119 19.5838 0.908027 19.1933 0.517502C18.8028 0.126978 18.1696 0.126979 17.7791 0.517503L10.0009 8.29568L2.22273 0.517503C1.83221 0.126979 1.19904 0.126979 0.808518 0.517503C0.417994 0.908028 0.417994 1.54119 0.808519 1.93172L8.58669 9.70989L0.80852 17.4881Z" fill="#2E3840" />
                            </svg>
                        </div>
                        <div className={cn('text-block')}>
                            <h1 className={cn('text-block__header')}>{header}</h1>
                            <p className={cn('text-block__title-text')}>{title}</p>
                            <p className={cn('text-block__pr-email-label')}>{prEmailLabel}</p>
                            <a href={prEmail}><p className={cn('text-block__pr-email')}>{prEmail}</p></a>
                            <p className={cn('text-block__pr-email-label')}>Для предложений о сотрудничестве</p>
                            <a href="partners@sberautotech.ru"><p className={cn('text-block__pr-email')}>partners@sberautotech.ru</p></a>
                            <p className={cn('text-block__contact-email-label')}>{contactEmailLabel}</p>
                            <a href={contactEmail}><p className={cn('text-block__contact-email')}>{contactEmail}</p></a>
                        </div>

                        <div className={cn('right-block')}>
                            <div className={cn('right-block__inputs')}>
                                <div className={cn('right-block__top-section')}>
                                    <div className={cn('right-block__field-wrapper')}>
                                        <Input type="text" placeholder={name} name={formFields.name} autocomplete="off" pattern={/^[А-Яа-яЁёA-Za-z\s-]+$/i} requiredValidation={true} />
                                    </div>
                                    <div className={cn('right-block__field-wrapper')}>
                                        <Input type="email" placeholder={mail} name={formFields.email} autocomplete="off" requiredValidation={true} pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g} />
                                    </div>
                                </div>
                                <div className={cn('right-block__bottom-section')}>
                                    <div className={cn('right-block__field-wrapper', 'right-block__field-email')}>
                                        <Input type="text" placeholder={theme} name={formFields.subject} autocomplete="off" requiredValidation={true} />
                                    </div>
                                </div>
                            </div>
                            <div className={cn('right-block__textarea-wrapper')}>
                                <Textarea placeholder={comment} name={formFields.comment} requiredValidation={true} />
                            </div>
                            <div className={cn('right-block__checkbox-wrapper')}>
                                <CheckBox name="acception" requiredValidation={true} label={consent} />
                            </div>
                            <div className={cn('right-block__button-section')}>
                                <div className={cn('right-block__field-wrapper')}>
                                    <InputFile placeholder={file} name={formFields.file} onFileChange={hadleFileChange} />
                                </div>
                                {isRecaptchaConfirmed ? (
                                    <div className={cn('right-block__field-wrapper')}>
                                        <Button type="submit" disabled={isLoading} isLoading={isLoading} isBlock={true}>{buttonText}</Button>
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
