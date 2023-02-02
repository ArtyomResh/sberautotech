import React, { useRef, useState } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import useDeviceDetect from '../../hooks/use-device-detect';
import useFormattedText from '../../hooks/use-formatted-text';
import { toUnescapedHTML } from '../../utils';
import { ILocalFile } from '../../types';

import './index.css';

import ButtonPlay from '../../images/play-button.inline.svg';
import ButtonPause from '../../images/pause-button.inline.svg';

interface IProps {
    data: {
        header: string,
        id: number,
        text: string,
        background: ILocalFile,
        backgroundPoster: ILocalFile,
        mobileBackground: ILocalFile,
        mobileBackgroundPoster: ILocalFile
    },
    storyCards: Array<ISlideItem>
}
interface ISlideItem {
    id: number,
    header: string,
    text: string,
    image: ILocalFile,
    subText: string,
    subTextSecond: string
}

const StoryCard = ({ story }: {story: ISlideItem}) => {
    const cn = useClassnames();
    const text = useFormattedText(story.text) || '';

    return (
        <div className={cn('stories-block__story')}>
            <div className={cn('stories-block__story_inner')}>
                <div className={cn('stories-block__story-header')}>{toUnescapedHTML(story.header)}</div>
                <img src={story.image.localFile.url} alt={story.header} className={cn('stories-block__story-img')} />
            </div>
            <div>
                <p className={cn('stories-block__story-text')}>{toUnescapedHTML(text)}</p>
                <div className={cn('stories-block__story-sub-text-wrapper')}>
                    <p className={cn('stories-block__story-sub-text')}>{toUnescapedHTML(story.subText)}</p>
                    <p className={cn('stories-block__story-sub-text')}>{toUnescapedHTML(story.subTextSecond)}</p>
                </div>
            </div>
        </div>
    );
};

const MainBlock: React.FC<IProps> = ({ data, storyCards }) => {
    const cn = useClassnames();
    const { isMobile } = useDeviceDetect();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [play, setPlay] = useState(true);

    const toggleVideo = () => {
        if(videoRef.current) {
            if(videoRef.current.paused) {
                void videoRef.current.play().then(() => setPlay(true));

                return;
            }

            videoRef.current.pause();
            setPlay(false);
        }
    };

    return (
        <div>
            <div className={cn('main-block')} onClick={toggleVideo}>
                <div className={cn('main-block__header')}>{data.header}</div>
                {play ? <ButtonPlay className={cn('main-block__play')} /> : <ButtonPause className={cn('main-block__play')} />}
                <video
                    className={cn('main-block__video')}
                    ref={videoRef}
                    src={isMobile ? data.mobileBackground.localFile.url : data.background.localFile.url}
                    muted={true}
                    loop={true}
                    autoPlay={true}
                    playsInline={true}
                />
                <div className={cn('main-block__text')}>{data.text}</div>
            </div>
            <div className={cn('stories-block')}>
                {storyCards.map((story) => (<StoryCard key={story.id} story={story} />))}
            </div>
        </div>
    );
};


export default MainBlock;
