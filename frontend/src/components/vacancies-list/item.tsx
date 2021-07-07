import React, { useMemo } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import TagsList from '../tags-list';
import { toUnescapedHTML } from '../../utils';

import style from './index.css';
import { IVacanciesListItem } from './index';
import { Link } from 'gatsby';

interface IProps {
    data: IVacanciesListItem,
    activeTags: Array<any>,
    onClickTag: any,
    searchString: string
}

const VacanciesListItem: React.FC<IProps> = ({ data, activeTags, onClickTag, searchString }) => {
    const { title, city, area, direction, tags, strapiId } = data;
    const cn = useClassnames(style);

    const titleWithSubstrGenerator = useMemo(() => {
        if(searchString.length > 1 && title.toLowerCase().includes(searchString.toLowerCase().trim())) {
            const titleWithSubstr = title.split('');

            const firstIndex = title.toLowerCase().indexOf(searchString.trim());
            const lastIndex = searchString.trim().length + firstIndex + 1;

            titleWithSubstr.splice(firstIndex, 0, '<p class=vacancies__substr-title>');
            titleWithSubstr.splice(lastIndex, 0, '<p>');

            return titleWithSubstr.join('');
        }

        return title;
    }, [searchString]);

    return (
        <div className={cn('vacancies__list-item')}>
            <div className={cn('vacancies__list-item-block')}>
                <div className={cn('vacancies__info-wrapper')}>
                    <span className={cn('vacancies__info-direction')}>{direction?.header}</span>
                </div>
                <div className={cn('vacancies__info-city')}>
                    {city.text}
                </div>
            </div>
            <div className={cn('vacancies__list-item-block')}>
                <Link to={`/vacancies/${strapiId}`} className={cn('vacancies__title')}>{toUnescapedHTML(titleWithSubstrGenerator)}</Link>
            </div>
            <div className={cn('vacancies__list-item-block')}>
                <span className={cn('vacancies__area')}>{area.text}</span>
            </div>
            <div className={cn('vacancies__list-item-block')}>
                <TagsList tags={tags} activeTags={activeTags} onClickTag={onClickTag} />
            </div>
        </div>
    );
};

export default VacanciesListItem;
