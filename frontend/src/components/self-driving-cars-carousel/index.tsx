import React, { useCallback, useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

interface IProps {
    data: Array<ISliderItem>
}

export interface ILocalFile {
    localFile: {
        publicURL: string
    }
}
interface ISliderItem {
    id: number,
    text: string,
    header: string,
    headerLink: string,
    background: ILocalFile
}

const Carousel: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
    const $container = useRef<HTMLDivElement>(null);
    const [cursorPosition, setCursorPosition] = useState('left')

    const observeCursor = useCallback((e)=> {
        const containerWidth = e.target.clientWidth;
        const currentPosition = e.clientX;
        const newCursorPosition = containerWidth / 2 >= currentPosition ? 'right' : 'left';
        if (newCursorPosition !== cursorPosition) {
            setCursorPosition(newCursorPosition);
        }
    }, [cursorPosition])

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
            <div className={cn('swiper-wrapper')}>
                {data.map((slide) => (
                    <div key={slide.id} className={cn('swiper-slide', 'carousel__slide')}>
                        <div className={cn('carousel__slide-container')}>
                            <div className={cn('carousel__img-container')}>
                                <img className={cn('carousel__img')} alt={slide.header} src={slide.background.localFile.publicURL} />
                                <p className={cn('carousel__header')}>
                                    <a className={cn('carousel__link')} href="#">{slide.headerLink}</a>
                                    {slide.header}
                                </p>
                            </div>
                            {(slide.text) ? <p className={cn('carousel__text')}>{slide.text}</p> : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;