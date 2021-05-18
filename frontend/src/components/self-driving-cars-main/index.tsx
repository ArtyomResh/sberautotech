import React, { useRef, useState } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
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
        topBackground: ILocalFile
    }
}

const MainBlock: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
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
                <img src={data.topBackground.localFile.publicURL} alt={data.header} className={cn('main-block__image')} />
                <p className={cn('main-block__info-top')}>
                    <div>{data.text}</div>
                    <div className={cn('main-block__info-bottom')}>{data.textBottom}</div>
                </p>
            </div>
            <div className={cn('main-block__bottom')} onClick={toggleVideo}>
                {play ? <ButtonPlay className={cn('main-block__bottom-play')} /> : <ButtonPause className={cn('main-block__bottom-play')} /> }
                <video
                    ref={videoRef}
                    src={data.bottomVideo.localFile.publicURL}
                    poster={data.bottomVideoPoster?.localFile?.publicURL}
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