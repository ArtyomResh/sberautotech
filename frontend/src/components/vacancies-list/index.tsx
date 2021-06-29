import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';
import VacanciesItem from './item';

interface IProps {
    data: Array<IVacanciesListItem>,
    activeTags: Array<any>
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

const VacanciesList: React.FC<IProps> = ({ data, activeTags }) => {
    const cn = useClassnames(style);

    return (
        <div className={cn('vacancies__wrap')}>
            <div className={cn('vacancies__list')}>
                {data.map((item) => (
                    <VacanciesItem key={item.id} data={item} activeTags={activeTags} />
                ))}
            </div>
        </div>
    );
};

export default VacanciesList;
