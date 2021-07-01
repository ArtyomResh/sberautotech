import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Recaptcha from 'react-recaptcha';

import Input from './input';
import Select from '../select';
import Textarea from './textarea';
import Button from '../button';
import CheckBox from './check-box';
import { useClassnames } from '../../hooks/use-classnames';
import { toBase64 } from '../../utils';
import { appContext } from '../../context/context';

import style from './index.css';
import { graphql, useStaticQuery } from 'gatsby';

const options = [
    { value: 'Product', label: 'Product' },
    { value: 'Development', label: 'Development' },
    { value: 'HR', label: 'HR' },
    { value: 'Design', label: 'Design' }
];

const HOST = process.env.API_URL || '';
const FORM_URL = `${HOST}/form`;


const query = graphql`
  query {
    allStrapiRespondForm {
      edges {
        node {
          consent
          direction
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
        }
      }
    }
  }
`;

const RespondForm = () => {
    const data = useStaticQuery(query);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isRecaptchaConfirmed, setIsRecaptchaConfirmed] = useState(false);
    const [isSended, setIsSended] = useState(false);
    const [isError, setIsError] = useState(false);
    const { isPopupVisible, setIsPopupVisible } = useContext(appContext);
    const cn = useClassnames(style);
    const timeoutId = useRef<number>();
    const recaptchaInstance = useRef<Recaptcha | null>();

    const { consent,
        direction,
        email,
        errorButtonText,
        errorSend,
        experience,
        file,
        header,
        locale,
        name,
        successButtonText,
        successSend,
        buttonText,
        surname } = data.allStrapiRespondForm.edges[0].node;

    const context = useForm({
        mode            : 'onSubmit',
        reValidateMode  : 'onChange',
        shouldFocusError: true,
        defaultValues   : {}
    });

    const outsideClickHandler = useCallback((e) => {
        if(isPopupVisible && !e.target.closest('.respond-form') && !e.target.classList.contains('ui-select__option')) {
            setIsPopupVisible(false);
        }
    }, [isPopupVisible]);

    useEffect(() => {
        window.addEventListener('click', outsideClickHandler);

        return () => {
            window.removeEventListener('click', outsideClickHandler);
        };
    });

    const closeHandler = () => {
        return setIsPopupVisible(false);
    };

    const preventClosePopup = useCallback((e) => {
        e.stopPropagation();

        if(timeoutId) {
            clearTimeout(timeoutId.current);
        }

        setIsSended(false);
        setIsSubmitDisabled(false);
        setIsPopupVisible(true);
        context.reset();
    }, [timeoutId]);

    const onSubmit = async (data) => {
        setIsSubmitDisabled(true);

        console.log(data);


        const formData = new FormData();
        const fileInput = document.querySelector('#file');
        const file = data.file[0] || fileInput?.files[0];
        const base64 = await toBase64(file);


        for(const name in data) {
            if(data[name]) {
                if(name === 'direction') {
                    formData.append(name, data[name].label);
                } else if(name === 'file') {
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

                timeoutId.current = setTimeout(() => {
                    setIsSended(false);
                    setIsPopupVisible(false);
                    setIsSubmitDisabled(false);
                }, 3000);
            }
        } catch(err) {
            setIsSended(true);
            setIsError(true);
            setIsSubmitDisabled(false);

            console.error(err);
        }
    };

    const verifyCallback = useCallback(() => {
        setIsRecaptchaConfirmed(true);
    }, []);

    if(!isPopupVisible) {
        return <React.Fragment></React.Fragment>;
    }

    return (
        <FormProvider {...context}>
            <form
                onSubmit={context.handleSubmit(onSubmit)} className={cn('respond-form', {
                    'respond-form_visible': isPopupVisible
                })}
            >
                {isSended ? (
                    <div className={cn('respond-form__send-block')}>
                        <div className={cn('text-block')}>
                            <h1 className={cn('text-block__title')}>{isError ? errorSend : successSend}</h1>
                        </div>
                        <div className={cn('right-block')}>
                            <Button type="button" onClick={preventClosePopup} label={isError ? errorButtonText : successButtonText} />
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
                        <div className={cn('respond-form__close-btn')} onClick={closeHandler}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.80852 17.4881C0.417995 17.8786 0.417995 18.5118 0.80852 18.9023C1.19904 19.2928 1.83221 19.2928 2.22273 18.9023L10.0009 11.1241L17.7791 18.9023C18.1696 19.2928 18.8028 19.2928 19.1933 18.9023C19.5838 18.5118 19.5838 17.8786 19.1933 17.4881L11.4151 9.70989L19.1933 1.93172C19.5838 1.54119 19.5838 0.908027 19.1933 0.517502C18.8028 0.126978 18.1696 0.126979 17.7791 0.517503L10.0009 8.29568L2.22273 0.517503C1.83221 0.126979 1.19904 0.126979 0.808518 0.517503C0.417994 0.908028 0.417994 1.54119 0.808519 1.93172L8.58669 9.70989L0.80852 17.4881Z" fill="#2E3840" />
                            </svg>
                        </div>
                        <div className={cn('text-block')}>
                            <h1 className={cn('text-block__title')}>{header}</h1>
                        </div>
                        <div className={cn('right-block')}>
                            <div className={cn('right-block__inputs')}>
                                <div className={cn('right-block__top-section')}>
                                    <div className={cn('right-block__field-wrapper')}>
                                        <Input type="text" placeholder={name} name="name" autocomplete="off" pattern={/^[А-Яа-яЁёA-Za-z]+$/i} requiredValidation={true} />
                                    </div>
                                    <div className={cn('right-block__field-wrapper')}>
                                        <Input type="text" placeholder={surname} name="surname" autocomplete="off" pattern={/^[А-Яа-яЁёA-Za-z]+$/i} requiredValidation={true} />
                                    </div>
                                </div>
                                <div className={cn('right-block__bottom-section')}>
                                    <div className={cn('right-block__field-wrapper')}>
                                        <Input type="text" placeholder={email} name="email" autocomplete="off" pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g} requiredValidation={true} />
                                    </div>
                                    <div className={cn('right-block__field-wrapper')}>
                                        <Select name="direction" placeholder={direction} options={options} />
                                    </div>
                                </div>
                            </div>
                            <div className={cn('right-block__textarea-wrapper')}>
                                <Textarea name="textarea" placeholder={experience} requiredValidation={true} />
                            </div>
                            <div className={cn('right-block__checkbox-wrapper')}>
                                <CheckBox name="acception" requiredValidation={true} label={consent} />
                            </div>
                            <div className={cn('right-block__button-section')}>
                                <div className={cn('right-block__field-wrapper')}>
                                    <Input type="file" placeholder={file} name="file" requiredValidation={true} />
                                </div>
                                {/* {isRecaptchaConfirmed ? ( */}
                                <div className={cn('right-block__field-wrapper')}>
                                    <Button type="submit" label={buttonText} styleType="secondary" />
                                </div>
                                {/* ) : (
                                    <Recaptcha
                                        className={cn('right-block__grecaptcha')}
                                        ref={(e) => recaptchaInstance.current = e}
                                        sitekey="6LcxFCQbAAAAAPk5ZtW8P4LTJFuMUTHMh65Oap4n"
                                        render="explicit"
                                        hl={locale}
                                        verifyCallback={verifyCallback}
                                    />
                                )} */}
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </form>
        </FormProvider>
    );
};

export default RespondForm;
