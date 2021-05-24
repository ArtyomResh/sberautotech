import React, { useCallback, useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';

import { useClassnames } from '../../hooks/use-classnames';
import useFormattedText from '../../hooks/use-formatted-text';

import style from './index.css';

interface IProps {
    data: ISlider
}

export interface ILocalFile {
    localFile: {
        publicURL: string
    }
}

interface ISlider {
    id?: number,
    header?: string,
    header_position?: string,
    text?: string,
    text_position?: string,
    slider_items: Array<ILocalFile>
}

const Carousel: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
    const $container = useRef<HTMLDivElement>(null);
    const [cursorPosition, setCursorPosition] = useState('left');

    const header = useFormattedText(data.header);
    const text = useFormattedText(data.text);

    const observeCursor = useCallback((e) => {
        const containerWidth = e.target.clientWidth;
        const currentPosition = e.clientX;
        const newCursorPosition = containerWidth / 2 >= currentPosition ? 'right' : 'left';

        if(newCursorPosition !== cursorPosition) {
            setCursorPosition(newCursorPosition);
        }
    }, [cursorPosition]);

    useEffect(() => {
        if($container.current) {
            const swiper = new Swiper($container.current, {
                loop          : true,
                centeredSlides: true,
                slidesPerView : 1,
                spaceBetween  : 0
            });

            return () => {
                swiper.destroy();
            };
        }
    }, []);

    return (
        <div className={cn('carousel-container', 'carousel', `carousel_${cursorPosition}`)} ref={$container} onMouseMove={observeCursor}>
            {header && (
                <p
                    className={cn('carousel__header',
                        {
                            [`carousel__header_${data.header_position?.replace('_', '-')}`]: data.header_position
                        }
                    )}
                    dangerouslySetInnerHTML={{ __html: header }}
                />
            )}
            {text && (
                <p
                    className={cn('carousel__text',
                        {
                            [`carousel__text_${data.text_position?.replace('_', '-')}`]: data.text_position
                        }
                    )}
                    dangerouslySetInnerHTML={{ __html: text }}
                />
            )}
            <div className={cn('swiper-wrapper')}>
                {data.slider_items.map((slide, i) => (
                    <div key={i} className={cn('swiper-slide', 'carousel__slide')}>
                        <div className={cn('carousel__slide-container')}>
                            <div className={cn('carousel__img-container')}>
                                <img className={cn('carousel__img')} src={slide.localFile.publicURL} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;