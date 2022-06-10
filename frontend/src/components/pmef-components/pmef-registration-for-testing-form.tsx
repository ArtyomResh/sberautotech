import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Button from '../button';
import CheckBox from '../respond-form/check-box';
import Input from '../respond-form/input';
import Select from '../select';

import IconClose from '../../images/pmef/icon-cls.inline.svg';

import { useClassnames } from '../../hooks/use-classnames';
import { toUnescapedHTML } from '../../utils';

import style from './pmef-registration-form.css';
import policyLink from '../../../static/test.pdf';

const dates = [
    { label: '15.06.2022', value: '06-15-2022' },
    { label: '16.06.2022', value: '06-16-2022' },
    { label: '17.06.2022', value: '06-17-2022' },
    { label: '18.06.2022', value: '06-18-2022' }
];

interface IProps {
    closeHandler: () => void
}

const PmefRegistrationForTestingForm = (props: IProps) => {
    interface IAcceptions {
        acceptionOne: boolean
    }

    const [submitButtonIsDisabled, setSubmitButton] = useState<IAcceptions>({
        acceptionOne: false
    });
    const [isSended, setContentSend] = useState(false);
    const [error, setError] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [times, setTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState<Date>();

    const FORM_URL = '/order';

    const context = useForm({
        mode: 'onSubmit'
    });

    const cn = useClassnames(style);

    useEffect(() => {
        if(selectedDate) {
            fetch(`/freeSlots?date=${selectedDate.value}`)
                .then((data) => data.json())
                .then((data) => setTimes(data.filter(item => !item.disabled)))
                .catch((err) => {
                    throw new Error(err);
                });
        }
    }, [selectedDate]);

    const onSubmit = async () => {
        setContentSend(true);
        const data = context.getValues();

        delete data.acceptionOne;
        delete data.acceptionTwo;
        delete data.acceptionThree;

        try {
            const res = await fetch(FORM_URL, {
                method : 'POST',
                body   : JSON.stringify({ ...data, date: selectedDate.value, time: selectedTime.timeFrom }),
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
                <div className={cn('pmef-registration-form__error-popup', {
                    'pmef-registration-form__error-popup_visible': error
                })}
                >
                    <p className={cn('pmef-registration-form__error-title')}>
                        Записаться <span>не получилось.</span><br />
                        Попробуйте еще раз.
                    </p>
                    <div
                        className={cn('pmef-registration-form__popup-close-btn')} onClick={() => {
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
                <div className={cn('pmef-registration-form__complete-popup')}>
                    <p className={cn('pmef-registration-form__complete-popup-title')}>
                        Вы записаны на открытое<br />
                        тестирование
                    </p>
                    <div
                        className={cn('pmef-registration-form__complete-popup-close-btn')} onClick={() => {
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

        if(!selectedDate) {
            return false;
        }

        if(!selectedTime) {
            return false;
        }

        if(!arrOfBull.every((e) => e)) {
            return false;
        }

        return true;
    }, [submitButtonIsDisabled, selectedDate, selectedTime]);

    const respondForm = useMemo(() => {
        return (
            <form
                onSubmit={context.handleSubmit(onSubmit)}
                className={cn('pmef-registration-form__form')}
            >
                <div className={cn('pmef-registration-form__left-block')}>
                    <p className={cn('pmef-registration-form__big-title')}>Запись на открытое тестирование</p>
                    <p className={cn('pmef-registration-form__small-title')}>Заполните краткую информацию о себе и выберите доступные дату и время поездки.</p>
                    <p className={cn('pmef-registration-form__small-title')}>При себе необходимо иметь документ, удостоверяющий личность</p>
                </div>
                <div className={cn('pmef-registration-form__right-block')}>
                    <div
                        className={cn('pmef-registration-form__close-btn')} onClick={() => {
                            setContentSend(false);
                            setError(false);
                            props?.closeHandler();
                        }}
                    >
                        <IconClose />
                    </div>
                    <div className={cn('pmef-registration-form__field-name')}>
                        <Input placeholder="ФИО" type="text" name="name" requiredValidation={true} />
                    </div>
                    <div className={cn('pmef-registration-form__field-email')}>
                        <Input placeholder="Почта" type="email" name="email" requiredValidation={true} />
                    </div>
                    <div className={cn('pmef-registration-form__select-block')}>
                        <div className={cn('pmef-registration-form__field-date')}>
                            <Select name="date" placeholder="Дата поездки" options={dates} onChange={(value: Date) => setSelectedDate(value)} />
                        </div>
                        <div className={cn('pmef-registration-form__field-time')}>
                            <Select name="time" placeholder="Время" options={times} onChange={(value: Date) => setSelectedTime(value)} />
                        </div>
                    </div>
                    <CheckBox
                        name="acceptionOne" label={toUnescapedHTML(`<a target="_blank" href="${policyLink}">Даю <span>согласие</span> на участие в эксперименте, обработку персональных данных и осуществление фото- и видеосъемки</a>`)}
                        onChange={acceptionsHandler}
                        className={cn('pmef-registration-form__checkbox')}
                    />
                    <Button className={cn('pmef-registration-form__submit-button')} type="submit" label="Отправить" disabled={!buttonActivatorHandler} />
                </div>
            </form>
        );
    }, [error, isSended, submitButtonIsDisabled, times, selectedDate, selectedTime]);

    return (
        <FormProvider {...context}>
            <div className={cn('pmef-registration-form')}>
                {errorPopup}
                {isSended ? null : respondForm}
            </div>
        </FormProvider>);
};

export default PmefRegistrationForTestingForm;
