import React, { useContext, useCallback } from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import { appContext } from '../../context/context';

import style from './index.css';
import VacanciesItem, { IVacanciesListItem } from './item';

interface IProps {
    data: Array<IVacanciesListItem>,
    activeTags: Array<number>,
    onClickTag: any,
    searchString: string
}


const VacanciesList: React.FC<IProps> = ({ data, activeTags, onClickTag, searchString }) => {
    const cn = useClassnames(style);

    const { setIsRespondFormVisible } = useContext(appContext);

    const linkPopupHandler = useCallback(() => {
        setIsRespondFormVisible?.(true);
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
