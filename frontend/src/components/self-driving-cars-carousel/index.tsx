import React, { useEffect } from 'react';
import Swiper from 'swiper';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

interface IProps {
    data: any
}

const Carousel: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);

    useEffect(() => {
        const swiper = new Swiper('.carousel-container', {
            loop          : true,
            centeredSlides: true,
            slidesPerView : 1,
            spaceBetween  : 0
        });

        return () => {
            swiper.destroy();
        };
    }, []);


    return (
        <div className={cn('carousel-container', 'carousel')}>
            <div className={cn('swiper-wrapper')}>
                {data.map((slide: any) => (
                    <div key={slide.header} className={cn('swiper-slide', 'carousel__slide')}>
                        <div className={cn('carousel__slide-container')}>
                            <div className={cn('carousel__img-container')}>
                                <img className={cn('carousel__img')} src={slide.background.publicURL} />
                                <p className={cn('carousel__header')}><a className={cn('carousel__link')} href="#">{slide.headerLink}</a>{slide.header}</p>
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