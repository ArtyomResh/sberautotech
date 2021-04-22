import React from 'react';
import Input from './input';
import MyComponent from './select';
import Textarea from './textarea';
import Button from './button';
import RadioButton from './radio-button';

import { useClassnames } from '../../hooks/use-classnames';

import { useForm } from "react-hook-form";

import style from './index.css';

const RespondForm = () => {
    const cn = useClassnames(style);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log(data, 'huhhu');
    }

    console.log(errors);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn('respond-form')}>
            <div className={cn('text-block')}>
                <h1 className={cn('text-block__title')}>Присоединяйтесь к команде и создавайте будующее вместе с нами</h1>
            </div>
            <div className={cn('right-block')}>
                <div className={cn('right-block__inputs')}>
                    <div className={cn('right-block__top-section')}>
                        <Input name="name" type="text" placeholder="Имя"/>
                        <Input name="surname" type="text" placeholder="Фамилия"/>
                    </div>
                    <div className={cn('right-block__bottom-section')}>
                        <Input name="email" type="email" placeholder="Почта"/>
                        <MyComponent />
                    </div>
                </div>
                <Textarea placeholder="Опишите свой опыт"/>
                <div className={cn('right-block__checkbox-wrapper')}>
                    <RadioButton label="Я соглашаюсь передать свои персональные данные, содержащиеся в анкете и всех приложенных файлах"/>
                </div>
                <div className={cn('right-block__button-section')}>
                    <Input type="file" placeholder="Фаил"/>
                    <Button type="submit" label="Отправить"/>
                </div>
            </div>
        </form>
    )
}

export default RespondForm;