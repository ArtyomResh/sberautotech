import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';
import VacanciesItem from './item';
import Button from '../button';

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

const VacanciesList: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);

    return (
        <div className={cn('vacancies__wrap')}>
            <div className={cn('vacancies__list')}>
                {data.vacancies_list.map((item, i) => (
                    <VacanciesItem data={item} company={data.company} key={`vacancy-item-${i}`} />
                ))}
            </div>
            <div className={cn('vacancies__btn-more')}>
                <Button label="Загрузить еще вакансии" />
            </div>
        </div>
    );
};

export default VacanciesList;
