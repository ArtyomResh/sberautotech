import React, { useMemo } from 'react';
import { Link } from 'gatsby';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

export interface ICard {
    image: {
        publicURL: string
    },
    text: string
}

const StoryCard = ({ card }: { card: ICard }) => {
    const cn = useClassnames(style);
    const text = useMemo(() => (
        card.text.replace('{', '<span>').replace('}', '</span>')
    ), [card.text]);

    return (
        <div className={cn('story__wrapper')}>
            <img src={card.image.publicURL} className={cn('story__image')} alt="" />
            <span className={cn('story__text')} dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    );
};

export default StoryCard;
