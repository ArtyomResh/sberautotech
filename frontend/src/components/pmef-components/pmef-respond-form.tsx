import React, { useState, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Button from '../button';
import CheckBox from '../respond-form/check-box';
import Input from '../respond-form/input';
import Textarea from '../respond-form/textarea';

import IconClose from '../../images/pmef/icon-cls.inline.svg';

import { useClassnames } from '../../hooks/use-classnames';
import { toUnescapedHTML } from '../../utils';

import style from './pmef-respond-form.css';
import policyLink from '../../../static/Согласие на участии в тестировании беспилотного ТС_AS (ПМЭФ-2022).pdf'

interface IProps {
    closeHandler: () => void
}

const PmefRespondForm = (props: IProps) => {
    const [isSended, setContentSend] = useState(false);
    const [error, setError] = useState(false);

    const FORM_URL = '/review';

    const context = useForm({
        mode: 'onSubmit'
    });

    const cn = useClassnames(style);

    const onSubmit = async () => {
        setContentSend(true);
        const data = context.getValues();

        delete data.acception;

        try {
            const res = await fetch(FORM_URL, {
                method : 'POST',
                body   : JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(res.ok) {
                console.log('sended!');
                setError(false);
            }

            if(!res.ok) {
                console.log('didnt send!');
                setError(true);
                // setContentSend(false);
            }
        } catch(err) {
            setError(true);
            // setContentSend(false);
            throw new Error(err);
        }
    };

    const errorPopup = useMemo(() => {
        if(error) {
            return (
                <div className={cn('pmef-respond-form__error-popup', {
                    'pmef-respond-form__error-popup_visible': error
                })}
                >
                    <p className={cn('pmef-respond-form__error-title')}>
                        Ваш отзыв <span>не отправлен.</span><br />
                        Попробуйте еще раз.
                    </p>
                    <div
                        className={cn('pmef-respond-form__popup-close-btn')} onClick={() => {
                            setContentSend(false);
                            setError(false);
                        }}
                    >
                        <IconClose />
                    </div>
                </div>
            );
        }

        if(isSended) {
            return (
                <div className={cn('pmef-respond-form__complete-popup')}>
                    <p className={cn('pmef-respond-form__complete-popup-title')}>
                        Ваш отзыв отправлен!<br />
                        Спасибо.
                    </p>
                    <div
                        className={cn('pmef-respond-form__complete-popup-close-btn')} onClick={() => {
                            setContentSend(false);
                            setError(false);
                        }}
                    >
                        <IconClose />
                    </div>
                </div>
            );
        }
    }, [error, isSended]);

    const respondForm = useMemo(() => {
        return (
            <form
                onSubmit={context.handleSubmit(onSubmit)}
                className={cn('pmef-respond-form__form')}
            >
                <div className={cn('pmef-respond-form__left-block')}>
                    <p className={cn('pmef-respond-form__big-title')}>Расскажите о поездке</p>
                    <p className={cn('pmef-respond-form__small-title')}>Как вам? Что понравилось, а что пошло не так?</p>
                </div>
                <div className={cn('pmef-respond-form__right-block')}>
                    <div
                        className={cn('pmef-respond-form__close-btn')} onClick={() => {
                            setContentSend(false);
                            // setError(false);
                            props?.closeHandler();
                        }}
                    >
                        <IconClose />
                    </div>
                    <div className={cn('pmef-respond-form__field-name')}>
                        <Input placeholder="ФИО" type="text" name="name" requiredValidation={true} />
                    </div>
                    <div className={cn('pmef-respond-form__field-date')}>
                        <Input placeholder="Дата и время поездки" type="text" name="dateTime" requiredValidation={true} />
                    </div>
                    <Textarea placeholder="Ваш отзыв" name="text" requiredValidation={true} />
                    <CheckBox
                        name="acception" label={toUnescapedHTML(`<a target="_blank" href="${policyLink}">Даю согласие на обработку моих персональных данных в соответствии с <span>политикой конфиденциальности</span></a>`)}
                        // onChange={() => setSubmitButton(!submitButtonIsDisabled)}
                        className={cn('pmef-respond-form__checkbox')}
                        requiredValidation={true}
                    />
                    <Button className={cn('pmef-respond-form__submit-button')} type="submit" label="Отправить" />
                </div>
            </form>
        );
    }, [error, isSended]);

    return (
        <FormProvider {...context}>
            <div className={cn('pmef-respond-form')}>
                {errorPopup}
                {isSended ? null : respondForm}
            </div>
        </FormProvider>);
};

export default PmefRespondForm;
