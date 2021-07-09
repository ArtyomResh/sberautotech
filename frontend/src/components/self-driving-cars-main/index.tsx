import React, { useRef, useState } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import useDeviceDetect from '../../hooks/use-device-detect';
import { ILocalFile } from '../carousel';

import style from './index.css';

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
    }
}

const MainBlock: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
    const { isMobile } = useDeviceDetect();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [play, setPlay] = useState(true);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                void videoRef.current.play().then(() => setPlay(true));

                return;
            }

            videoRef.current.pause();
            setPlay(false);
        }
    };

    return (
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
    );
};


export default MainBlock;