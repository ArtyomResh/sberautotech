import React, { useCallback, useRef, useState, useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Input from '../respond-form/input';
import { useClassnames } from '../../hooks/use-classnames';
import { toBase64 } from '../../utils';
import { appContext } from '../../context/context';
import { validateName } from '../../utils/validation/validateName';

import ModalForm from '../ModalForm';
import Fieldset from '../ModalForm/components/Fieldset';
import FieldWrapper from '../ModalForm/components/FieldWrapper';
import Title from '../ModalForm/components/Title';

import style from './index.css';

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
    header: string,
    prEmailLabel: string,
    prEmail: string,
    commercialProposalsEmailLabel: string,
    commercialProposalsEmail: string,
    contactEmailLabel: string,
    contactEmail: string
}

const LeftContainer = ({
    header,
    prEmailLabel,
    prEmail,
    commercialProposalsEmailLabel,
    commercialProposalsEmail,
    contactEmailLabel,
    contactEmail
}: ILeftContainerProps) => {
    const cn = useClassnames(style);

    return (
        <div className={cn('text-block')}>
            <Title>{header}</Title>

            <p className={cn('text-block__pr-email-label')}>{prEmailLabel}</p>
            <a href={`mailto:${prEmail}`} className={cn('text-block__email-link')}>
                {prEmail}
            </a>

            <p className={cn('text-block__pr-email-label')}>{commercialProposalsEmailLabel}</p>
            <a href="mailto:partners@sberautotech.ru" className={cn('text-block__email-link')}>
                {commercialProposalsEmail}
            </a>

            <p className={cn('text-block__contact-email-label')}>{contactEmailLabel}</p>
            <a href={`mailto:${contactEmail}`} className={cn('text-block__email-link')}>
                {contactEmail}
            </a>
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
            textareaName={comment}
            textareaPlaceholder={formFields.comment}
            checkboxName="acception"
            checkboxLabel={consent}
            inputFilePlaceholder={file}
            inputFileName={formFields.file}
            onFileChange={handleFileChange}
            isRecaptchaConfirmed={isRecaptchaConfirmed}
            buttonIsDisabled={isLoading}
            buttonIsLoading={isLoading}
            buttonText={buttonText}
            recaptchaHl={locale}
            recaptchaVerifyCallback={handleVerifyCallback}
            leftContainerComponent={<LeftContainer
                header={header}
                contactEmailLabel={contactEmailLabel}
                contactEmail={contactEmail}
                prEmailLabel={prEmailLabel}
                prEmail={prEmail}
                commercialProposalsEmail={commercialProposalsEmail}
                commercialProposalsEmailLabel={commercialProposalsEmailLabel}
            />}
        >
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
        </ModalForm>
    );
};
