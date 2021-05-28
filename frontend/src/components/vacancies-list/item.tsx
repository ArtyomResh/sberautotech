import React, { useState } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import IconPlus from '../../images/plus.inline.svg';
import Button from '../button';

import style from './index.css';
import { IVacanciesListItem } from './index';

const VacanciesListItem = ({ data, company }: { data: IVacanciesListItem, company: string }) => {
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
                    <div className={cn('vacancies__list-item-top-column')}>
                        <div>
                            <div>{data.location}</div>
                            <div>{data.type}</div>
                        </div>
                        <div>
                            {data.created_at}
                        </div>
                    </div>
                    <div className={cn('vacancies__list-item-top-column')}>
                        <div className={cn('vacancies__list-item-title')}>{data.title}</div>
                        <div>{data.author}</div>
                    </div>
                </div>
                {isViewFull && (
                    <div className={cn('vacancies__list-item-full-content')}>
                        <div className={cn('vacancies__list-item-full-content-left')}>
                            {company}
                        </div>
                        <div className={cn('vacancies__list-item-full-content-right')}>
                            <div className={cn('vacancies__list-item-full-content-row')}>
                                <div className={cn('vacancies__list-item-list-title')}>Условия</div>
                                <div>
                                    {data.conditions.map((item, index) => (
                                        <div key={`${data.id}-condition-${index}`}>&mdash; {item}</div>
                                    ))}
                                </div>
                            </div>
                            <div className={cn('vacancies__list-item-full-content-row')}>
                                <div className={cn('vacancies__list-item-list-title')}>Что необходимо делать</div>
                                <div>
                                    {data.work_list.map((item, index) => (
                                        <div key={`${data.id}-work-${index}`}>&mdash; {item}</div>
                                    ))}
                                </div>
                            </div>
                            <div className={cn('vacancies__list-item-full-content-row')}>
                                <div className={cn('vacancies__list-item-list-title')}>Мы ожидаем, что у вас есть</div>
                                <div>
                                    {data.work_list.map((item, index) => (
                                        <div key={`${data.id}-expect-${index}`}>&mdash; {item}</div>
                                    ))}
                                </div>
                            </div>
                            <Button label="Откликнуться" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VacanciesListItem;
