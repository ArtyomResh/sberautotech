import React, { useState } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import Button from '../button';

import style from './index.css';
import VacanciesItem from './item';

interface IProps {
    data: Array<IVacanciesListItem>,
    activeTags: Array<any>,
    onClickTag: any
}

export interface IVacanciesListItem {
    id: string,
    locale: string,
    title: string,
    conditions: string,
    city: {
        text: string,
        value: string
    },
    area: {
        text: string,
        value: string
    },
    direction: {
        header: string
    },
    tags: Array<any>,
    about: string,
    jobType: string,
    publicationDate: string,
    whatWaitingFor: string,
    whatToDo: string,
    strapiId: number
}

const VacanciesList: React.FC<IProps> = ({ data, activeTags, onClickTag }) => {
    const cn = useClassnames(style);

    return (
        <div className={cn('vacancies__wrap')}>
            <div className={cn('vacancies__list')}>
                {data?.length ? data.map((item) => (
                    <VacanciesItem key={item.id} data={item} activeTags={activeTags} onClickTag={onClickTag} />
                )) : <p className={cn('vacancies__empty-text')}>Нет вакансий</p>}
            </div>
        </div>
    );
};

export default VacanciesList;
