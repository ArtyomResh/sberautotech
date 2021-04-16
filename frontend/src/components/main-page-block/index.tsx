import React from 'react';
import { Link } from 'gatsby';

import { useClassnames } from '../../hooks/use-classnames';
import StoryCard, { ICard } from '../story-card';

import style from './index.css';

interface IData {
    position: string,
    background: {
        publicURL: string
    },
    link?: {
        to: string,
        text: string
    },
    text: string,
    cards: Array<ICard>
}

const MainPageBlock = ({ data }: { data: IData }) => {
    const cn = useClassnames(style);
    const text = data.text.replace('{', '<span>').replace('}', '</span>');

    return (
        <div className={cn('block__wrapper')} id={data.position}>
            <img src={data.background.publicURL} className={cn('block__image')} alt="" />
            {
                data.link ? (
                    <Link to={data.link.to} className={cn('block__link')}>
                        {data.link.text}
                    </Link>
                ) : null
            }
            <div className={cn('block__bottom')}>
                <span className={cn('block__text')} dangerouslySetInnerHTML={{ __html: text }} />
                {
                    data.cards.length ? data.cards.map((card, i) => (
                        <StoryCard key={i} card={card} />
                    )) : null
                }
            </div>
        </div>
    );
};

export default MainPageBlock;
