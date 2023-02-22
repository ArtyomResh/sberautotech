import React from 'react';

import { toUnescapedHTML } from '../../utils';
import { useClassnames } from '../../hooks/use-classnames';
import useDeviceDetect from '../../hooks/use-device-detect';
import useFormattedText from '../../hooks/use-formatted-text';
import StoryCard, { ICard } from '../story-card';

import './index.css';

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
    mobileBackground?: {
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

const MainPageBlock = ({ block, index, blockId, pageNumber }: { block: IBlock, index: number, blockId: string, pageNumber: number }) => {
    const cn = useClassnames();
    const text = useFormattedText(block.text);
    const visibilityClassName = pageNumber >= index ? 'block__wrapper_visible' : 'block__wrapper_hidden';
    const { isMobile } = useDeviceDetect();

    const videoSrc = isMobile ? block?.mobileBackground?.localFile?.url : block?.background?.localFile?.url;

    return (
        <div className={cn('block__wrapper', visibilityClassName)} id={blockId}>
            {(videoSrc && videoSrc?.search('.mp4') !== -1) ? (
                <video
                    className={cn('block__image')}
                    muted={true}
                    loop={true}
                    autoPlay={true}
                    playsInline={true}
                    preload="metadata"
                    src={videoSrc}
                />
            ) : (
                <img src={block.background.localFile.url} className={cn('block__image')} alt={block.link?.text} />
            )}
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
