import React, { useEffect } from 'react';
import Swiper from 'swiper';

import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';
interface IProps {
    data: any
}

const SwiperComponent: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);

    useEffect(() => {
        const swiper = new Swiper('.swiper-container', {
            loop               : true,
            centeredSlides     : true,
            slidesPerView      : 1.3,
            spaceBetween       : 20,
            watchSlidesProgress: true
        });

        return () => {
            swiper.destroy();
        };
    }, []);

    const slideEl = (swipable: boolean) => (slide: any, idx: number) => (
        <div
            key={slide.id} className={cn('swiper__slide', {
                'swiper-slide': swipable
            })}
        >
            <img src={slide.image.publicURL} className={cn('swiper__slide-img')} />
            <h3 className={cn('swiper__slide-heading')}>{slide.header}</h3>
            <p className={cn('swiper__slide-text')}>{slide.text}</p>
        </div>
    );

    return (
        <React.Fragment>
            <div className={cn('swiper')}>
                {data.map(slideEl(false))}
            </div>
            <div className={cn('swiper-container', 'swiper__container')}>
                <div className="swiper-wrapper">
                    {data.map(slideEl(true))}
                </div>
            </div>
        </React.Fragment>
    );
};

export default SwiperComponent;