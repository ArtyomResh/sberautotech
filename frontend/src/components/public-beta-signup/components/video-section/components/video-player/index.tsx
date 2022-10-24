import React, { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { useClassnames } from '../../../../../../hooks/use-classnames';
import Text from '../../../../../text';

import styles from './index.css';

type TVideoPlayer = React.HTMLProps<HTMLVideoElement> & {
    videoFileName: string,
    posterFilePath?: string
};

const VideoPlayer: React.FC<TVideoPlayer> = (props) => {
    const cx = useClassnames(styles);
    const { videoFileName, posterFilePath, className, ...restProps } = props;
    const filePathToVideo = isMobile ? `/video/mobile/${videoFileName}` : `/video/desktop/${videoFileName}`;

    const videoElement = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

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
                console.log('Не удалось воспроизвести видео: ', e);
            }
        }
    };

    return (
        <div className={cx('video-player__wrapper', className)}>
            <video
                className={cx('video-player')}
                ref={videoElement}
                {...restProps}
            >
                <source src={`${filePathToVideo}.avi`} type="video/avi" />
                <source src={`${filePathToVideo}.webm`} type="video/webm" />
                <source src={`${filePathToVideo}.mp4`} type="video/mp4" />

                <Text size={2} as="p">
                    Извините, но ваш браузер не поддерживает проигрывание данного видео.
                </Text>

            </video >

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
        </div>
    );
};

export default VideoPlayer;
