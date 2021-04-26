import React, { useEffect, useRef } from 'react';
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
        <div className={cn('carousel-container', 'carousel')} ref={$container}>
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
                            <p className={cn('carousel__text')}>{slide.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;