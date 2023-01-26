import React, { useCallback, useRef, useState, useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { appContext } from '../../context/context';
import { useClassnames } from '../../hooks/use-classnames';
import { toBase64 } from '../../utils';
import { isRu } from '../../utils/locale';
import { validateName } from '../../utils/validation/validateName';

import Button from '../button-like/button';
import Input from '../Input';
import FieldsContainer from '../ModalForm/components/FieldsContainer';
import Fieldset from '../ModalForm/components/Fieldset';
import FieldWrapper from '../ModalForm/components/FieldWrapper';
import ModalForm from '../ModalForm';
import Recaptcha from '../ModalForm/components/Recaptcha';

import style from './index.css';
import Textarea from '../Textarea';
import Text from '../text';
import CheckBox from '../Checkbox';
import InputFile from '../InputFile';

const FORM_URL = '/form/contact';

const query = graphql`
  query {
    allStrapiRespondForm {
      edges {
        node {
          consent
          errorContactSend
          file
          header
          locale
          name
          successContactSend
          buttonText
          theme
          comment
          mail
          contactEmail
          contactEmailLabel
          commercialProposalsEmail
          commercialProposalsEmailLabel
          prEmail
          prEmailLabel
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

interface ILeftContainerProps {
    prEmailLabel: string,
    prEmail: string,
    commercialProposalsEmailLabel: string,
    commercialProposalsEmail: string,
    contactEmailLabel: string,
    contactEmail: string
}

const LeftContainer = ({
    prEmailLabel,
    prEmail,
    commercialProposalsEmailLabel,
    commercialProposalsEmail,
    contactEmailLabel,
    contactEmail
}: ILeftContainerProps) => {
    const cn = useClassnames(style);

    return (
        <div className={cn('contact-form__left-container')}>
            {isRu && (
                <div className={cn('contact-form__left-container-emails')}>
                    <Text className={cn('contact-form__pr-email-label')} size={4} as="h4">
                        {prEmailLabel}
                    </Text>
                    <div className={cn('contact-form__email-link')}>
                        <a href={`mailto:${prEmail}`} >
                            <Text size={3}>
                                {prEmail}
                            </Text>
                        </a>
                    </div>


                    <Text className={cn('contact-form__pr-email-label')} size={4} as="h4">
                        {commercialProposalsEmailLabel}
                    </Text>
                    <div className={cn('contact-form__email-link')}>
                        <a href="mailto:partners@sberautotech.ru" >
                            <Text size={3}>
                                {commercialProposalsEmail}
                            </Text>

                        </a>
                    </div>


                    <Text className={cn('contact-form__pr-email-label')} size={4} as="h4">
                        {contactEmailLabel}
                    </Text>
                    <div className={cn('contact-form__email-link')}>
                        <a href={`mailto:${contactEmail}`}>
                            <Text size={3}>
                                {contactEmail}
                            </Text>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export const ContactForm = () => {
    const data = useStaticQuery(query);
    const [isRecaptchaConfirmed, setIsRecaptchaConfirmed] = useState(true);
    const [isSended, setIsSended] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { isContactFormVisible, setIsContactFormVisible } = useContext(appContext);
    const cn = useClassnames(style);
    const timeoutId = useRef<ReturnType<typeof setTimeout>>();
    const timeoutTime = 3000;
    const formFields: {[key in keyof IContactFormData]: key} = {
        name   : 'name',
        email  : 'email',
        subject: 'subject',
        comment: 'comment',
        file   : 'file'
    };

    const {
        consent,
        mail,
        header,
        contactEmailLabel,
        contactEmail,
        prEmailLabel,
        prEmail,
        commercialProposalsEmail,
        commercialProposalsEmailLabel,
        errorContactSend,
        file,
        locale,
        name,
        theme,
        comment,
        successContactSend,
        buttonText
    } = data.allStrapiRespondForm.edges[0].node;

    const fileRef = useRef<File | null>(null);

    const handleResetFormState = useCallback((e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.stopPropagation();

        if(timeoutId) {
            clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);
        }

        setIsSended(false);
        setIsError(false);
        fileRef.current = null;
    }, [timeoutId]);


    const handleClickOutside = useCallback((e) => {
        if(isContactFormVisible && !e?.target?.closest('.contact-form') && !e?.target?.classList?.contains('ui-select__option')) {
            handleResetFormState();
        }
    }, [isContactFormVisible, handleResetFormState]);


    const handleSubmit = async (data: Record<string, string>) => {
        setIsLoading(true);
        const formData = new FormData();
        const file = fileRef.current;


        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('subject', data.subject);
        formData.append('comment', data.comment);

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

    const handleFileChange = (file: File | null) => {
        fileRef.current = file;
    };

    const handleVerifyCallback = () => setIsRecaptchaConfirmed(true);

    if(!isContactFormVisible) {
        return null;
    }

    return (
        <ModalForm
            className={cn('contact-form')}
            onSubmit={handleSubmit}
            isSended={isSended}
            alertType={isError ? 'error' : 'success'}
            alertText={isError ? errorContactSend : successContactSend}
            onOutsideClick={handleClickOutside}
            onCloseAlertClick={handleResetFormState}
            isFormVisible={isContactFormVisible}
            setIsFormVisible={setIsContactFormVisible}
            title={header}
            leftContainerComponent={<LeftContainer
                contactEmailLabel={contactEmailLabel}
                contactEmail={contactEmail}
                prEmailLabel={prEmailLabel}
                prEmail={prEmail}
                commercialProposalsEmail={commercialProposalsEmail}
                commercialProposalsEmailLabel={commercialProposalsEmailLabel}
            />}
        >
            <FieldsContainer>
                <Fieldset legend="Данные пользователя">
                    <FieldWrapper>
                        <Input
                            type="text"
                            placeholder={name}
                            name={formFields.name}
                            autocomplete="off"
                            pattern={validateName}
                            requiredValidation={true}
                        />
                    </FieldWrapper>

                    <FieldWrapper>
                        <Input
                            type="email"
                            placeholder={mail}
                            name={formFields.email}
                            autocomplete="off"
                            requiredValidation={true}
                        />
                    </FieldWrapper>
                </Fieldset>

                <Fieldset legend="Тема обращения">
                    <FieldWrapper isBlock={true}>
                        <Input
                            type="text"
                            placeholder={theme}
                            name={formFields.subject}
                            autocomplete="off"
                            requiredValidation={true}
                        />
                    </FieldWrapper>
                </Fieldset>

                <Textarea
                    className={cn('contact-form__textarea')}
                    name={formFields.comment}
                    placeholder={comment}
                    requiredValidation={true}
                />

                <CheckBox
                    name="acception"
                    label={consent}
                    isBlock={true}
                    requiredValidation={true}
                />

                <div className={cn('contact-form__buttons')}>
                    <FieldWrapper>
                        <InputFile
                            placeholder={file}
                            name="file"
                            onFileChange={handleFileChange}
                        />
                    </FieldWrapper>


                    {isRecaptchaConfirmed ? (
                        <FieldWrapper>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                isLoading={isLoading}
                                isBlock={true}
                            >
                                {buttonText}
                            </Button>
                        </FieldWrapper>
                    ) : (
                        <Recaptcha
                            hl={locale}
                            verifyCallback={handleVerifyCallback}
                        />
                    )}
                </div>
            </FieldsContainer>

        </ModalForm>
    );
};

export default ContactForm;