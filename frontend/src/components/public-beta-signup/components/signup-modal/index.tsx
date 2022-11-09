import { Link, l, navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { components, Props as SelectProps } from 'react-select';

import CrossIcon from '../../../../images/cross.inline.svg';
import { useClassnames } from '../../../../hooks/use-classnames';

import Heading from '../../../heading';
import Button from '../button';
import Input from '../../../respond-form/input';
import CheckBox from '../../../respond-form/check-box';
import Select from '../../../select';
import Text from '../../../text';

import styles from './index.css';
import selectStyles from './select.styles';
import { api } from '../../../../utils/api';
import { IRegistrationRequest } from '../../../../utils/api/types';


export interface ISignupFormData {
    name: string,
    email: string,
    phoneNumber: string,
    district: 'krylatskoye' | 'other',
    mobileOS: 'ios' | 'android' | 'other',
    eighteen: boolean,
    policy: boolean
}

const formFields: {[key in keyof ISignupFormData]: key} = {
    name       : 'name',
    email      : 'email',
    phoneNumber: 'phoneNumber',
    district   : 'district',
    mobileOS   : 'mobileOS',
    eighteen   : 'eighteen',
    policy     : 'policy'
};

const districtOptions: Array<{value: ISignupFormData['district'], label: string}> = [
    { value: 'krylatskoye', label: 'В Крылатском' },
    { value: 'other', label: 'В другом' }
];

const mobileOsOptions: Array<{value: ISignupFormData['mobileOS'], label: string}> = [
    { value: 'ios', label: 'iOS' },
    { value: 'android', label: 'Android' }
];

interface IProps {
    onSubmit?(): void,
    onSuccess?(): void,
    onError?(): void
}

const { ValueContainer, Placeholder } = components;
const CustomValueContainer = (props: SelectProps['ValueContainer']) => {
    return (
        <ValueContainer {...props}>
            <Placeholder {...props} isFocused={props.isFocused}>
                {props.selectProps.placeholder}
            </Placeholder>
            {React.Children.map(props.children, (child) => (child && child.type !== Placeholder ? child : null)
            )}
        </ValueContainer>
    );
};


const SignupModal = (props: IProps) => {
    const cn = useClassnames(styles);
    const methods = useForm<ISignupFormData>({
        mode: 'onSubmit'
    });
    const [visible, setVisible] = useState<boolean>(typeof window !== 'undefined' && window.location.hash === '#modal');
    const closeModal = () => {
        setVisible(false);
    };
    const handleSubmit = async (data: ISignupFormData) => {
        const request: IRegistrationRequest = {
            username                           : data.name,
            phone_number                       : data.phoneNumber,
            email                              : data.email,
            residence_area                     : data.district,
            phone_model                        : data.mobileOS,
            is_adult                           : data.eighteen,
            is_processing_personal_data_allowed: data.policy
        };

        try {
            await api.registrationForBeta(request);
            closeModal();
            void navigate('/public-beta-signup');
            props.onSuccess?.();
        } catch{
            props.onError?.();
        }
    };

    useEffect(() => {
        const handler = () => {
            setVisible(window.location.hash === '#modal');
        };

        window.addEventListener('hashchange', handler);

        return function cleanup() {
            window.removeEventListener('hashchange', handler);
        };
    }, [setVisible]);

    useEffect(
        () => {
            if(visible) {
                window.document.body.style.overflowY = 'hidden';
            } else {
                window.document.body.style.overflowY = 'auto';
            }

            return function cleanup() {
                window.document.body.style.overflowY = 'auto';
            };
        },
        [visible]);

    return visible ? (
        <div className={cn('signup-modal__overlay')}>
            <div className={cn('signup-modal')}>
                <Link onClick={closeModal} to="/public-beta-signup" className={cn('signup-modal__button-close')}>
                    <CrossIcon />
                </Link>

                <div className={cn('signup-modal__description')}>
                    <Heading
                        className={cn('signup-modal__description-title')}
                        level={1}
                        as="h2"
                        dangerouslySetInnerHTML={{ __html: 'Заполните информацию о&nbsp;себе, мы&nbsp;скоро вернемся.' }}
                    />

                    <Text size={4} as="p" className={cn('signup-modal__description-paragraph')}>
                        В&nbsp;рамках тестирования мы&nbsp;проводим несколько поездок ежедневно, поэтому будем приглашать участников
                        небольшими группами.
                        <br /><br />
                        Когда вы&nbsp;попадете в&nbsp;тестовую группу, вам на&nbsp;почту придет ссылка на&nbsp;приложение. Не&nbsp;забудьте проверить
                        папку &laquo;Спам&raquo;!
                        <br /><br />
                        В&nbsp;приложении есть возможность выбрать точки&nbsp;А и&nbsp;Б на&nbsp;маршруте&nbsp;&mdash; заберем в&nbsp;нужном месте и&nbsp;отвезем,
                        куда захотите.
                    </Text>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit<ISignupFormData>(handleSubmit)} className={cn('signup-modal__form')}>
                        <Input
                            className={cn('signup-modal__form-field', 'signup-modal__form-field_full-width')}
                            type="text"
                            placeholder="Как вас зовут?"
                            name={formFields.name}
                            requiredValidation=""
                        />
                        <Input
                            className={cn('signup-modal__form-field')}
                            type="email"
                            placeholder="Электронная почта"
                            name={formFields.email}
                            requiredValidation=""
                        />

                        <Input
                            className={cn('signup-modal__form-field')}
                            type="tel"
                            placeholder="Номер телефона"
                            name={formFields.phoneNumber}
                            requiredValidation=""
                        />


                        <div className={cn('signup-modal__form-field')}>
                            <Select
                                options={districtOptions}
                                placeholder="В каком районе вы живете?"
                                name={formFields.district}
                                requiredValidation=""
                                styles={selectStyles}
                                components={{
                                    ValueContainer: CustomValueContainer
                                }}
                            />
                        </div>
                        <div className={cn('signup-modal__form-field')}>
                            <Select
                                options={mobileOsOptions}
                                placeholder="ОС на вашем телефоне"
                                name={formFields.mobileOS}
                                requiredValidation=""
                                styles={selectStyles}
                                components={{
                                    ValueContainer: CustomValueContainer
                                }}
                            />
                        </div>

                        <CheckBox
                            className={cn(
                                'signup-modal__form-field',
                                'signup-modal__form-field_checkbox',
                                'signup-modal__form-field_full-width'
                            )}
                            label={(
                                <Text size={4} as="p">
                                    Мне исполнилось 18&#160;лет
                                </Text>
                            )}
                            name={formFields.eighteen}
                            isBlock={true}
                        />

                        <CheckBox
                            className={cn(
                                'signup-modal__form-field',
                                'signup-modal__form-field_checkbox',
                                'signup-modal__form-field_full-width'
                            )}
                            label={(
                                <Text size={4} as="p">
                                    Даю согласие на&#160;обработку моих персональных данных в&#160;соответствии с&#160;политикой конфиденциальности и&#160;на&#160;участие в&#160;эксперименте
                                </Text>
                            )}
                            name={formFields.policy}
                            isBlock={true}
                        />

                        <Button type="submit" className={cn('signup-modal__submit')} isBlock={true}>
                            Отправить
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    ) : null;
};

export default SignupModal;
