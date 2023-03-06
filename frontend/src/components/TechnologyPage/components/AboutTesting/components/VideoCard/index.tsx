import React, { useState } from 'react';

import { useClassnames } from '../../../../../../hooks/use-classnames';
import Heading from '../../../../../heading';
import Text from '../../../../../text';
import VideoPlayer, { TVideo } from '../../../../../VideoPlayer';

import './index.css';

interface IProps {
    className?: string,
    title: string,
    description: string,
    video: TVideo,
    poster: string,
    preview: string
}

const VideoCard = ({ className, title, description, video, poster, preview }: IProps) => {
    const cn = useClassnames();
    const cssBlock = 'video-card';
    const [isVideoMaximal, setIsVideoMaximal] = useState(false);

    const handleVideoSizeChange = (isFullscreen: boolean) => {
        setIsVideoMaximal(isFullscreen);
    };

    return (
        <div className={cn(className, `${cssBlock}__wrapper`)}>
            <Heading
                className={cn(`${cssBlock}__title`)}
                level={4}
                dangerouslySetInnerHTML={{ __html: title }}
            />

            <Text
                className={cn(`${cssBlock}__description`)}
                size={4}
                dangerouslySetInnerHTML={{ __html: description }}
            />

            <div className={cn(`${cssBlock}__false-video-block`)} />

            <VideoPlayer
                className={cn(`${cssBlock}__video`, { [`${cssBlock}__video_maximal`]: isVideoMaximal })}
                video={video}
                poster={poster}
                preview={preview}
                previewClassName={cn(`${cssBlock}__video-poster`)}
                preload="metadata"
                controlsType="advanced"
                onVideoSizeChange={handleVideoSizeChange}
                playsInline={true}
                loop={true}
            />

        </div>
    );
};

export default VideoCard;
