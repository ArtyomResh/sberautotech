import React, { useState, useMemo, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Button from '../button';
import CheckBox from '../respond-form/check-box';
import Input from '../respond-form/input';
import Select from '../select';

import IconClose from '../../images/pmef/icon-cls.inline.svg';

import { useClassnames } from '../../hooks/use-classnames';

import style from './pmef-respond-form.css';

interface IProps {
    closeHandler: () => void
}

const PmefRegistrationForTestingForm = (props: IProps) => {
    interface IAcceptions {
        acceptionOne: boolean,
        acceptionTwo: boolean,
        acceptionThree: boolean
    }

    const [submitButtonIsDisabled, setSubmitButton] = useState<IAcceptions>({
        acceptionOne  : false,
        acceptionTwo  : false,
        acceptionThree: false
    });
    const [isSended, setContentSend] = useState(false);
    const [error, setError] = useState(false);

    const FORM_URL = '/review';

    const context = useForm({
        mode: 'onSubmit'
    });

    const cn = useClassnames(style);

    const onSubmit = async () => {
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
                setContentSend(true);
                setError(false);
            }

            if(!res.ok) {
                console.log('didnt send!');
                setError(true);
                setContentSend(false);
            }
        } catch(err) {
            setError(true);
            setContentSend(false);
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

    const acceptionsHandler = useCallback((e) => setSubmitButton({ ...submitButtonIsDisabled, [e.target.name]: !submitButtonIsDisabled[e.target.name] }), [submitButtonIsDisabled]);
    const buttonActivatorHandler = useMemo(() => {
        const arrOfBull = Object.values(submitButtonIsDisabled);

        return arrOfBull.every((e) => e);
    }, [submitButtonIsDisabled]);

    const respondForm = useMemo(() => {
        return (
            <form
                onSubmit={context.handleSubmit(onSubmit)}
                className={cn('pmef-respond-form__form')}
            >
                <div className={cn('pmef-respond-form__left-block')}>
                    <p className={cn('pmef-respond-form__big-title')}>Запись на открытое тестирование</p>
                    <p className={cn('pmef-respond-form__small-title')}>Заполните краткую информацию о себе и выберите доступные дату и время поездки.</p>
                    <p className={cn('pmef-respond-form__small-title')}>При себе необходимо иметь документ, удостоверяющий личность</p>
                </div>
                <div className={cn('pmef-respond-form__right-block')}>
                    <div
                        className={cn('pmef-respond-form__close-btn')} onClick={() => {
                            setContentSend(false);
                            setError(false);
                            props?.closeHandler();
                        }}
                    >
                        <IconClose />
                    </div>
                    <div className={cn('pmef-respond-form__field-name')}>
                        <Input placeholder="ФИО" type="text" name="name" />
                    </div>
                    <div className={cn('pmef-respond-form__field-email')}>
                        <Input placeholder="Почта" type="email" name="email" />
                    </div>
                    <div className={cn('pmef-respond-form__field-date')}>
                        <Select name="date" />
                    </div>
                    <div className={cn('pmef-respond-form__field-time')}>
                        <Select name="time" />
                    </div>
                    <CheckBox
                        name="acceptionOne" label="Даю согласие на обработку моих персональных данных в соответствии с политикой конфиденциальности"
                        onChange={acceptionsHandler}
                    />
                    <CheckBox
                        name="acceptionTwo" label="Даю согласие на участие в эксперименте"
                        onChange={acceptionsHandler}
                    />
                    <CheckBox
                        name="acceptionThree" label="Даю согласие на съемку"
                        onChange={acceptionsHandler}
                    />
                    <Button className={cn('pmef-respond-form__submit-button')} type="submit" label="Отправить" disabled={!buttonActivatorHandler} />
                </div>
            </form>
        );
    }, [error, isSended, submitButtonIsDisabled]);

    return (
        <FormProvider {...context}>
            <div className={cn('pmef-respond-form')}>
                {errorPopup}
                {isSended ? null : respondForm}
            </div>
        </FormProvider>);
};

export default PmefRegistrationForTestingForm;
