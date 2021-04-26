import React, { useEffect, useRef, Fragment } from 'react';
import Swiper from 'swiper';

import { useClassnames } from '../../hooks/use-classnames';
import { ILocalFile } from '../self-driving-cars-carousel';

import style from './index.css';

interface IProps {
    data: Array<ISlideItem>
}
interface ISlideItem{
    id: number,
    header: string,
    text: string,
    image: ILocalFile
}

const SwiperComponent: React.FC<IProps> = ({ data }) => {
    const cn = useClassnames(style);
    const $container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if($container.current) {
            const swiper = new Swiper($container.current, {
                loop               : true,
                centeredSlides     : true,
                slidesPerView      : 1.3,
                spaceBetween       : 20,
                watchSlidesProgress: true
            });

            return () => {
                swiper.destroy();
            };
        }
    }, []);

    const slideEl = (swipable: boolean) => (slide: ISlideItem) => (
        <div
            key={slide.id} className={cn('swiper__slide', {
                'swiper-slide': swipable
            })}
        >
            <img src={slide.image.localFile.publicURL} alt={slide.header} className={cn('swiper__slide-img')} />
            <h3 className={cn('swiper__slide-heading')}>{slide.header}</h3>
            <p className={cn('swiper__slide-text')}>{slide.text}</p>
        </div>
    );

    return (
        <Fragment>
            <div className={cn('swiper')}>
                {data.map(slideEl(false))}
            </div>
            <div className={cn('swiper-container', 'swiper__container')} ref={$container}>
                <div className={cn('swiper-wrapper')}>
                    {data.map(slideEl(true))}
                </div>
            </div>
        </Fragment>
    );
};

export default SwiperComponent;