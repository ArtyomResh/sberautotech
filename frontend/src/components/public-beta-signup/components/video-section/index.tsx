import React from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation } from '@reach/router';

import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';

import Heading from '../../../heading';
import GridWrapper from '../../../grid-wrapper';

import VideoPlayer from './components/video-player';
import style from './index.css';

const VideoSection = () => {
    const cn = useClassnames(style);
    const location = useLocation();

    return (
        <section className={cn('video-section')}>
            <GridWrapper>
                <Heading
                    className={cn('video-section__title')}
                    level={2}
                    dangerouslySetInnerHTML={{ __html: formatText('Посмотрите, как выглядит {поездка на&#160;беспилотнике}') }}
                />
            </GridWrapper>

            <VideoPlayer
                className={cn('video-section__player')}
                videoFileName="showreel"
                poster={isMobile ? '/showreel_mobile.jpeg' : '/showreel_desktop.jpeg'}
                preload="metadata"
                shouldStopPlaying={location.hash === '#modal'}
                playsInline={true}
                loop={true}
            />
        </section>
    );
};

export default VideoSection;