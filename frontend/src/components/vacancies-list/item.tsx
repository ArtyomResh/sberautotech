import React, { useState } from 'react';
import moment from 'moment/min/moment-with-locales';

import { useClassnames } from '../../hooks/use-classnames';
import TagsList from '../tags-list';
import { toUnescapedHTML } from '../../utils';

import style from './index.css';
import { IVacanciesListItem } from './index';
import { Link } from 'gatsby';

interface IProps {
    data: IVacanciesListItem,
    activeTags: Array<any>
}

const VacanciesListItem: React.FC<IProps> = ({ data, activeTags }) => {
    const { title, city, about, jobType, publicationDate, area, direction, tags, strapiId, locale } = data;
    const cn = useClassnames(style);

    return (
        <div className={cn('vacancies__list-item')}>
            <div className={cn('vacancies__list-item-block')}>
                <div className={cn('vacancies__info-wrapper')}>
                    <span className={cn('vacancies__info-data')}>{moment(publicationDate).locale(locale).format('DD MMMM')}</span>
                    <span className={cn('vacancies__info-direction')}>{direction.header}</span>
                </div>
                <div className={cn('vacancies__info-city')}>
                    {city.text}
                </div>
            </div>
            <div className={cn('vacancies__list-item-block')}>
                <Link to={`/vacancies/${strapiId}`} className={cn('vacancies__title')}>{title}</Link>
            </div>
            <div className={cn('vacancies__list-item-block')}>
                <span className={cn('vacancies__area')}>{area.text}</span>
            </div>
            <div className={cn('vacancies__list-item-block')}>
                <TagsList tags={tags} activeTags={activeTags} onClickTag={() => { }} />
            </div>
        </div>
    );
};

export default VacanciesListItem;
