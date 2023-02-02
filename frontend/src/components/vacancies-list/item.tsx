import React, { useMemo } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import TagsList, { ITagListItem } from '../tags-list';
import { toUnescapedHTML } from '../../utils';

import './index.css';
import { Link } from 'gatsby';

export interface IVacanciesListItem {
    id: string,
    title: string,
    city: {
        text: string,
        value: string
    },
    direction: {
        header: string
    },
    tags: Array<ITagListItem>,
    strapiId: number
}

interface IProps {
    data: IVacanciesListItem,
    activeTags: Array<number>,
    onClickTag: (e: React.MouseEvent<HTMLLIElement>) => void,
    searchString: string
}


const VacanciesListItem: React.FC<IProps> = ({ data, activeTags, onClickTag, searchString }) => {
    const { title, city, direction, tags, strapiId } = data;
    const cn = useClassnames();

    const titleWithSubstrGenerator = useMemo(() => {
        if(searchString.length) {
            const titleWithSubstr = title.split('');

            const firstIndex = title.toLowerCase().indexOf(searchString.toLowerCase().trim());
            const lastIndex = searchString.trim().length + firstIndex + 1;

            titleWithSubstr.splice(firstIndex, 0, '<span class="vacancies__substr-title">');
            titleWithSubstr.splice(lastIndex, 0, '</span>');

            return titleWithSubstr.join('');
        }

        return title;
    }, [searchString, title]);

    return (
        <div
            className={cn('vacancies__list-item')}
        >
            <div className={cn('vacancies__list-item-block')}>
                <div className={cn('vacancies__info-wrapper')}>
                    <span className={cn('vacancies__info-direction')}>{direction?.header}</span>
                </div>
                <div className={cn('vacancies__info-city')}>
                    {city.text}
                </div>
            </div>
            <div className={cn('vacancies__list-item-block')} id="block">
                <Link
                    to={`/vacancies/${strapiId}`}
                    className={
                        cn('vacancies__title',
                            {
                                'vacancies__title_searched': searchString
                            })
                    }
                >
                    {toUnescapedHTML(titleWithSubstrGenerator)}
                </Link>
            </div>
            {/* <div className={cn('vacancies__list-item-block')}>
                <span className={cn('vacancies__area', { 'vacancies__area_hovered': hover })}>{area.text}</span>
            </div> */}
            <div className={cn('vacancies__list-item-block')}>
                <TagsList tags={tags} activeTags={activeTags} onClickTag={onClickTag} />
            </div>
        </div>
    );
};

export default VacanciesListItem;
