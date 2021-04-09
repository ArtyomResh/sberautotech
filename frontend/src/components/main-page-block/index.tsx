import React from 'react';
import { Link } from 'gatsby';

import { useClassnames } from '../../hooks/use-classnames';
import StoryCard from '../story-card';

import style from './index.css';

const MainPageBlock = ({data}) => {
    const cn = useClassnames(style);
    return (
        <div className={cn('block__wrapper')} id={data.position}>
            <img src={data.background.publicURL} className={cn('block__image')} />
            {
                (data.link) ? (
                    <Link to={data.link.to} className={cn('block__link')}>
                        <button>{data.link.text}</button>
                    </Link>
                ) : null
            }
            <div className={cn('block__bottom')}>
                <span className={cn('block__text')}>{data.text}</span>
                {
                    data.cards.length ? data.cards.map((card) => (
                        <StoryCard key={card.id} data={card} />
                    )) : null
                }
            </div>  
        </div>
    )
};

export default MainPageBlock;
