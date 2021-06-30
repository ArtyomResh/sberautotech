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
    const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);

    return (
        <div className={cn('vacancies__wrap')}>
            <div className={cn('vacancies__list')}>
                {data.map((item) => (
                    <VacanciesItem key={item.id} data={item} activeTags={activeTags} onClickTag={onClickTag} />
                ))}
            </div>
            <div className={cn('vacancies__filter-wrapper', {
                'vacancies__filter-wrapper_visible': isMobileFilterVisible
            })}>
                <p>HERE!!!!</p>
            </div>
            <Button
                styleType="primary"
                type="button"
                className={cn('vacancies__filter-button')}
                label={"Фильтровать"}
                onClick={() => setIsMobileFilterVisible(!isMobileFilterVisible)}
            />
        </div>
    );
};

export default VacanciesList;
