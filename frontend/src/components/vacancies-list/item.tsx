import React, { useState } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import IconPlus from '../../images/plus.inline.svg';

import style from './index.css';
import { IVacanciesListItem } from './index';

const VacanciesListItem = ({ data }: { data: IVacanciesListItem }) => {
    const cn = useClassnames(style);
    const [isViewFull, toggleView] = useState(false);

    const onClickToggle = () => {
        toggleView(!isViewFull);
    };

    return (
        <div className={cn('vacancies__list-item')}>
            <span className={cn('vacancies__list-item-icon')} onClick={onClickToggle}><IconPlus /></span>

            <div className={cn('vacancies__list-item-content')}>
                <div className={cn('vacancies__list-item-top')}>
                    <div>
                        <div>
                            <div>{data.location}</div>
                            <div>{data.type}</div>
                        </div>
                        <div>
                            {data.created_at}
                        </div>
                    </div>
                    <div>
                        <div>{data.title}</div>
                        <div>{data.author}</div>
                    </div>
                </div>
                {isViewFull && (
                    <div className={cn('vacancies__list-item-full-content')}>
                        <div className={cn('vacancies__list-item-full-content-row')}>
                            <div>Условия</div>
                            <div>
                                {data.conditions.map((item, index) => (
                                    <div key={`${data.id}-condition-${index}`}>{item}</div>
                                ))}
                            </div>
                        </div>
                        <div className={cn('vacancies__list-item-full-content-row')}>
                            <div>Что необходимо делать</div>
                            <div>
                                {data.work_list.map((item, index) => (
                                    <div key={`${data.id}-work-${index}`}>{item}</div>
                                ))}
                            </div>
                        </div>
                        <div className={cn('vacancies__list-item-full-content-row')}>
                            <div>Мы ожидаем, что у вас есть</div>
                            <div>
                                {data.work_list.map((item, index) => (
                                    <div key={`${data.id}-expect-${index}`}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VacanciesListItem;
