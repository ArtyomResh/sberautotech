import React from 'react';

import { useClassnames } from '../../../../hooks/use-classnames';
import { formatText } from '../../../../utils';

import Heading from '../../../heading';
import GridWrapper from '../grid-wrapper';

import VideoPlayer from './components/video-player';
import style from './index.css';

const VideoSection = () => {
    const cn = useClassnames(style);

    return (
        <section>
            <GridWrapper>
                <Heading
                    className={cn('video-section__title')}
                    level={2}
                    dangerouslySetInnerHTML={{ __html: formatText('Посмотрите, как выглядит {поездка на&#160;беспилотнике}') }}
                />
            </GridWrapper>

            <VideoPlayer
                className={cn('video-section__player')}
                videoFileName="pmef_test"
                poster="/spb_back.jpg"
                preload="none"
                loop={true}
            />
        </section>
    );
};

export default VideoSection;