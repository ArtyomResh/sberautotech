import React from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import Tag from '../tag';

import style from './index.css';

interface IProps {
    tags: Array<any>,
    activeTags: Array<any>,
    onClickTag: any
}

const TagsList = ({ tags, activeTags, onClickTag }: IProps) => {
    const cn = useClassnames(style);
    console.log('THERE', tags)
    return (
        <ul className={cn('tags-list')}>
            {tags.map(
                (tag => (
                    <Tag text={tag.text} strapiId={tag.strapiId || tag.id} isActive={activeTags?.includes(tag.strapiId || tag.id)} onClickTag={onClickTag} />
                )
                ))}
        </ul>
    );
};

export default TagsList;
