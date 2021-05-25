import React from 'react';
import { Link } from 'gatsby';

import { useClassnames } from '../../hooks/use-classnames';
import useFormattedText from '../../hooks/use-formatted-text';
import StoryCard, { ICard } from '../story-card';

import style from './index.css';

interface ILink {
    to: string,
    text: string,
    style: 'border' | 'fill'
}

export interface IBlock {
    id: number,
    background: {
        localFile: {
            publicURL: string
        }
    },
    backgroundPoster?: {
        localFile: {
            publicURL: string
        }
    },
    link?: ILink,
    text: string,
    cards?: Array<ICard>
}

const MainPageBlock = ({ block, index, pageNumber }: { block: IBlock, index: number, pageNumber: number }) => {
    const cn = useClassnames(style);
    const linkStyle = block.link?.style || 'border';
    const text = useFormattedText(block.text);
    const visibilityClassName = pageNumber >= index ? 'block__wrapper_visible' : 'block__wrapper_hidden';

    const renderLink = (link: ILink) => (
        link.to.search('http') !== 0 ? (
            <Link to={link.to} className={cn('block__link', `block__link_${linkStyle}`)}>
                {link.text}
            </Link>
        ) : (
            <a
                target="_blank"
                href={link.to}
                className={cn('block__link', `block__link_${linkStyle}`)}
                onClick={() => {
                    window?.gtag?.('event', 'click', { event_category: 'slide_button_click', event_label: 'Slide button' });
                }}
            >
                {link.text}
            </a>
        )
    );

    return (
        <div className={cn('block__wrapper', visibilityClassName)} id={String(block.id)}>
            {block.background.localFile.publicURL.search('.mp4') !== -1 ? (
                <video
                    src={block.background.localFile.publicURL}
                    poster={block.backgroundPoster?.localFile?.publicURL}
                    className={cn('block__image')}
                    muted={true}
                    loop={true}
                    autoPlay={true}
                    playsInline={true}
                />
            ) : (
                <img src={block.background.localFile.publicURL} className={cn('block__image')} alt={block.link?.text} />
            )}
            {block.link ? renderLink(block.link) : null }
            <div className={cn('block__bottom', pageNumber >= index ? 'block__bottom_showing' : 'block__bottom_hiding')}>
                {text && <span className={cn('block__text')} dangerouslySetInnerHTML={{ __html: text }} />}
                {block.cards?.map((card, i) => (
                    <StoryCard key={i} card={card} />
                ))}
            </div>
        </div>
    );
};

export default MainPageBlock;
