import React, { useMemo } from 'react';
import { Link } from 'gatsby';

import { useClassnames } from '../../hooks/use-classnames';
import StoryCard, { ICard } from '../story-card';

import style from './index.css';

export interface IBlock {
    position: string,
    background: {
        publicURL: string
    },
    link?: {
        to: string,
        text: string,
        style: 'border' | 'fill'
    },
    text: string,
    cards: Array<ICard>
}

const MainPageBlock = ({ block }: { block: IBlock }) => {
    const cn = useClassnames(style);
    const linkStyle = block.link?.style || 'border';
    const text = useMemo(() => (
        block.text.replace('{', '<span>').replace('}', '</span>')
    ), [block.text]);

    return (
        <div className={cn('block__wrapper')} id={block.position}>
            <img src={block.background.publicURL} className={cn('block__image')} alt="" />
            {block.link && (
                <Link to={block.link.to} className={cn('block__link', `block__link_${linkStyle}`)}>
                    {block.link.text}
                </Link>
            )}
            <div className={cn('block__bottom')}>
                <span className={cn('block__text')} dangerouslySetInnerHTML={{ __html: text }} />
                {block.cards.map((card, i) => (
                    <StoryCard key={i} card={card} />
                ))}
            </div>
        </div>
    );
};

export default MainPageBlock;
