import React from 'react';
import { Link } from 'gatsby';
import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

const StoryCard = ({data}) => {
    const cn = useClassnames(style);
    return (
        <div className={cn('story__wrapper')}>
            <div key={data.id}>
                <img src={data.image.publicURL} />
                <span>{data.text}</span>
            </div>
        </div>
    )
};

export default StoryCard;
