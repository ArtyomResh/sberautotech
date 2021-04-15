import React from 'react';
import { Link } from 'gatsby';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

export interface ICard {
    id: string,
    image: {
        publicURL: string
    },
    text: string
}

const StoryCard = ({ card }: { card: ICard }) => {
    const cn = useClassnames(style);

    return (
        <div className={cn('story__wrapper')}>
            <img src={card.image.publicURL} className={cn('story__image')} alt="" />
            <span className={cn('story__text')}>{card.text}</span>
        </div>
    );
};

export default StoryCard;
