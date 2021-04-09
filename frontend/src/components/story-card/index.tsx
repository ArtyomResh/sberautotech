import React from 'react';
import { Link } from 'gatsby';
import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

const StoryCard = ({ data }) => {
    const cn = useClassnames(style);
    return (
        <div className={cn('story__wrapper')}>
            <img src={data.image.publicURL} className={cn('story__image')} />
            <span className={cn('story__text')}>{data.text}</span>
        </div>
    )
};

export default StoryCard;
