import React from 'react';
import Input from './input';
import Select from './select';
import Textarea from './textarea';
import Button from './button';
import CheckBox from './check-box';

import { useClassnames } from '../../hooks/use-classnames';

import { useForm, FormProvider } from 'react-hook-form';

import style from './index.css';

const options = [
    { value: 'Product', label: 'Product' },
    { value: 'Development', label: 'Development' },
    { value: 'HR', label: 'HR' },
    { value: 'Design', label: 'Design' }
];

const RespondForm = () => {
    const cn = useClassnames(style);
    const context = useForm({
        mode            : 'onSubmit',
        reValidateMode  : 'onChange',
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
                            <div className={cn('right-block__field-wrapper')}>
                                <Input type="text" placeholder="Имя" name="name" pattern={/^[A-Za-z]+$/i} requiredValidation={true} />
                            </div>
                            <div className={cn('right-block__field-wrapper')}>
                                <Input type="text" placeholder="Фамилия" name="surname" pattern={/^[A-Za-z]+$/i} requiredValidation={true} />
                            </div>
                        </div>
                        <div className={cn('right-block__bottom-section')}>
                            <div className={cn('right-block__field-wrapper')}>
                                <Input type="email" placeholder="Почта" name="email" pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g} requiredValidation={true} />
                            </div>
                            <div className={cn('right-block__field-wrapper')}>
                                <Select name="direction" placeholder="Выберите направление" options={options} />
                            </div>
                        </div>
                    </div>
                    <div className={cn('right-block__field-wrapper')}>
                        <Textarea name="textarea" placeholder="Опишите свой опыт" requiredValidation={true} />
                    </div>
                    <div className={cn('right-block__checkbox-wrapper')}>
                        <CheckBox name="acception" requiredValidation={true} label="Я соглашаюсь передать свои персональные данные, содержащиеся в анкете и всех приложенных файлах" />
                    </div>
                    <div className={cn('right-block__button-section')}>
                        <div className={cn('right-block__field-wrapper')}>
                            <Input type="file" placeholder="Фаил" name="file" requiredValidation={true} />
                        </div>
                        <div className={cn('right-block__field-wrapper')}>
                            <Button type="submit" label="Отправить" />
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default RespondForm;