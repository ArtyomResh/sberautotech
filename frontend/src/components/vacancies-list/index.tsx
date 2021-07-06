import React, { useContext, useCallback } from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import { appContext } from '../../context/context';

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

    const { setIsPopupVisible } = useContext(appContext);

    const linkPopupHandler = useCallback(() => {
        setIsPopupVisible(true);
    }, []);

    return (
        <div className={cn('vacancies__wrap')}>
            <div className={cn('vacancies__list')}>
                {data?.length ? data.map((item) => (
                    <VacanciesItem key={item.id} data={item} activeTags={activeTags} onClickTag={onClickTag} />
                )) : (
                    <div className={cn('vacancies__empty-text')}>
                        <p>Нет вакансий, но вы все равно можете <p className={cn('vacancies__inner-text-link')} onClick={linkPopupHandler}>связаться с нами</p></p>
                    </div>)}
            </div>
        </div>
    );
};

export default VacanciesList;
