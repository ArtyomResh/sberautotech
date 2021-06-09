import React, { useCallback, useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';

import { useClassnames } from '../../hooks/use-classnames';
import useFormattedText from '../../hooks/use-formatted-text';
import { toUnescapedHTML } from '../../utils';

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

enum ECursorPosition {
    left = 'left',
    right = 'right'
}

const Carousel: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
    const $container = useRef<HTMLDivElement>(null);
    const [cursorPosition, setCursorPosition] = useState(ECursorPosition.left);
    const [swiper, setSwiper] = useState<Swiper | null>(null);

    const header = useFormattedText(data.header);
    const text = useFormattedText(data.text);

    const onClick = useCallback(() => {
        if(cursorPosition === ECursorPosition.right) {
            swiper?.slidePrev();
        } else if(cursorPosition === ECursorPosition.left) {
            swiper?.slideNext();
        }
    }, [cursorPosition, swiper]);

    const observeCursor = useCallback((e) => {
        const containerWidth = e.target.clientWidth;
        const currentPosition = e.clientX;
        const newCursorPosition = containerWidth / 2 >= currentPosition ? ECursorPosition.right : ECursorPosition.left;

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

            setSwiper(swiper);

            return () => {
                swiper.destroy();
            };
        }
    }, []);

    return (
        <div
            className={cn('carousel-container', 'carousel', `carousel_${cursorPosition}`)}
            ref={$container}
            onMouseMove={observeCursor}
            onClick={onClick}
        >
            {header && (
                <p
                    className={cn('carousel__header',
                        {
                            [`carousel__header_${data.header_position?.replace('_', '-')}`]: data.header_position
                        }
                    )}
                >
                    {toUnescapedHTML(header)}
                </p>
            )}
            {text && (
                <p
                    className={cn('carousel__text',
                        {
                            [`carousel__text_${data.text_position?.replace('_', '-')}`]: data.text_position
                        }
                    )}
                >
                    {toUnescapedHTML(text)}
                </p>
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