import React, { useCallback, useRef, useState, useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { useClassnames } from '../../hooks/use-classnames';
import { toBase64, toUnescapedHTML } from '../../utils';
import { appContext } from '../../context/context';
import { validateName } from '../../utils/validation/validateName';

import ModalForm from '../ModalForm';
import Fieldset from '../ModalForm/components/Fieldset';
import FieldWrapper from '../ModalForm/components/FieldWrapper';
import Title from '../ModalForm/components/Title';

import Input from './input';
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

export interface IRightContainerProps {
    vacancyRespondHeader: string,
    vacancyTitle: string
}

const RightContainer = ({
    vacancyRespondHeader,
    vacancyTitle
}: IRightContainerProps) => {
    const cn = useClassnames(style);

    return (
        <div className={cn('text-block')}>
            <Title>{toUnescapedHTML(vacancyRespondHeader)}</Title>
            <p className={cn('text-block__respond-vacancy-title')}>{vacancyTitle}</p>
        </div>
    );
};

const RespondForm = () => {
    const data = useStaticQuery(query);
    const [isRecaptchaConfirmed, setIsRecaptchaConfirmed] = useState(true);
    const [isSended, setIsSended] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { vacancyTitle, huntflowId, setVacancyTitle, setHuntflowId, isRespondFormVisible, setIsRespondFormVisible } = useContext(appContext);
    const cn = useClassnames(style);
    const timeoutId = useRef<ReturnType<typeof setTimeout>>();
    const timeoutTime = 3000;
    const formFields: {[key in keyof IRespondFormData]: key} = {
        name       : 'name',
        surname    : 'surname',
        email      : 'email',
        telephone  : 'telephone',
        aboutMyself: 'aboutMyself',
        file       : 'file'
    };

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

    const fileRef = useRef<File | null>(null);

    const handleResetFormState = useCallback((e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.stopPropagation();

        if(timeoutId) {
            clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);
        }

        setVacancyTitle?.('');
        setHuntflowId?.('');
        setIsSended(false);
        setIsError(false);
        setIsRespondFormVisible?.(false);
        fileRef.current = null;
    }, [timeoutId]);


    const handleClickOutside = useCallback((e) => {
        if(isRespondFormVisible && !e?.target?.closest('.respond-form') && !e?.target?.classList?.contains('ui-select__option')) {
            handleResetFormState();
        }
    }, [isRespondFormVisible, handleResetFormState]);


    const handleSubmit = async (data: Record<string, string>) => {
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

    const handleFileChange = (file: File | null) => {
        fileRef.current = file;
    };

    const handleVerifyCallback = useCallback(() => {
        setIsRecaptchaConfirmed(true);
    }, []);

    if(!isRespondFormVisible) {
        return null;
    }

    return (
        <ModalForm
            className={cn('respond-form')}
            onSubmit={handleSubmit}
            isSended={isSended}
            alertType={isError ? 'error' : 'success'}
            alertText={isError ? errorSend : successSend}
            onOutsideClick={handleClickOutside}
            onCloseAlertClick={handleResetFormState}
            isFormVisible={isRespondFormVisible}
            setIsFormVisible={setIsRespondFormVisible}
            textareaName={formFields.aboutMyself}
            textareaPlaceholder={fewWordsAboutMyself}
            checkboxName="acception"
            checkboxLabel={consent}
            inputFilePlaceholder={file}
            inputFileName="file"
            onFileChange={handleFileChange}
            isRecaptchaConfirmed={isRecaptchaConfirmed}
            buttonIsDisabled={isLoading}
            buttonIsLoading={isLoading}
            buttonText={buttonText}
            recaptchaHl={locale}
            recaptchaVerifyCallback={handleVerifyCallback}
            rightContainerComponent={<RightContainer
                vacancyTitle={vacancyTitle}
                vacancyRespondHeader={vacancyRespondHeader}
            />}
        >
            <Fieldset legend="ФИО">
                <FieldWrapper>
                    <Input type="text" placeholder={name} name={formFields.name} autocomplete="off" pattern={validateName} requiredValidation={true} />
                </FieldWrapper>

                <FieldWrapper>
                    <Input type="text" placeholder={surname} name={formFields.surname} autocomplete="off" requiredValidation={true} pattern={validateName} />
                </FieldWrapper>
            </Fieldset>

            <Fieldset legend="Контактные данные пользователя">
                <FieldWrapper isBlock={true}>
                    <Input type="text" placeholder={mail} name={formFields.email} autocomplete="off" requiredValidation={true} />
                </FieldWrapper>

                <FieldWrapper isBlock={true}>
                    <Input type="tel" placeholder={telephone} name={formFields.telephone} requiredValidation={true} />
                </FieldWrapper>
            </Fieldset>
        </ModalForm >
    );
};

export default RespondForm;
