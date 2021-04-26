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

interface IProps {
    setIsPopupVisible: boolean
}

const RespondForm = ({ setIsPopupVisible }: IProps) => {
    const cn = useClassnames(style);

    const context = useForm({
        mode            : 'onSubmit',
        reValidateMode  : 'onChange',
        shouldFocusError: true,
        defaultValues   : {}
    });

    const closeHandler = () => {
        return setIsPopupVisible(false);
    };

    const onSubmit = (data) => {
        console.log(data, 'Получено');
    };

    return (
        <FormProvider {...context}>
            <form onSubmit={context.handleSubmit(onSubmit)} className={cn('respond-form')}>
                <div className={cn('respond-form__close-btn')} onClick={closeHandler}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.80852 17.4881C0.417995 17.8786 0.417995 18.5118 0.80852 18.9023C1.19904 19.2928 1.83221 19.2928 2.22273 18.9023L10.0009 11.1241L17.7791 18.9023C18.1696 19.2928 18.8028 19.2928 19.1933 18.9023C19.5838 18.5118 19.5838 17.8786 19.1933 17.4881L11.4151 9.70989L19.1933 1.93172C19.5838 1.54119 19.5838 0.908027 19.1933 0.517502C18.8028 0.126978 18.1696 0.126979 17.7791 0.517503L10.0009 8.29568L2.22273 0.517503C1.83221 0.126979 1.19904 0.126979 0.808518 0.517503C0.417994 0.908028 0.417994 1.54119 0.808519 1.93172L8.58669 9.70989L0.80852 17.4881Z" fill="#2E3840" />
                    </svg>
                </div>
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