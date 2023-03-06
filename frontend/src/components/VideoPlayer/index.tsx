import React, { useEffect, useRef, useState } from 'react';

import { useClassnames } from '../../hooks/use-classnames';
import { useIsClient } from '../../utils/hooks/useIsClient';
import Text from '../text';

import styles from './index.css';
import maximizeIconSrc from './static/maximize.svg';
import minimizeIconSrc from './static/minimize.svg';
import pauseIconSrc from './static/pause.svg';
import playIconSrc from './static/play.svg';

interface IVideoSrc {
    type: string,
    src: string
}

export type TVideo = IVideoSrc | Array<IVideoSrc>;

type TVideoPlayer = React.HTMLProps<HTMLVideoElement> & {
    shouldStopPlaying?: boolean,
    video: TVideo
} & ({
    controlsType?: 'default' | never,
    onVideoSizeChange?: never
} | {
    controlsType: 'advanced',
    onVideoSizeChange?: (isFullscreen: boolean) => void
});

const VideoPlayer: React.FC<TVideoPlayer> = (props) => {
    const cx = useClassnames(styles);
    const { className, video, controlsType = 'default', onVideoSizeChange, shouldStopPlaying, poster, ...restProps } = props;
    const isClient = useIsClient();

    const videoElement = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayingStarted, setIsPlayingStarted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const videoVariants = Array.isArray(video) ? video : [video];

    useEffect(() => {
        if(shouldStopPlaying) {
            setIsPlaying(false);
            videoElement?.current?.pause();
        }
    }, [setIsPlaying, shouldStopPlaying]);

    useEffect(() => {
        if(isPlaying) {
            setIsPlayingStarted(true);
        }
    }, [isPlaying]);

    useEffect(() => {
        if(onVideoSizeChange) {
            onVideoSizeChange(isFullscreen);
        }
    }, [isFullscreen, onVideoSizeChange]);

    const handlePlay = async () => {
        if(isPlaying) {
            videoElement?.current?.pause();
            setIsPlaying(false);
        } else {
            try {
                await videoElement?.current?.play();
                setIsPlaying(true);
            } catch(e) {
                // Не нашел каких-то логгеров ошибок
                // поэтому буду решил ошибку простым console.log
                // eslint-disable-next-line no-console
                console.error('Не удалось воспроизвести видео: ', e);
            }
        }
    };

    const handleVideoSize = async () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div className={cx('video-player__wrapper', { 'video-player__wrapper_server-side': !isClient }, className)}>
            <video
                className={cx('video-player')}
                ref={videoElement}
                {...restProps}
            >
                {videoVariants.map(({ type, src }, index) => <source key={index} src={src} type={`video/${type}`} />)}

                <Text size={2} as="p">
                    Извините, но ваш браузер не поддерживает проигрывание данного видео.
                </Text>
            </video >
            {poster && !isFullscreen && !isPlayingStarted && <img src={poster} className={cx('video-player__poster')} />}

            {(
                controlsType === 'default'
                    ? (
                        <button
                            className={cx('video-player__button-play', {
                                'video-player__button-play_is-visible': !isPlaying
                            })}
                            title="Проиграть видео"
                            onClick={handlePlay}
                        >
                            <img
                                className={cx('video-player__button-play-image')}
                                src="/play.svg"
                                alt="Изображение иконки проигрывания"
                            />
                        </button>
                    )
                    : (
                        <div className={cx('video-player__controls-advanced')}>
                            <button
                                className={cx('video-player__button-play-stop')}
                                type="button"
                                title={isPlaying ? 'Остановить видео' : 'Проиграть видео'}
                                onClick={handlePlay}
                            >
                                <img
                                    src={isPlaying ? pauseIconSrc : playIconSrc}
                                    alt={isPlaying ? 'Изображение иконки паузы' : 'Изображение иконки проигрывания'}
                                />
                            </button>

                            <button
                                className={cx('video-player__button-maximize-minimize')}
                                type="button"
                                title={isFullscreen ? 'Выйти из режима полного окна' : 'Перейти в режим полного окна'}
                                onClick={handleVideoSize}
                            >
                                <img
                                    src={isFullscreen ? minimizeIconSrc : maximizeIconSrc}
                                    alt={isFullscreen ? 'Изображение иконки выхода из режима полного окна ' : 'Изображение иконки перехода в режим полного окна'}
                                />
                            </button>
                        </div>
                    )
            )}
        </div>
    );
};

export default VideoPlayer;
