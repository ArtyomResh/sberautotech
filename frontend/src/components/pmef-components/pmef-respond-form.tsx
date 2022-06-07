import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Button from '../button';
import CheckBox from '../respond-form/check-box';
import Input from '../respond-form/input';
import Textarea from '../respond-form/textarea';

import { useClassnames } from '../../hooks/use-classnames';

import style from './pmef-respond-form.css';


const PmefRespondForm = () => {
    const FORM_URL = '/preview';
    const context = useForm({
        mode            : 'onSubmit',
        reValidateMode  : 'onChange',
        shouldFocusError: true,
        defaultValues   : {}
    });
    const cn = useClassnames(style);


    const onSubmit = async () => {
        const formData = new FormData();

        try {
            const res = await fetch(FORM_URL, {
                method : 'POST',
                body   : formData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(res.ok) {
                console.log('sended');
            }
        } catch(err) {
            throw new Error(err);
        }
    };

    return (
        <FormProvider {...context}>
            <form
                onSubmit={context.handleSubmit(onSubmit)}
                className={cn('pmef-respond-from')}
            >
                <div className={cn('pmef-respond-from__left-block')}>
                    <p className={cn('pmef-respond-from__big-title')}>Расскажите о поездке</p>
                    <p className={cn('pmef-respond-from__small-title')}>Как вам? Что понравилось, а что пошло не так?</p>
                </div>
                <div className={cn('pmef-respond-from__right-block')}>
                    <div className={cn('pmef-respond-from__field-name')}>
                        <Input placeholder="ФИО" type="text" name="name" />
                    </div>
                    <div className={cn('pmef-respond-from__field-date')}>
                        <Input placeholder="Дата и время поездки" type="text" name="dateTime" />
                    </div>
                    <Textarea placeholder="Ваш отзыв" name="dateTime" requiredValidation={false} />
                    <CheckBox name="acception" label="Даю согласие на обработку моих персональных данных в соответствии с политикой конфиденциальности" />
                    <Button type="submit" label="Отправить" />
                </div>
            </form>
        </FormProvider>);
};

export default PmefRespondForm;