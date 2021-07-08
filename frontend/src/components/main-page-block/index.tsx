import React from 'react';
import { Link } from 'gatsby';

import { gtagClicked } from '../../utils';
import { useClassnames } from '../../hooks/use-classnames';
import useFormattedText from '../../hooks/use-formatted-text';
import { toUnescapedHTML } from '../../utils';
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
            url: string
        }
    },
    backgroundPoster?: {
        localFile: {
            url: string
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
        <Link
            to={link.to}
            className={cn('block__link', `block__link_${linkStyle}`)}
            onClick={() => gtagClicked('main_slide_button_click')}
        >
            {link.text}
        </Link>
    );

    return (
        <div className={cn('block__wrapper', visibilityClassName)} id={String(index)}>
            {block.background.localFile.url.search('.mp4') !== -1 ? (
                <video
                    className={cn('block__image')}
                    muted={true}
                    loop={true}
                    autoPlay={true}
                    playsInline={true}
                />
            ) : (
                    <img src={block.background.localFile.url} className={cn('block__image')} alt={block.link?.text} />
                )}
            {block.link ? renderLink(block.link) : null}
            <div className={cn('block__bottom', pageNumber >= index ? 'block__bottom_showing' : 'block__bottom_hiding')}>
                {text && <span className={cn('block__text')}>{toUnescapedHTML(text)}</span>}
                {block.cards?.map((card, i) => (
                    <StoryCard key={i} card={card} />
                ))}
            </div>
        </div>
    );
};

export default MainPageBlock;
