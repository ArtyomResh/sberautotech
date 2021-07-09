import React, { useContext, useCallback } from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import { appContext } from '../../context/context';

import style from './index.css';
import VacanciesItem from './item';

interface IProps {
    data: Array<IVacanciesListItem>,
    activeTags: Array<any>,
    onClickTag: any,
    searchString: string
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

const VacanciesList: React.FC<IProps> = ({ data, activeTags, onClickTag, searchString }) => {
    const cn = useClassnames(style);

    const { setIsPopupVisible } = useContext(appContext);

    const linkPopupHandler = useCallback(() => {
        setIsPopupVisible(true);
    }, []);

    return (
        <div className={cn('vacancies__wrap')}>
            <div className={cn('vacancies__list')}>
                {data?.length ? data.map((item) => (
                    <VacanciesItem key={item.id} data={item} activeTags={activeTags} onClickTag={onClickTag} searchString={searchString} />
                )) : (
                        <div className={cn('vacancies__empty-text')}>
                            <p>Сейчас вакансий по этому направлению нет. <p className={cn('vacancies__inner-text-link')} onClick={linkPopupHandler}>Напишите нам</p> и при наличии подходящих вакансий мы обязательно с вами свяжемся</p>
                        </div>)}
            </div>
        </div>
    );
};

export default VacanciesList;
