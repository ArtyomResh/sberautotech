import React, { useMemo } from 'react';
import { Link } from 'gatsby';

import { useClassnames } from '../../hooks/use-classnames';
import StoryCard, { ICard } from '../story-card';

import style from './index.css';

export interface IBlock {
    id: number,
    background: {
        localFile: {
            publicURL: string
        }
    },
    link?: {
        to: string,
        text: string,
        style: 'border' | 'fill'
    },
    text: string,
    cards?: Array<ICard>
}

const MainPageBlock = ({ block, index, pageNumber }: { block: IBlock, index: number, pageNumber: number }) => {
    const cn = useClassnames(style);
    const linkStyle = block.link?.style || 'border';
    const text = useMemo(() => (
        block.text.replace('{', '<span>').replace('}', '</span>')
    ), [block.text]);
    const visibilityClassName = pageNumber >= index ? 'block__wrapper_visible' : 'block__wrapper_hidden';

    return (
        <div className={cn('block__wrapper', visibilityClassName)} id={String(block.id)}>
            {block.background.localFile.publicURL.search('.mp4') !== -1 ? (
                <video src={block.background.localFile.publicURL} className={cn('block__image')} muted={true} loop={true} autoPlay={true} />
            ) : (
                <img src={block.background.localFile.publicURL} className={cn('block__image')} alt={block.link?.text} />
            )}


            {block.link && (
                <Link to={block.link.to} className={cn('block__link', `block__link_${linkStyle}`)}>
                    {block.link.text}
                </Link>
            )}
            <div className={cn('block__bottom')}>
                <span className={cn('block__text')} dangerouslySetInnerHTML={{ __html: text }} />
                {block.cards?.map((card, i) => (
                    <StoryCard key={i} card={card} />
                ))}
            </div>
        </div>
    );
};

export default MainPageBlock;
