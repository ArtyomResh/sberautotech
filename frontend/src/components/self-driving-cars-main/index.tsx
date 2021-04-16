import React, {useRef } from 'react';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

interface IProps {
    data: any
}

const MainBlock: React.FC<IProps> = ({data}) => {
    const cn = useClassnames(style)
    const videoRef = useRef<HTMLVideoElement>(null)

    const toggleVideo = () => {
        if(videoRef.current){
            videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
        }
    }
    
    return (
        <div className={cn('main-block')}>
            <div className={cn('main-block__top')}>
                <img src={data.topBackground.publicURL} className={cn('main-block__image')} />
                <h3 className={cn('main-block__top-text')}>{data.header}</h3>
            </div>
            <div className={cn('main-block__bottom')}>
            <svg className={cn('main-block__bottom-play')} onClick={toggleVideo} width="47" height="53" viewBox="0 0 47 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35.5344 18.7094C38.8899 20.6504 41.3057 22.0508 42.8969 23.3161C44.4808 24.5757 45.014 25.5205 45.014 26.5C45.014 27.4795 44.4808 28.4244 42.8969 29.6839C41.3057 30.9492 38.8899 32.3496 35.5343 34.2906L14.5063 46.4539C11.1426 48.3995 8.71795 49.7989 6.82351 50.5491C4.93741 51.2959 3.85083 51.2865 3.00141 50.7965C2.15198 50.3066 1.59977 49.3707 1.30188 47.3642C1.00267 45.3487 1 42.5492 1 38.6633L1 14.3367C1 10.4508 1.00267 7.65131 1.30188 5.63584C1.59978 3.62925 2.15198 2.69341 3.00141 2.20345C3.85083 1.71349 4.93741 1.70407 6.82351 2.45091C8.71795 3.20106 11.1426 4.60046 14.5063 6.54615L35.5344 18.7094Z" stroke="white" stroke-width="2"/>
            </svg>
                <video ref={videoRef} src={data.bottomVideo.publicURL} autoPlay muted loop/>
            </div>
        </div>
    )
}

export default MainBlock;