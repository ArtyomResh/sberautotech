import React, { useRef, useState } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import useDeviceDetect from '../../hooks/use-device-detect';
import { ILocalFile } from '../self-driving-cars-carousel';

import style from './index.css';

import ButtonPlay from '../../images/play-button.inline.svg';
import ButtonPause from '../../images/pause-button.inline.svg';

interface IProps {
    data: {
        header: string,
        id: number,
        text: string,
        textBottom: string,
        bottomVideo: ILocalFile,
        bottomVideoPoster: ILocalFile,
        topBackground: ILocalFile,
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
        <div className={cn('main-block')}>
            <div className={cn('main-block__top')}>
                <div className={cn('main-block__header')}>{data.header}</div>
                <img src={data.topBackground.localFile.publicURL} alt={data.header} className={cn('main-block__image')} />
                <div className={cn('main-block__info-top')}>{data.text}</div>
                <div className={cn('main-block__info-bottom')}>{data.textBottom}</div>
            </div>
            <div className={cn('main-block__bottom')} onClick={toggleVideo}>
                {play ? <ButtonPlay className={cn('main-block__bottom-play')} /> : <ButtonPause className={cn('main-block__bottom-play')} /> }
                <video
                    ref={videoRef}
                    src={isMobile ? data.mobileBackground.localFile.publicURL : data.bottomVideo.localFile.publicURL}
                    poster={isMobile ? data.mobileBackgroundPoster.localFile.publicURL : data.bottomVideoPoster?.localFile?.publicURL}
                    muted={true}
                    loop={true}
                    autoPlay={true}
                    playsInline={true}
                />
            </div>
        </div>
    );
};


export default MainBlock;