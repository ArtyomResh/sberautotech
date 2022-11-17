import { Link, navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { components, Props as SelectProps } from 'react-select';
import { useLocation } from '@reach/router';


import { YM_ID } from '../../../../constants';
import CrossIcon from '../../../../images/cross.inline.svg';
import { useClassnames } from '../../../../hooks/use-classnames';
import { api } from '../../../../utils/api';
import { IRegistrationRequest } from '../../../../utils/api/types';

import Heading from '../../../heading';
import Button from '../button';
import Input from '../../../respond-form/input';
import CheckBox from '../../../respond-form/check-box';
import Select from '../../../select';
import Text from '../../../text';

import styles from './index.css';
import selectStyles from './select.styles';
import { UpdateOnMount } from '../../../update-on-mount';

interface IMobileOption {
    value: 'ios' | 'android', label: string
}
interface IDsitrictOption {
    value: 'krylatskoye' | 'other', label: string
}

export interface ISignupFormData {
    name: string,
    email: string,
    phoneNumber: string,
    district: IDsitrictOption | undefined,
    mobileOS: IMobileOption | undefined,
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

const districtOptions: Array<IDsitrictOption> = [
    { value: 'krylatskoye', label: 'В Крылатском' },
    { value: 'other', label: 'В другом' }
];


const mobileOsOptions: Array<IMobileOption> = [
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
    const location = useLocation();
    const cn = useClassnames(styles);
    const methods = useForm<ISignupFormData>({
        mode: 'onSubmit'
    });

    const [isVisible, setIsVisible] = useState<boolean>(location.hash === '#modal');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const closeModal = () => {
        setIsVisible(false);
        void navigate('/public-beta-signup');
    };

    const handleSubmit = async (data: ISignupFormData) => {
        if(isSubmitting) {
            return;
        }
        const request: IRegistrationRequest = {
            username                           : data.name,
            phone_number                       : data.phoneNumber,
            email                              : data.email,
            residence_area                     : data.district?.value || 'other',
            phone_model                        : data.mobileOS?.value || 'other',
            is_adult                           : data.eighteen,
            is_processing_personal_data_allowed: data.policy
        };

        // @ts-expect-error: ym подставляется только при NODE_ENV === 'production'
        typeof ym !== 'undefined' && ym(YM_ID, 'reachGoal', 'click--button--otparvit');

        try {
            setIsSubmitting(true);
            await api.registrationForBeta(request);
            closeModal();
            props.onSuccess?.();
        } catch{
            props.onError?.();
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        setIsVisible(location.hash === '#modal');
    }, [setIsVisible, location.hash]);

    useEffect(
        () => {
            if(isVisible) {
                window.document.body.style.overflowY = 'hidden';
            } else {
                window.document.body.style.overflowY = 'auto';
            }

            return function cleanup() {
                window.document.body.style.overflowY = 'auto';
            };
        },
        [isVisible]
    );

    return (
        <UpdateOnMount>
            <div className={cn('signup-modal__overlay', { 'signup-modal__overlay_visible': isVisible })}>
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
                                requiredValidation={true}
                            />
                            <Input
                                className={cn('signup-modal__form-field')}
                                type="email"
                                placeholder="Электронная почта"
                                name={formFields.email}
                                requiredValidation={true}
                            />

                            <Input
                                className={cn('signup-modal__form-field')}
                                type="tel"
                                placeholder="Номер телефона"
                                name={formFields.phoneNumber}
                                requiredValidation={true}
                            />


                            <div className={cn('signup-modal__form-field')}>
                                <Select
                                    options={districtOptions}
                                    placeholder="В каком районе вы живете?"
                                    name={formFields.district}
                                    required={true}
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
                                    styles={selectStyles}
                                    required={true}
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
                                requiredValidation={true}
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
                                requiredValidation={true}
                            />

                            <Button type="submit" className={cn('signup-modal__submit')} isBlock={true} isLoading={isSubmitting}>
                                Отправить
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </UpdateOnMount>
    );
};

export default SignupModal;
