import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { useClassnames } from '../../hooks/use-classnames';
import { enumToValues } from '../../utils';
import Button from '../button';
import Select from '../select';

import style from './index.css';
import VacanciesItem from './item';

interface IProps {
    data: Array<IVacanciesListItem>
}

export interface IVacanciesListItem {
    id: string,
    title: string,
    conditions: string,
    city: string,
    about: string,
    jobType: string,
    publicationDate: string,
    whatWaitingFor: string,
    whatToDo: string,
    strapiId: number
}

export enum ECities {
    moscow = 'Москва',
    minsk = 'Минск'
}

export enum EJobType {
    full = 'Полная занятость',
    part = 'Частичная занятость'
}

export enum ESphere {
    product = 'Product',
    development = 'Development',
    hr = 'HR',
    design = 'Design'
}

const VacanciesList: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);

    const context = useForm({
        mode            : 'onSubmit',
        reValidateMode  : 'onChange',
        shouldFocusError: true,
        defaultValues   : {}
    });

    const onSubmit = () => {
        // todo сделать отправку данных на бек
        console.log('!!!submit');
    };

    return (
        <FormProvider {...context}>
            <form onSubmit={context.handleSubmit(onSubmit)}>
                <div className={cn('vacancies__wrap')}>
                    <div className={cn('vacancies__filters-wrap')}>
                        <Select name="activity" placeholder="Функциональная сфера" options={enumToValues(ESphere)} />
                        <Select name="region" placeholder="Регион" options={enumToValues(ECities)} />
                        <Select name="schedule" placeholder="График" options={enumToValues(EJobType)} />
                    </div>
                    <div className={cn('vacancies__total-count')}>{data.length || 0} вакансий найдено</div>
                    <div className={cn('vacancies__list')}>
                        {data.map((item) => (
                            <VacanciesItem key={item.id} data={item} />
                        ))}
                    </div>
                    {/*
                    <div className={cn('vacancies__btn-more')}>
                        <Button label="Загрузить еще вакансии" />
                    </div>
                    */}
                </div>
            </form>
        </FormProvider>
    );
};

export default VacanciesList;
