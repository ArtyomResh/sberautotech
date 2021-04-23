import React from 'react';
import Input from './input';
import MyComponent from './select';
import Textarea from './textarea';
import Button from './button';
import CheckBox from './check-box';

import { useClassnames } from '../../hooks/use-classnames';

import { useForm, FormProvider } from 'react-hook-form';

import style from './index.css';

const RespondForm = () => {
    const cn = useClassnames(style);
    const context = useForm({
        mode            : 'onChange',
        shouldFocusError: true,
        defaultValues   : {}
    });
    const onSubmit = (data) => {
        console.log(data, 'Получено');
    };

    return (
        <FormProvider {...context}>
            <form onSubmit={context.handleSubmit(onSubmit)} className={cn('respond-form')}>
                <div className={cn('text-block')}>
                    <h1 className={cn('text-block__title')}>Присоединяйтесь к команде и создавайте будующее вместе с нами</h1>
                </div>
                <div className={cn('right-block')}>
                    <div className={cn('right-block__inputs')}>
                        <div className={cn('right-block__top-section')}>
                            <Input type="text" placeholder="Имя" name="name" />
                            <Input type="text" placeholder="Фамилия" name="surname" />
                        </div>
                        <div className={cn('right-block__bottom-section')}>
                            <Input type="email" placeholder="Почта" name="email" />
                            <MyComponent />
                        </div>
                    </div>
                    <Textarea placeholder="Опишите свой опыт" />
                    <div className={cn('right-block__checkbox-wrapper')}>
                        <CheckBox label="Я соглашаюсь передать свои персональные данные, содержащиеся в анкете и всех приложенных файлах" />
                    </div>
                    <div className={cn('right-block__button-section')}>
                        <Input type="file" placeholder="Фаил" name="file" />
                        <Button type="submit" label="Отправить" />
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default RespondForm;