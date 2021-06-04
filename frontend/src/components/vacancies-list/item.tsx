import React, { useState } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import IconPlus from '../../images/plus.inline.svg';
import IconMinus from '../../images/minus.inline.svg';
import Button from '../button';
import { toUnescapedHTML } from '../../utils';

import style from './index.css';
import { IVacanciesListItem, ECities, EJobType } from './index';

interface IProps {
    data: IVacanciesListItem
}

const VacanciesListItem: React.FC<IProps> = ({ data }) => {
    const { title, division, city, about, jobType, publicationDate, conditions, whatWaitingFor, whatToDo } = data;
    const cn = useClassnames(style);
    const [isViewFull, toggleView] = useState(false);

    const onClickToggle = () => {
        toggleView(!isViewFull);
    };

    return (
        <div className={cn('vacancies__list-item')}>
            <span
                className={cn('vacancies__list-item-icon', {
                    'vacancies__list-item-icon_minus': isViewFull
                })}
                onClick={onClickToggle}
            >
                {isViewFull ? <IconMinus /> : <IconPlus /> }
            </span>

            <div className={cn('vacancies__list-item-content')}>
                <div className={cn('vacancies__list-item-top')}>
                    <div className={cn('vacancies__list-item-top-column')}>
                        <div>
                            <div>{ECities[city]}</div>
                            <div>{EJobType[jobType]}</div>
                        </div>
                        <div>
                            {publicationDate.split('-').reverse().join('.')}
                        </div>
                    </div>
                    <div className={cn('vacancies__list-item-top-column')}>
                        <div className={cn('vacancies__list-item-title')}>{title}</div>
                        <div>{division}</div>
                    </div>
                </div>
                {isViewFull && (
                    <div className={cn('vacancies__list-item-full-content')}>
                        <div className={cn('vacancies__list-item-full-content-left')}>
                            {about}
                        </div>
                        <div className={cn('vacancies__list-item-full-content-right')}>
                            <div className={cn('vacancies__list-item-full-content-row')}>
                                {toUnescapedHTML(conditions)}
                            </div>
                            <div className={cn('vacancies__list-item-full-content-row')}>
                                {toUnescapedHTML(whatToDo)}
                            </div>
                            <div className={cn('vacancies__list-item-full-content-row')}>
                                {toUnescapedHTML(whatWaitingFor)}
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
