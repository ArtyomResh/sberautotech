import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import Tag from '../tag';

import style from './index.css';

export interface ITagListItem {
    text: string,
    id: number,
    strapiId?: number
}
interface IProps {
    tags: Array<ITagListItem>,
    activeTags: Array<number>,
    onClickTag: (e: React.MouseEvent<HTMLLIElement>) => void
}

const TagsList = ({ tags, activeTags, onClickTag }: IProps) => {
    const cn = useClassnames(style);

    return (
        <ul className={cn('tags-list')}>
            {tags.map(
                ((tag) => (
                    <Tag key={tag.strapiId || tag.id} text={tag.text} strapiId={tag.strapiId || tag.id} isActive={activeTags?.includes(tag.strapiId || tag.id)} onClickTag={onClickTag} />
                )
                ))}
        </ul>
    );
};

export default TagsList;
