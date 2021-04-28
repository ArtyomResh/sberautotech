import React, { useRef } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import { ILocalFile } from '../self-driving-cars-carousel';

import style from './index.css';

interface IProps {
    data: {
        header: string,
        id: number,
        text: string,
        textBottom: string,
        bottomVideo: ILocalFile,
        topBackground: ILocalFile
    }
}

const MainBlock: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleVideo = () => {
        if(videoRef.current) {
            if(videoRef.current.paused) {
                return void videoRef.current.play();
            }

            void videoRef.current.pause();
        }
    };

    return (
        <div className={cn('main-block')}>
            <div className={cn('main-block__top')}>
                <img src={data.topBackground.localFile.publicURL} alt={data.header} className={cn('main-block__image')} />
                <h3 className={cn('main-block__top-text')}>{data.header}</h3>
                <p className={cn('main-block__info-top')}>
                    <div>{data.text}</div>
                    <div className={cn('main-block__info-bottom')}>{data.textBottom}</div>
                </p>
            </div>
            <div className={cn('main-block__bottom')}>
                <svg className={cn('main-block__bottom-play')} onClick={toggleVideo} width="47" height="53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35.534 18.71c3.356 1.94 5.772 3.34 7.363 4.606 1.584 1.26 2.117 2.204 2.117 3.184s-.533 1.924-2.117 3.184c-1.591 1.265-4.007 2.666-7.363 4.607L14.506 46.454c-3.363 1.946-5.788 3.345-7.682 4.095-1.887.747-2.973.737-3.823.248-.849-.49-1.401-1.426-1.7-3.433C1.004 45.35 1 42.55 1 38.664V14.336c0-3.886.003-6.686.302-8.701.298-2.007.85-2.943 1.7-3.433.849-.49 1.935-.499 3.822.248 1.894.75 4.319 2.15 7.682 4.095L35.534 18.71z" stroke="#fff" />
                </svg>
                <video className={cn('main-block__video')} ref={videoRef} src={data.bottomVideo.localFile.publicURL} autoPlay={true} muted={true} loop={true} />
            </div>
        </div>
    );
};


export default MainBlock;