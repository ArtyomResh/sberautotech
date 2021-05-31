import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { useClassnames } from '../../hooks/use-classnames';
import Button from '../button';
import Select from '../select';

import style from './index.css';
import VacanciesItem from './item';

interface IProps {
    data: IVacanciesList
}

interface IVacanciesList {
    company: string,
    vacancies_list: Array<IVacanciesListItem>
}

export interface IVacanciesListItem {
    id: number,
    title: string,
    location: string,
    type: string,
    created_at: string,
    author: string,
    conditions: Array<string>,
    work_list: Array<string>,
    expect: Array<string>
}

const options = [
    { value: 'Product', label: 'Product' },
    { value: 'Development', label: 'Development' },
    { value: 'HR', label: 'HR' },
    { value: 'Design', label: 'Design' }
];

const VacanciesList: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);

    const context = useForm({
        mode            : 'onSubmit',
        reValidateMode  : 'onChange',
        shouldFocusError: true,
        defaultValues   : {}
    });

    return (
        <FormProvider {...context}>
            <form onSubmit={context.handleSubmit(onSubmit)}>
                <div className={cn('vacancies__wrap')}>
                    <div className={cn('vacancies__filters-wrap')}>
                        <Select name="" placeholder="Функциональная сфера" options={options} />
                        <Select name="" placeholder="Регион" options={options} />
                        <Select name="" placeholder="График" options={options} />
                    </div>
                    <div className={cn('vacancies__total-count')}>99 вакансий найдено</div>
                    <div className={cn('vacancies__list')}>
                        {data.vacancies_list.map((item, i) => (
                            <VacanciesItem data={item} company={data.company} key={`vacancy-item-${i}`} />
                        ))}
                    </div>
                    <div className={cn('vacancies__btn-more')}>
                        <Button label="Загрузить еще вакансии" />
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default VacanciesList;
